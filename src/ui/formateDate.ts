export function formatDate(isoDate: string): string {
  try {
    const dateObj: Date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      //   day: "numeric",
    };
    const formattedDate: string = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  } catch (error) {
    return "Invalid date format";
  }
}
