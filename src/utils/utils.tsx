import { Property } from "#/backend/types";
import { IconPrice } from "./svgs";

export function getBathrooms(property: Property) {
  if (!property.charRef) return 0;

  const { banos = 0, aseo = 0 } = property.charRef;
  return banos + aseo;
}

export function getBedrooms(property: Property) {
  if (!property.charRef) return 0;
  const { dormitoriosSuite = 0, dormitorios = 0 } = property.charRef;
  return dormitoriosSuite + dormitorios;
}

export function getMetersSquare(property: Property) {
  if (!property.charRef) return 0;
  const { metrosCuadradros = 0 } = property.charRef;
  return metrosCuadradros;
}

export function formatPrice(value: number): number {
  return parseFloat((value / 1_000_000).toFixed(4));
}

export function formatCurrency(
  value: number,
  rent: boolean = false,
): JSX.Element {
  let formattedValue;
  if (value >= 1_000_000) {
    const millionValue = value / 1_000_000;
    formattedValue = millionValue + "M";
  } else if (value >= 1_000) {
    const thousandValue = value / 1_000;
    formattedValue = Number.isInteger(thousandValue)
      ? thousandValue + "K"
      : thousandValue.toFixed(0) + "K";
  } else {
    formattedValue = value.toLocaleString("de-DE");
  }

  return (
    <div className="flex items-center">
      <div className="text-xl">{formattedValue}</div>
      <div>
        <IconPrice />
      </div>
      <span className="italic">{rent ? "" : "/mes"}</span>
    </div>
  );
}

// Usage example in components:
// const isMobile = useMediaQuery('(max-width: 768px)');
