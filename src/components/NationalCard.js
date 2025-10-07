import LeaseDonut from "./Dont";
import LeaseForecast from "./ForcastBar";

export default function NationalStats() {
  return (
    <div style={{
      padding: "16px",
      borderRadius: "16px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      background: "#fff",
      maxWidth: "400px",
      margin: "auto"
    }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>
        National
      </h2>

      <LeaseDonut />

      <p style={{
        textAlign: "center",
        marginTop: "8px",
        color: "#6b7280",
        fontSize: "0.875rem"
      }}>
        Total Sites: 82,723
      </p>

      <LeaseForecast />
    </div>
  );
}
