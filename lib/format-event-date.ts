export function formatEventDate(datum: string, einddatum?: string) {
  const start = new Date(datum);
  const startLabel = start.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!einddatum || einddatum === datum) {
    return startLabel;
  }

  const end = new Date(einddatum);
  const sameMonth =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  const startShort = sameMonth
    ? start.toLocaleDateString("nl-NL", { day: "numeric" })
    : start.toLocaleDateString("nl-NL", { day: "numeric", month: "long" });
  const endLabel = end.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${startShort}–${endLabel}`;
}
