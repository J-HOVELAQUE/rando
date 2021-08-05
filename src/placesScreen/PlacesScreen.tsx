import CardPlace from "./components/CardPlace";

export default function PlacesScreen(props) {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Lieux de randonée</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
      </div>
    </>
  );
}
