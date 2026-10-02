/** Formats an integer cents amount as a localized currency string. Safe to import from both client and server code. */
export function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(cents / 100);
}
