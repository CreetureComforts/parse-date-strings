// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDateString = (value: any) =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseStringDates = (obj: any) => {
  if (!obj) return null;

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "string" && isDateString(value)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = new Date(value);
    } else if (typeof value === "object" && value !== null) {
      parseStringDates(value);
    } else if (Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value.forEach((item: any) => {
        if (typeof item === "object" && item !== null) {
          parseStringDates(item);
        }
      });
    }
  });
  return obj;
};
