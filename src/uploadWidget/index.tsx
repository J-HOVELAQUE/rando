import { useState } from "react";

export default function UploadWidget(props) {
  let fileCopy: File;
  const [fileToUpload, setFileToUpload] = useState<File>();

  const sendFile = async (e) => {
    if (fileToUpload === undefined) {
      return;
    }
    e.preventDefault();
    const data = new FormData();
    data.append("Autre info", "J'y arrive");
    data.append("fileProut", fileToUpload);
    const answerRaw = await fetch("http://localhost:3000/place/picture", {
      method: "POST",
      body: data,
    });
  };

  return (
    <>
      <h1>Test</h1>
      <form>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            if (e.target.files !== null) {
              setFileToUpload(e.target.files[0]);
            }
          }}
        />
        <button
          onClick={(e) => {
            sendFile(e);
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}
