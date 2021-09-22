const allowedCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export default function alarmClockDisplay(
  durationInMinutes: number | string
): string {
  const durationInMinutesToDisplay = Number(durationInMinutes);

  const hoursValue = Math.floor(durationInMinutesToDisplay / 60);
  const minutesValue = durationInMinutesToDisplay % 60;

  let displayingMinutes: number | string = minutesValue;

  if (displayingMinutes.toString().split("").length === 1) {
    displayingMinutes = "0" + displayingMinutes.toString();
  }

  return `${hoursValue}:${displayingMinutes}`;
}
