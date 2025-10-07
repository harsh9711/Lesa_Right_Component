import './App.css';
import NationalStats from './components/NationalCard';
import Seattle from './components/Seattle';

function App() {
  return (
    <div className="App"
      style={{
        position:"relative"
      }}
    >
      <NationalStats/>
      <Seattle/>
    </div>
  );
}

export default App;
