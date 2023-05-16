import CurrencyFlag from "react-currency-flags";

export default function CurrencyFlagLogo({ currency }: { currency: string }) {
  return <CurrencyFlag currency={currency} size="sm" />;
}
