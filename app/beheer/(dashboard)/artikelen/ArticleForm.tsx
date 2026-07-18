"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField, SelectField } from "@/components/ui/Field";
import type { Article } from "@/lib/types";

interface Category {
  slug: string;
  naam: string;
}

interface ArticleFormProps {
  categories: Category[];
  action: (prevState: { error: string | null } | null, formData: FormData) => Promise<{ error: string | null }>;
  article?: Partial<Article> | null;
  submitLabel: string;
  pendingLabel: string;
}

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}

export function ArticleForm({
  categories,
  action,
  article,
  submitLabel,
  pendingLabel,
}: ArticleFormProps) {
  const [state, formAction] = useFormState(action, null);

  return (
    <Card>
      <form action={formAction} className="space-y-4">
        <TextField
          label="Titel"
          htmlFor="titel"
          name="titel"
          defaultValue={article?.titel ?? undefined}
          required
        />
        <TextareaField
          label="Samenvatting"
          htmlFor="samenvatting"
          name="samenvatting"
          defaultValue={article?.samenvatting ?? undefined}
          rows={2}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Auteur"
            htmlFor="auteur"
            name="auteur"
            defaultValue={article?.auteur ?? undefined}
          />
          <TextField
            label="Publicatiedatum"
            htmlFor="publicatiedatum"
            name="publicatiedatum"
            type="date"
            defaultValue={article?.publicatiedatum?.slice(0, 10) ?? undefined}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Categorie"
            htmlFor="categorie"
            name="categorie"
            defaultValue={article?.categorie ?? ""}
          >
            <option value="">Kies een categorie…</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.naam}
              </option>
            ))}
          </SelectField>
          <TextField
            label="Leestijd (minuten)"
            htmlFor="leestijd_minuten"
            name="leestijd_minuten"
            type="number"
            min={1}
            defaultValue={article?.leestijd_minuten ?? undefined}
          />
        </div>
        <TextField
          label="Hoofdfoto-URL"
          htmlFor="hoofdfoto_url"
          name="hoofdfoto_url"
          type="url"
          placeholder="https://…"
          defaultValue={article?.hoofdfoto_url ?? undefined}
        />
        <TextField
          label="Tags (komma-gescheiden)"
          htmlFor="tags"
          name="tags"
          placeholder="low-carb, insuline, voeding"
          defaultValue={article?.tags?.join(", ") ?? undefined}
        />
        <TextareaField
          label="Inhoud"
          htmlFor="inhoud"
          name="inhoud"
          defaultValue={article?.inhoud ?? undefined}
          rows={12}
          required
        />
        <TextareaField
          label="Referenties (één per regel)"
          htmlFor="referenties"
          name="referenties"
          defaultValue={article?.referenties?.join("\n") ?? undefined}
          rows={4}
        />
        <TextareaField
          label="Disclaimer"
          htmlFor="disclaimer"
          name="disclaimer"
          defaultValue={article?.disclaimer ?? undefined}
          rows={2}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="SEO-titel"
            htmlFor="seo_titel"
            name="seo_titel"
            defaultValue={article?.seo_titel ?? undefined}
          />
          <TextField
            label="SEO-beschrijving"
            htmlFor="seo_beschrijving"
            name="seo_beschrijving"
            defaultValue={article?.seo_beschrijving ?? undefined}
          />
        </div>
        {state?.error && (
          <p className="field-error" role="alert">
            {state.error}
          </p>
        )}
        <SubmitButton label={submitLabel} pendingLabel={pendingLabel} />
      </form>
    </Card>
  );
}
