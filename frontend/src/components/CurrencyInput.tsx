import { ChangeEvent, CSSProperties } from "react";
import InputMask from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

interface ICurrencyInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  style?: CSSProperties;
}

export function CurrencyInput({ onChange, value, style }: ICurrencyInputProps) {
  const currencyMask = createNumberMask({
    prefix: "R$ ",
    suffix: "",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 6, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
  });

  return (
    <InputMask
      style={style}
      onChange={onChange}
      value={value}
      placeholder="Valor"
      className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-gray-300 rounded transition m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-600 focus:outline-none"
      mask={currencyMask}
    />
  );
}
