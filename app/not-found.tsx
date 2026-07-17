import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-xl text-center">
        <h1 className="font-serif text-4xl font-semibold text-forest-900">
          Pagina niet gevonden
        </h1>
        <p className="mt-4 leading-relaxed text-ink-700">
          De pagina die je zoekt bestaat niet (meer) of is verplaatst.
        </p>
        <LinkButton href="/" className="mt-8">
          Terug naar de homepage
        </LinkButton>
      </div>
    </section>
  );
}
