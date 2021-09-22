import { useState } from "react";
import alarmClockDisplay from "../services/alarmClockDisplay/index";

interface IDurationInputProps {
  className: string;
  initialDisplayedValue?: string;
  returnValueInMinutesOnBlurr: (valueInMinutes: number) => void;
}

const allowedCharacters = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ":",
  null,
];

export default function DurationInput(props: IDurationInputProps) {
  const [valueToDisplay, setValueTodisplay] = useState<string>("00:00");
  const [trueValue, setTrueValue] = useState<string>("00:00");

  const onChangeRecordedValue = () => {
    const splittedValueToDisplay: string[] = valueToDisplay.split(":");

    if (
      splittedValueToDisplay.length >= 3 ||
      splittedValueToDisplay.length < 2
    ) {
      setValueTodisplay(trueValue);
      return;
    }

    const hoursValue = Number(splittedValueToDisplay[0]);
    const minutesValue = Number(splittedValueToDisplay[1]);
    const valueInMinutes = hoursValue * 60 + minutesValue;

    const newValue = alarmClockDisplay(valueInMinutes);

    setValueTodisplay(newValue);
    setTrueValue(newValue);

    props.returnValueInMinutesOnBlurr(valueInMinutes);
  };

  return (
    <input
      className={props.className}
      onChange={(e) => {
        const myEvent: any = e.nativeEvent;

        if (allowedCharacters.includes(myEvent.data)) {
          setValueTodisplay(e.target.value);
        }
      }}
      onBlur={() => {
        onChangeRecordedValue();
      }}
      value={valueToDisplay}
    ></input>
  );
}
