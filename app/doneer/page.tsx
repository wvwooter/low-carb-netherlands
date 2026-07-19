import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { CopyAddressButton } from "./CopyAddressButton";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Doneer",
  description:
    "Steun Low Carb Netherlands met een donatie in bitcoin. Elke bijdrage helpt ons om betrouwbare, koolhydraatarme voorlichting gratis toegankelijk te houden.",
  ...canonical("/doneer"),
};

const BTC_ADDRESS = "bc1q79vg0fdusfdntkjee2jgnfcq80v28vueq2dfug";

export default function DoneerPage() {
  return (
    <section className="section bg-forest-50/40">
      <div className="container-page max-w-xl">
        <h1 className="font-serif text-4xl font-semibold text-forest-900">
          Doneer
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-700">
          Low Carb Netherlands is gratis toegankelijk voor iedereen. Vind je
          wat we doen waardevol? Met een donatie in bitcoin help je ons deze
          site draaiende te houden en uit te breiden.
        </p>

        <Card className="mt-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl border border-ink-100 p-3">
              <Image
                src="/doneer/btc-qr.png"
                alt="QR-code voor het bitcoin-donatieadres"
                width={220}
                height={220}
                priority
              />
            </div>

            <div className="w-full">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-500">
                Bitcoin-adres
              </p>
              <p className="break-all rounded-lg bg-forest-50 px-4 py-3 font-mono text-sm text-forest-900">
                {BTC_ADDRESS}
              </p>
            </div>

            <CopyAddressButton address={BTC_ADDRESS} />
          </div>
        </Card>

        <p className="mt-6 text-sm leading-relaxed text-ink-500">
          Scan de QR-code met je wallet-app of kopieer het adres hierboven.
          Donaties zijn vrijwillig en niet fiscaal aftrekbaar. Bedankt voor je
          steun.
        </p>
      </div>
    </section>
  );
}
