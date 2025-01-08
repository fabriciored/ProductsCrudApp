export default function parseStringToBoolean(
    value: string | null | boolean
  ): boolean | null {
    return typeof value === "boolean"
      ? value
      : value === "true"
      ? true
      : value === "false"
      ? false
      : null;
  }