import Select, { OptionTypeBase } from "react-select";
import { useEffect } from "react";

interface SelectParticipantComponentProps {
  onSelectParticipants: (participantsSelected: string[]) => void;
}

export default function SelectParticipants(
  props: SelectParticipantComponentProps
) {
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>>>>useEffect");
  });
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Select
      options={options}
      isMulti={true}
      onChange={(event) => {
        props.onSelectParticipants(event.map((opt) => opt.value));
      }}
    />
  );
}
