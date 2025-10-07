import LeaseDonut from "./Donut";
import LeaseForecast from "./ForcastBar";
import '../styles/nationalCard.css'

export default function Seattle() {
  return (
    <div className="analysis-container">
      <h2 className="analysis-title">Seattle</h2>

      <LeaseDonut />

      <p className="analysis-total">Total Sites: 82,723</p>
      <p className="analysis-forecast">Forecast</p>

      <LeaseForecast />
    </div>
  );
}