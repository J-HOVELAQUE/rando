const monthInLetter: string[] = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export default function givePrettyDate(dateToFormat: Date | string): string {
  if (typeof dateToFormat === "string") {
    try {
      dateToFormat = new Date(dateToFormat);
    } catch (error) {
      return "invalid date";
    }
  }
  const year = dateToFormat.getFullYear();
  const month = dateToFormat.getMonth();
  const day = dateToFormat.getDate();

  const prettyDate: string = `${day} ${monthInLetter[month]} ${year}`;

  return prettyDate;
}
