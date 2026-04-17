import z from "zod";

export const singleImportSchema = z.object({
  url: z.url(),
});

export const bulkImportSchema = z.object({
  url: z.url(),
  search: z.string(),
});
