import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Video's",
  description: "Video's en lezingen over low-carb en metabole gezondheid.",
};

export default function VideosPage() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Video&apos;s
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Binnenkort verzamelen we hier lezingen, interviews en
            uitlegvideo&apos;s over low-carb en metabole gezondheid.
          </p>
        </div>

        <Card className="mt-10 border-dashed text-center">
          <p className="text-ink-600">
            Er zijn nog geen video&apos;s geplaatst. Heb je een video of
            lezing die hier past?{" "}
            <a href="/contact" className="text-forest-800 underline">
              Draag hem aan via het contactformulier
            </a>
            .
          </p>
        </Card>
      </div>
    </section>
  );
}
