import CardPlace from "./components/CardPlace";

export default function PlacesScreen(props) {
  return (
    <>
      <h1 className="hikingTitle">Lieux de randonnée</h1>
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
