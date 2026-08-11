"use server";

import { db } from "@/lib/db";
import { contributions, FormAnswers } from "@/lib/db/schema";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function submitContribution(answers: FormAnswers, formVersion = "v1") {
  try {
    const contactEmail = typeof answers.email === "string" && answers.email.trim().length > 0
      ? answers.email.trim()
      : null;

    const inserted = await db
      .insert(contributions)
      .values({
        contactEmail,
        formVersion,
        answers,
      })
      .returning();

    if (resend) {
      try {
        await resend.emails.send({
          from: "Safe to Merge <onboarding@resend.dev>",
          to: "sourav@souravinsights.com",
          subject: `[Safe to Merge] New Contribution from ${contactEmail || "Anonymous"}`,
          text: `A new research contribution was submitted!\n\nEmail: ${contactEmail || "Anonymous"}\nForm Version: ${formVersion}\n\nView all responses in your admin dashboard: /admin`,
        });
      } catch (emailErr) {
        console.error("Resend notification error (non-fatal):", emailErr);
      }
    }

    return { success: true, id: inserted[0]?.id };
  } catch (error) {
    console.error("Failed to insert contribution:", error);
    return { success: false, error: "Database insertion failed." };
  }
}
