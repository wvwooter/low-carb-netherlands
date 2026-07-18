"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField } from "@/components/ui/Field";
import { addVideo } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Bezig met toevoegen…" : "Video toevoegen"}
    </Button>
  );
}

export function AddVideoForm() {
  const [state, formAction] = useFormState(addVideo, null);
  const formRef = useRef<HTMLFormElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (state && !state.error) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <Card>
      <h2 className="mb-4 font-serif text-lg font-semibold text-forest-900">
        Nieuwe video toevoegen
      </h2>
      <form ref={formRef} action={formAction} className="space-y-4">
        <TextField label="Titel" htmlFor="titel" name="titel" required />
        <TextField
          label="YouTube-link"
          htmlFor="youtube_url"
          name="youtube_url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          required
        />
        <TextareaField
          label="Beschrijving (optioneel)"
          htmlFor="beschrijving"
          name="beschrijving"
          rows={3}
        />
        {state?.error && (
          <p className="field-error" role="alert">
            {state.error}
          </p>
        )}
        <SubmitButton />
      </form>
    </Card>
  );
}
