"use client";

import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "../ui/badge";
import { MOODS } from "@/lib/constants/mood";
import { toast } from "sonner";
import PremiumFeatureBadge from "@/components/PremiumFeatureBadge";

const moods = [
  {
    id: 1,
    name: "Happy",
    icon: "😊",
    color: "bg-yellow-100 text-yellow-900",
  },
  {
    id: 2,
    name: "Sad",
    icon: "😢",
    color: "bg-blue-100 text-blue-900",
  },
  {
    id: 3,
    name: "Angry",
    icon: "😡",
    color: "bg-red-100 text-red-900",
  },
  {
    id: 4,
    name: "Excited",
    icon: "😁",
    color: "bg-green-100 text-green-900",
  },
  {
    id: 5,
    name: "Confused",
    icon: "😕",
    color: "bg-purple-100 text-purple-900",
  },
];

const moodTrackerSchema = z.object({
  mood: z.enum(MOODS, {
    message: "You need to select a mood.",
  }),
  note: z.string().optional(),
});

export default function MoodTracker() {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof moodTrackerSchema>>({
    resolver: zodResolver(moodTrackerSchema),
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof moodTrackerSchema>) => {
    const { mood, note } = values;
    const { success } = moodTrackerSchema.safeParse({ mood, note });

    if (success) {
      try {
        // Send the form data to the API moods route
        const response = await fetch("/api/moods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mood, note }),
        });

        if (!response.ok) {
          throw new Error("Failed to create mood.");
        }

        console.log(response);

        form.reset();
        toast.success("Mood created successfully.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to create mood.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-fuchsia-100 rounded-md p-3 cursor-pointer border border-fuchsia-200 shadow-[6px_6px_0px_rgba(236,_175,_253,_1)]">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-mono text-neutral-700">Mood Tracker</h3>
        <Badge variant={"outline"}>New</Badge>
        <PremiumFeatureBadge feature="mood-tracker" />
      </div>
      <div className="mt-2">
        <p className="text-sm text-neutral-900">
          Hello <span className="font-semibold">{session?.user?.name},</span>
        </p>
        <p className="text-md text-neutral-900">How are you feeling today?</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col"
        >
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {moods.map((mood) => (
                      <FormItem
                        key={mood.name}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={mood.name}
                            className={`flex items-center justify-center p-2 rounded-md ${mood.color} cursor-pointer`}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {mood.name}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-neutral-700">
                  Additional notes (optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How are you feeling? Any specific thoughts or events that influenced your mood?"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
          >
            Track Mood
          </Button>
        </form>
      </Form>
    </div>
  );
}
