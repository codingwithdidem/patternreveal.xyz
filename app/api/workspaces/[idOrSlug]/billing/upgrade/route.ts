import { ManipulatedIOApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = withWorkspace(
  async ({ req, workspace, session }) => {
    const { plan, period, baseUrl, slug } = await parseRequestBody(req);

    if (!plan || !period) {
      throw new ManipulatedIOApiError({
        code: "unprocessable_entity",
        message: "Invalid plan or period."
      });
    }

    const prices = await stripe.prices.list({
      lookup_keys: [`${plan}_${period}`]
    });

    const activeSubscription = workspace.stripeId
      ? await stripe.subscriptions
          .list({
            customer: workspace.stripeId,
            status: "active"
          })
          .then((res) => res.data[0])
      : null;

    if (workspace.stripeId && activeSubscription) {
      const { url } = await stripe.billingPortal.sessions.create({
        customer: workspace.stripeId,
        return_url: baseUrl,
        flow_data: {
          type: "subscription_update_confirm",
          subscription_update_confirm: {
            subscription: activeSubscription.id,
            items: [
              {
                id: activeSubscription.items.data[0].id,
                quantity: 1,
                price: prices.data[0].id
              }
            ]
          }
        }
      });
      return NextResponse.json({ url });
    } else {
      // For both new users and users with canceled subscriptions
      const stripeSession = await stripe.checkout.sessions.create({
        ...(workspace.stripeId
          ? {
              customer: workspace.stripeId,
              // need to pass this or Stripe will throw an error: https://git.new/kX4fi6B
              customer_update: {
                name: "auto",
                address: "auto"
              }
            }
          : {
              customer_email: session.user.email
            }),
        billing_address_collection: "required",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${workspace.slug}?${onboarding ? "onboarded" : "upgraded"}=true&plan=${plan}&period=${period}`,
        cancel_url: baseUrl,
        line_items: [{ price: prices.data[0].id, quantity: 1 }],
        ...(customer?.discount?.couponId
          ? {
              discounts: [
                {
                  coupon:
                    process.env.NODE_ENV !== "production" &&
                    customer.discount.couponTestId
                      ? customer.discount.couponTestId
                      : customer.discount.couponId
                }
              ]
            }
          : { allow_promotion_codes: true }),
        automatic_tax: {
          enabled: true
        },
        tax_id_collection: {
          enabled: true
        },
        mode: "subscription",
        client_reference_id: workspace.id,
        metadata: {
          dubCustomerId: session.user.id
        }
      });

      return NextResponse.json(stripeSession);
    }
  },
  {
    requiredPermissions: []
  }
);
