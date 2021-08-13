import ParticipantCard from "./components/ParticipantCard";

export default function ParticipantsScreen(props) {
  return (
    <>
      <h1 className="hiking-title">Participants</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
        <ParticipantCard />
      </div>
    </>
  );
}
