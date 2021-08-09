import { useState } from "react";
import axios from "axios";

type SelectedFile = File | null;

export default function UploadWidget(props) {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onClickHandler = async () => {
    if (selectedFile === null) {
      console.error("No file selected");
      return;
    }

    const data = new FormData();
    data.append("picture", selectedFile);

    const rawAnswer = await axios.post(
      "http://localhost:3000/place/picture",
      data
    );
    console.log(rawAnswer.statusText);
  };

  return (
    <>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />
      <button
        type="button"
        onClick={() => {
          onClickHandler();
        }}
      >
        Upload
      </button>
    </>
  );
}
