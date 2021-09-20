interface IDurationInHoursAndMinutes {
  mins: number;
  hours: number;
}

export function giveInMinutes(
  durationInHoursAndMinutes: IDurationInHoursAndMinutes
): number {
  return durationInHoursAndMinutes.hours * 60 + durationInHoursAndMinutes.mins;
}
