import { prisma } from "#/db";
import { firecrawl } from "#/lib/firecrawl";
import { extractSchema, singleImportSchema } from "#/schemas/import";
import { createServerFn } from "@tanstack/react-start";
import type z from "zod";
import { authFnMiddleware } from "#/middleware/auth";

export const scrapeUrlFn = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(singleImportSchema)
  .handler(async function ({ data, context }) {
    const item = await prisma.savedItem.create({
      data: {
        url: data.url,
        userid: context.session.user.id,
        status: "PROCESSING",
      },
    });

    try {
      const result = await firecrawl.scrape(data.url, {
        formats: [
          "markdown",
          {
            type: "json",
            schema: extractSchema,
          },
        ],
        onlyMainContent: true,
      });

      const jsonData = result.json as z.infer<typeof extractSchema>;
      let publishedAt = null;

      if (jsonData.publishedAt) {
        const parsed = new Date(jsonData.publishedAt);

        if (!isNaN(parsed.getTime())) {
          publishedAt = parsed;
        }
      }

      const updatedItem = await prisma.savedItem.update({
        where: {
          id: item.id,
        },
        data: {
          title: result.metadata?.title || null,
          content: result.markdown || null,
          ogImage: result.metadata?.ogImage || null,
          author: jsonData.author || null,
          publishedAt: publishedAt,
          status: "COMPLETED",
        },
      });

      return updatedItem;
    } catch {
      const failedItem = await prisma.savedItem.update({
        where: { id: item.id },
        data: {
          status: "FAILED",
        },
      });

      return failedItem;
    }
  });
