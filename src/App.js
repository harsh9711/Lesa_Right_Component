import './App.css';
import React from 'react';
import styled from 'styled-components';
import LeasePanel from './components/LeasePanel.jsx';

const AppWrap = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf1f7 0%, #f6fbff 100%);
  cursor: pointer;
`;

const TopRight = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #ffd1e8;
  color: #ff4da6;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  cursor: pointer;
`;

function App() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const stop = (e) => e.stopPropagation();

  return (
    <AppWrap onClick={handleOpen}>
      <TopRight onClick={(e)=>{stop(e); setOpen(true);}} title="Open details">✨</TopRight>
      {open && <LeasePanel onClose={()=>setOpen(false)} />}
    </AppWrap>
  );
}

export default App;
