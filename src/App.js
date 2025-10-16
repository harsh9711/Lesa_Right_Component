import './App.css';
import { SelectedSites } from './components/RightPanelBox/index.jsx';
import RightComponent from './components/RigthPanel/index.jsx';


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
