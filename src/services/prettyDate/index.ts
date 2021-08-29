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

export default function givePrettyDate(dateToFormat: Date): string {
  const year = dateToFormat.getFullYear();
  const month = dateToFormat.getMonth();
  const day = dateToFormat.getDate();

  const prettyDate: string = `${day} ${monthInLetter[month]} ${year}`;

  return prettyDate;
}
