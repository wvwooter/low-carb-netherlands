import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <p className="text-sm leading-relaxed text-ink-700">
            Dit is een conceptversie. Deze tekst moet vóór lancering
            juridisch worden gecontroleerd door een gekwalificeerde jurist.
          </p>
        </Card>
        <h1 className="font-serif text-4xl font-semibold text-forest-900">{title}</h1>
        <p className="mt-2 text-sm text-ink-500">Laatst bijgewerkt: {updated}</p>
        <div className="prose prose-forest mt-8 max-w-none space-y-5 leading-relaxed text-ink-800">
          {children}
        </div>
      </div>
    </section>
  );
}
