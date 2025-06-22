# Paddle Integration Setup

This guide explains how to set up Paddle billing for the application using the official Node SDK for server-side operations and Paddle.js for client-side checkout.

## Installation

Install the Paddle Node SDK for server-side operations:

```bash
npm install @paddle/paddle-node-sdk
```

The client-side `@paddle/paddle-js` package is already installed.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Paddle Configuration
PADDLE_ENV=sandbox  # or "production"
PADDLE_API_KEY=your_paddle_api_key_here

# Client-side Paddle (for price previews and checkout)
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_paddle_client_token_here
NEXT_PUBLIC_PADDLE_ENV=sandbox  # or "production"
```

## Database Migration

Run the following SQL migration to add Paddle fields to the workspace table:

```sql
-- Add Paddle fields to workspace table
ALTER TABLE "Workspace" ADD COLUMN "paddleId" TEXT UNIQUE;
ALTER TABLE "Workspace" ADD COLUMN "paddleCustomerId" TEXT;

-- Create index for paddleId
CREATE INDEX "Workspace_paddleId_idx" ON "Workspace"("paddleId");
```

## Paddle Dashboard Setup

1. **Create Products and Prices**: In your Paddle dashboard, create products for your plans (Free, Pro) with corresponding price IDs.

2. **Update Price IDs**: Update the price IDs in `lib/constants.ts` with your actual Paddle price IDs:
   ```typescript
   price: {
     monthlyId: "pri_your_monthly_price_id",
     yearlyId: "pri_your_yearly_price_id",
   }
   ```

3. **Configure Webhooks**: Set up webhooks in your Paddle dashboard pointing to:
   ```
   https://yourdomain.com/api/webhooks/paddle
   ```
   
   Configure the following webhook events:
   - `subscription.created`
   - `subscription.updated`
   - `subscription.cancelled`
   - `transaction.completed`

## How It Works

### New Subscriptions
1. User clicks "Upgrade" button
2. API returns checkout information (priceId, customerEmail, etc.)
3. Client-side opens Paddle checkout using `paddle.Checkout.open()`
4. User completes payment in Paddle checkout
5. After successful payment, Paddle sends webhook
6. Webhook handler updates workspace with subscription details

### Plan Upgrades/Downgrades
1. User clicks "Upgrade" button
2. API returns checkout information for the new plan
3. Client-side opens Paddle checkout with new items
4. Paddle handles proration automatically
5. Webhook updates workspace with new subscription details

### Webhook Processing
The webhook handler at `/api/webhooks/paddle` processes Paddle events and updates the workspace accordingly:
- Updates plan based on price ID
- Sets subscription and customer IDs
- Handles payment failures
- Manages subscription cancellations

## API Functions

The implementation provides these main functions:

- `getPaddleInstance()` - Creates and returns a Paddle instance for server-side operations
- `getSubscription(subscriptionId)` - Fetches subscription details
- `updateSubscription(subscriptionId, items, prorationBillingMode)` - Updates subscription

## Client-Side Checkout

The checkout process is handled entirely client-side using Paddle.js:

- `UpgradePlanButton` component initializes Paddle.js
- Calls the upgrade API to get checkout information
- Opens Paddle checkout using `paddle.Checkout.open()`
- Handles success/cancel flows

## Testing

1. Use Paddle's sandbox environment for testing
2. Test the complete flow: new subscription, upgrade, downgrade
3. Verify webhook processing by checking database updates
4. Test payment failure scenarios

## Security

- Always verify webhook signatures in production
- Use environment-specific API keys
- Implement proper error handling
- Log all webhook events for debugging

## Troubleshooting

If you encounter issues:

1. **Module not found**: Make sure `@paddle/paddle-node-sdk` is installed
2. **API key errors**: Verify your Paddle API key is correct
3. **Webhook issues**: Check webhook URL and signature verification
4. **Database errors**: Ensure the migration has been run
5. **Checkout not opening**: Verify client-side Paddle initialization 