interface IDurationInHoursAndMinutes {
  mins: number;
  hours: number;
}

export default function giveInHoursAndMinutes(
  min: number
): IDurationInHoursAndMinutes {
  const hours = Math.floor(min / 60);
  const remainingMin = min % 60;

  return { mins: remainingMin, hours };
}
