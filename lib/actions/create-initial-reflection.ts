"use server";

import { z } from "zod";
import prisma from "../prisma";
import { authenticatedActionClient } from "./safe-action";

const createInitialReflectionSchema = z.object({});

export const createInitialReflectionAction = authenticatedActionClient
  .schema(createInitialReflectionSchema)
  .action(async ({ ctx: { user } }) => {
    // Check if user already has any reflections
    const existingReflection = await prisma.reflection.findFirst({
      where: {
        userId: user.id
      }
    });

    if (existingReflection) {
      console.log("existingReflection", existingReflection);
      return { reflectionId: existingReflection.id };
    }

    // Create a new reflection
    const reflection = await prisma.reflection.create({
      data: {
        title: "My First Reflection",
        initialContent: JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Start writing your reflection..." }
              ]
            }
          ]
        }),
        content: JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Start writing your reflection..." }
              ]
            }
          ]
        }),
        userId: user.id
      }
    });

    return { reflectionId: reflection.id };
  });
