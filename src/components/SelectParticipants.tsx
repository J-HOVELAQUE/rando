import Select, { OptionTypeBase } from "react-select";
import { useEffect, useState } from "react";
import getParticipants from "../ajaxHandler/getParticipants";
import { RecordedParticipant } from "../interfaces/participant";

interface SelectParticipantComponentProps {
  onSelectParticipants: (participantsSelected: string[]) => void;
}

interface IOption {
  value: string;
  label: string;
}

export default function SelectParticipants(
  props: SelectParticipantComponentProps
) {
  const [options, setOptions] = useState<IOption[]>([]);

  useEffect(() => {
    setParticipantsInState();
  });

  const setParticipantsInState = async () => {
    const getParticipantsResult = await getParticipants();

    if (getParticipantsResult.outcome === "FAILURE") {
      return;
    }

    const participants: RecordedParticipant[] = getParticipantsResult.data;

    const formatedParticipants: IOption[] = participants.map((part) => {
      return {
        value: part._id,
        label: `${part.firstname} ${part.name}`,
      };
    });

    setOptions(formatedParticipants);
  };

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

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
