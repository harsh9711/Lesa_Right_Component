import './App.css';
import RightComponent, { SelectedSites } from './components/RigthPanel/index.jsx';


function App() {
  return (
    <div className="App"
      style={{
        position:"relative"
      }}
    >
      {/* <RightComponent/> */}
      <SelectedSites/>
    </div>
  );
}

export default App;
