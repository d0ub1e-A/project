import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { scrapeUrlFn } from "#/data/items";
import { bulkImportSchema, singleImportSchema } from "#/schemas/import";
import { useForm } from "@tanstack/react-form-start";
import { createFileRoute } from "@tanstack/react-router";
import { Globe, LinkIcon, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/import")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isPending, startTransition] = useTransition();

  const singleImportForm = useForm({
    defaultValues: {
      url: "",
    },
    validators: {
      onSubmit: singleImportSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async function () {
        await scrapeUrlFn({ data: value });
        singleImportForm.reset();
        toast.success("Scraped successfully!");
      });
    },
  });
  const bulkImportForm = useForm({
    defaultValues: {
      url: "",
      search: "",
    },
    validators: {
      onSubmit: bulkImportSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async function () {
        console.log(value);
        bulkImportForm.reset();
      });
    },
  });

  return (
    <div className={`flex flex-1 items-center justify-center py-8`}>
      <div className={`w-full max-w-2xl space-y-6 px-4`}>
        {/* Header */}
        <div className={`text-center`}>
          <h1 className={`text-3xl font-bold`}>Import Content</h1>
          <p className={`text-muted-foreground pt-2`}>
            Save web pages in your library for later
          </p>
        </div>

        <Tabs defaultValue="single">
          <TabsList className={`w-full grid grid-cols-2`}>
            <TabsTrigger value="single" className={`gap-2`}>
              <LinkIcon className={`size-4`} />
              Single URL
            </TabsTrigger>
            <TabsTrigger value="bulk" className={`gap-2`}>
              <Globe className={`size-4`} />
              Bulk Import
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <Card>
              <CardHeader>
                <CardTitle>Import Single Url</CardTitle>
                <CardDescription>
                  Scrape and save content from any web app
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    singleImportForm.handleSubmit();
                  }}
                >
                  <FieldGroup>
                    <singleImportForm.Field
                      name="url"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="https://wikipedia.com/fish"
                              autoComplete="off"
                              type="text"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    ></singleImportForm.Field>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className={`size-4 animate-spin`} />
                          Processing...
                        </>
                      ) : (
                        "Import URL"
                      )}
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Import Bulk Url</CardTitle>
                <CardDescription>
                  Discover and import multiple URL from a website at once
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    bulkImportForm.handleSubmit();
                  }}
                >
                  <FieldGroup>
                    <bulkImportForm.Field
                      name="url"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="https://wikipedia.com/fish"
                              autoComplete="off"
                              type="text"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    ></bulkImportForm.Field>
                    <bulkImportForm.Field
                      name="search"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Filter (optional)
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="e.g. Blog, Docs, Article"
                              autoComplete="off"
                              type="text"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    ></bulkImportForm.Field>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className={`size-4 animate-spin`} />
                          Processing...
                        </>
                      ) : (
                        "Import URLs"
                      )}
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
