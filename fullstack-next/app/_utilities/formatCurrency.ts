const CURRENCY_FORMATTER = new Intl.NumberFormat("sv-SE", {
  currency: "SEK",
  style: "currency",
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}
