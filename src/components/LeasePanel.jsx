import React from 'react';
import styled from 'styled-components';

const PanelWrap = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  width: ${p => (p.$wide ? '720px' : '420px')};
  max-height: calc(100vh - 48px);
  overflow: auto;
  background: #ffffffee;
  border: 2px solid #ff4da6;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  backdrop-filter: blur(6px);
  transition: width 220ms ease;
`;
const AccordionGroup = styled.div`
  margin: 10px 16px;
  padding: 12px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(255,77,166,0.08);
`;

const Header = styled.div`
  padding: 18px 20px 10px 20px;
  border-bottom: 1px solid #f1d0e3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 22px;
  color: #2b2b2b;
`;
const AccordionContent = styled.div`
  max-height: ${p => (p.$open ? (p.$wide ? '9999px' : '500px') : '0')};
  opacity: ${p => (p.$open ? '1' : '0')};
  overflow: hidden;
  transition: all 0.4s ease;
  margin-top: ${p => (p.$open ? '10px' : '0')};
`;

const SubTitle = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color:black;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 12px;
  right: 20px;
`;

const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid #ffd1e8;
  background: #fff;
  color: #ff4da6;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
`;

const SectionCard = styled.button`
  margin: 14px 16px;
  padding: 16px;
  border-radius: 12px;
  background: ${p => (p.$active ? '#fff' : '#fff')};
  border: 2px solid ${p => (p.$active && p.$wide ? '#ff4da6' : p.$active ? '#f4c8dc' : '#ececf2')};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: calc(100% - 32px);
  cursor: pointer;
  box-shadow: ${p => (p.$active ? '0 6px 14px rgba(255,77,166,0.12)' : '0 2px 6px rgba(0,0,0,0.04)')};
  transition: all 0.3s ease;
`;

const SectionTitle = styled.div`
  font-weight: 700;
  color: #2b2b2b;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  flex: 1;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
`;

const Badge = styled.span`
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${p => p.color || '#ccc'};
  color: ${p => p.color || '#555'};
  background: #fff;
  font-size: 14px;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
  margin-top: 12px;
`;

const DetailItem = styled.div`
  border-left: 3px solid #e9e9ef;
  padding-left: 10px;
  font-size: 13px;
  color: #3b3b3b;
`;

const Hint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: #6a6a6a;
  font-size: 12px;
`;

const InsightTitle = styled.div`
  font-weight: 700;
  color: #2b2b2b;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InsightText = styled.p`
  margin: 10px 0 0 0;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 1.5;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
`;

const LeftCol = styled.div``;

const PreviewShell = styled.div`
  margin: 0 16px 16px 0;
  padding: 14px;
  border: 1px solid #f1d0e3;
  border-radius: 12px;
  background: #fafbfc;
  display: grid;
  grid-template-columns: 1fr 72px;
  gap: 12px;
`;

const Canvas = styled.div`
  height: 280px;
  border-radius: 10px;
  background: #efefef;
  border: 1px solid #e8e8ef;
  position: relative;
`;

const CanvasMarker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 28px;
  border: 2px dashed #ff6ea9;
  border-radius: 6px;
`;

const Thumbs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Thumb = styled.div`
  width: 64px;
  height: 60px;
  border-radius: 10px;
  background: #e9e9ee;
  border: 1px solid #e1e1ea;
`;

const AccordionInner = styled.div`
  display: grid;
  grid-template-columns: ${p => (p.$wide ? '1.2fr 1.6fr' : '1fr')};
  gap: 16px;
  align-items: start;
`;

export default function App({ onClose }) {
  const [wide, setWide] = React.useState(false);
  const [openKeys, setOpenKeys] = React.useState({ ground: true, tower: false, utility: false, access: false, insights: false });
  const [activeKey, setActiveKey] = React.useState('ground');

  const toggle = (key) => {
    setActiveKey(key);
    setOpenKeys({ ground: false, tower: false, utility: false, access: false, insights: false, [key]: true });
  };

  return (
    <PanelWrap $wide={wide} onClick={(e)=>e.stopPropagation()}>
      <Header>
        <div>
          <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between', gap:'10px'}}>
          <Title>Site: <span style={{fontWeight:600}}>ABCD1234</span></Title>
          {!wide ? null
           : (<>
          <IconBtn aria-label="favorite">☆</IconBtn>
          <IconBtn aria-label="expand" onClick={()=>setWide(w=>!w)} title="Toggle wide view">➕</IconBtn></>)}</div>
          <SubTitle>Seattle \\ West \\ Northwest</SubTitle>
          <SubTitle style={{marginTop:6}}>Tower Type: Macro Tower (150 ft)</SubTitle>
      
        </div>
        <HeaderRight>
          {wide ? (
            <IconBtn aria-label="close" onClick={onClose} title="Close">✖</IconBtn>
          ) : (<>
          <IconBtn aria-label="favorite">☆</IconBtn>
          <IconBtn aria-label="expand" onClick={()=>setWide(w=>!w)} title="Toggle wide view">➕</IconBtn></>)}
          
        </HeaderRight>
      </Header>

      <ContentGrid $wide={wide}>
        <LeftCol>
          <AccordionGroup>
            {[
              {k:'ground',label:'Ground Lease',icon:'🏳️'},
              {k:'tower',label:'Tower Lease',icon:'🗼'},
              {k:'utility',label:'Utility Easement',icon:'🧬'},
              {k:'access',label:'Access Easement',icon:'🔗'},
              {k:'insights',label:'Insights',icon:'✴️'}
            ].map(({k,label,icon}) => (
              <SectionCard
                key={k}
                onClick={() => toggle(k)}
                aria-expanded={openKeys[k]}
                $active={activeKey === k}
                $wide={wide}
              >
                <div style={{width:'100%'}}>
                  <SectionHeader>
                    <SectionTitle>
                      <span>{icon}</span> {label}
                    </SectionTitle>
                    {k !== 'insights' && (
                      <BadgeRow>
                        <Badge title="On track" color="#1db954">✓</Badge>
                        <Badge title="Risk" color="#ff7a45">!</Badge>
                        <Badge title="Notes" color="#ff4da6">≡</Badge>
                      </BadgeRow>
                    )}
                  </SectionHeader>

                  <AccordionContent $open={openKeys[k]} $wide={wide}>
                    {k === 'ground' && (
                      <AccordionInner $wide={wide}>
                        <div> 
                          <DetailGrid>
                            <DetailItem>04/01/2016 – <span style={{color:'#ff4d4f', fontWeight:600}}>03/31/2026</span></DetailItem>
                            <DetailItem>Monthly Rent<br/><b>$2,345</b></DetailItem>
                            <DetailItem>Owner<br/>John Smith</DetailItem>
                            <DetailItem>Renewal Option<br/>3x5 Yr</DetailItem>
                            <DetailItem>Co-location<br/>AT&T, Verizon</DetailItem>
                          </DetailGrid>
                          <Hint>
                            <span>✨</span>
                            <span>Landowner signaled rent hike request (~15%)</span>
                          </Hint>
                        </div>
                        {wide && (
                          <PreviewShell>
                            <Canvas>
                              <CanvasMarker style={{ borderColor: '#ff6ea9' }} />
                            </Canvas>
                            <Thumbs>
                              <Thumb />
                              <Thumb />
                              <Thumb />
                            </Thumbs>
                          </PreviewShell>
                        )}
                      </AccordionInner>
                    )}
                    {k === 'tower' && (
                      <AccordionInner $wide={wide}>
                        <div>
                          <DetailGrid>
                            <DetailItem>Start Date<br/>01/01/2018</DetailItem>
                            <DetailItem>Status<br/><b>Active</b></DetailItem>
                            <DetailItem>Notes<br/>No outstanding items</DetailItem>
                            <DetailItem>Revision<br/>None</DetailItem>
                          </DetailGrid>
                        </div>
                        {wide && (
                          <PreviewShell>
                            <Canvas>
                              <CanvasMarker style={{ borderColor: '#6ea9ff' }} />
                            </Canvas>
                            <Thumbs>
                              <Thumb />
                              <Thumb />
                              <Thumb />
                            </Thumbs>
                          </PreviewShell>
                        )}
                      </AccordionInner>
                    )}
                    {k === 'utility' && (
                      <AccordionInner $wide={wide}>
                        <div>
                          <DetailGrid>
                            <DetailItem>Utility<br/>Power + Fiber</DetailItem>
                            <DetailItem>Status<br/><b>Operational</b></DetailItem>
                          </DetailGrid>
                        </div>
                        {wide && (
                          <PreviewShell>
                            <Canvas>
                              <CanvasMarker style={{ borderColor: '#34c759' }} />
                            </Canvas>
                            <Thumbs>
                              <Thumb />
                              <Thumb />
                              <Thumb />
                            </Thumbs>
                          </PreviewShell>
                        )}
                      </AccordionInner>
                    )}
                    {k === 'access' && (
                      <AccordionInner $wide={wide}>
                        <div>
                          <DetailGrid>
                            <DetailItem>Access Road<br/>Paved, 200m</DetailItem>
                            <DetailItem>Condition<br/>Good</DetailItem>
                          </DetailGrid>
                        </div>
                        {wide && (
                          <PreviewShell>
                            <Canvas>
                              <CanvasMarker style={{ borderColor: '#ffb020' }} />
                            </Canvas>
                            <Thumbs>
                              <Thumb />
                              <Thumb />
                              <Thumb />
                            </Thumbs>
                          </PreviewShell>
                        )}
                      </AccordionInner>
                    )}
                    {k === 'insights' && (
                      <>
                        <InsightTitle>
                        </InsightTitle>
                        <InsightText>
                          The ground lease for this site is set to expire on March 15, 2026 (next 6 months). Landlord has indicated interest in revising terms upward by ~15%.
                        </InsightText>
                        <InsightText>
                          Opportunity: Strategically located near a major corridor; relocation unlikely.
                        </InsightText>
                        <InsightText>
                          Action: Start negotiations by December 2025.
                        </InsightText>
                      </>
                    )}
                  </AccordionContent>
                </div>
              </SectionCard>
            ))}
          </AccordionGroup>
        </LeftCol>
      </ContentGrid>
    </PanelWrap>
  );
}

// import React from 'react';
// import styled from 'styled-components';

// const PanelWrap = styled.div`
//   position: absolute;
//   top: 24px;
//   right: 24px;
//   width: ${p => (p.$wide ? '720px' : '420px')};
//   max-height: calc(100vh - 48px);
//   overflow: auto;
//   background: #ffffffee;
//   border: ${p => (p.$wide ? 'none' : '2px solid #ff4da6')};
//   border-radius: 16px;
//   box-shadow: 0 12px 30px rgba(0,0,0,0.15);
//   backdrop-filter: blur(6px);
//   transition: width 220ms ease;
// `;
// const AccordionGroup = styled.div`
//   margin: 10px 16px;
//   padding: 12px;
//   border-radius: 14px;
//   box-shadow: 0 8px 20px rgba(255,77,166,0.08);
// `;

// const Header = styled.div`
//   padding: 18px 20px 10px 20px;
//   border-bottom: ${p => (p.$wide ? 'none' : '1px solid #f1d0e3')};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
// `;

// const Title = styled.div`
//   font-weight: 300;
//   font-size: 22px;
//   color: #2b2b2b;
// `;
// const AccordionContent = styled.div`
//   max-height: ${p => (p.$open ? (p.$wide ? '9999px' : '500px') : '0')};
//   opacity: ${p => (p.$open ? '1' : '0')};
//   overflow: hidden;
//   transition: all 0.4s ease;
//  `;

// const SubTitle = styled.div`
//   margin-top: 4px;
//   font-size: 12px;
//   color:black;
// `;

// const HeaderRight = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   position: absolute;
//   top: 12px;
//   right: 20px;
// `;

// const IconBtn = styled.button`
//   width: 32px;
//   height: 32px;
//   border-radius: 10px;
//   border: 1px solid #ffd1e8;
//   background: #fff;
//   color: #ff4da6;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   box-shadow: 0 4px 10px rgba(0,0,0,0.06);
// `;

// const SectionCard = styled.button`
//   margin: 0 16px 16px 16px;
//   padding: ${p => (p.$wide ? '0' : '16px')};
//   border-radius: 12px;
//   background: ${p => (p.$active ? '#fff' : '#fff')};
//   border: ${p => (p.$wide ? 'none' : `2px solid ${p.$active ? '#f4c8dc' : '#ececf2'}`)};
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   width: calc(100% - 32px);
//   cursor: pointer;
//   box-shadow: ${p => (p.$wide ? 'none' : (p.$active ? '0 6px 14px rgba(255,77,166,0.12)' : '0 2px 6px rgba(0,0,0,0.04)'))};
//   transition: all 0.3s ease;
// `;

// const SectionTitle = styled.div`
//   font-weight: 700;
//   color: #2b2b2b;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   font-size: 16px;
//   flex: 1;
// `;

// const BadgeRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const SectionHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
//   gap: 12px;
// `;

// const Badge = styled.span`
//   width: 28px;
//   height: 28px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   border: 1px solid ${p => p.color || '#ccc'};
//   color: ${p => p.color || '#555'};
//   background: #fff;
//   font-size: 14px;
// `;

// const DetailGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 10px 16px;
//   margin-top: 12px;
// `;

// const DetailItem = styled.div`
//   border-left: 3px solid #e9e9ef;
//   padding-left: 10px;
//   font-size: 13px;
//   color: #3b3b3b;
// `;

// const Hint = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-top: 10px;
//   color: #6a6a6a;
//   font-size: 12px;
// `;

// const InsightTitle = styled.div`
//   font-weight: 700;
//   color: #2b2b2b;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const InsightText = styled.p`
//   margin: 10px 0 0 0;
//   color: #4a4a4a;
//   font-size: 13px;
//   line-height: 1.5;
// `;

// const ContentGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 14px;
// `;

// const LeftCol = styled.div``;

// const PreviewShell = styled.div`
//   margin: 0 16px 16px 0;
//   padding: 14px;
//   border: ${p => (p.$wide ? '1px solid #f1d0e3' : '1px solid #f1d0e3')};
//   border-left: ${p => (p.$wide ? 'none' : '1px solid #f1d0e3')};
//   border-top: ${p => (p.$wide ? 'none' : '1px solid #f1d0e3')};
//   border-radius: 12px;
//   border-top-left-radius: ${p => (p.$wide ? '0' : '12px')};
//   border-bottom-left-radius: ${p => (p.$wide ? '0' : '12px')};
//   background: ${p => (p.$wide ? '#fafbfc' : '#fafbfc')};
//   display: grid;
//   grid-template-columns: 1fr 72px;
//   gap: 12px;
// `;

// const DetailsShell = styled.div`
//   margin: 0 0 16px 16px;
//   padding: 14px;
//   border: ${p => (p.$wide ? '1px solid #f1d0e3' : '1px solid #f1d0e3')};
//   border-right: ${p => (p.$wide ? 'none' : '1px solid #f1d0e3')};
//   border-top: ${p => (p.$wide ? 'none' : '1px solid #f1d0e3')};
//   border-radius: 0px;
//   border-top-right-radius: ${p => (p.$wide ? '0' : '12px')};
//   border-bottom-right-radius: ${p => (p.$wide ? '0' : '12px')};
//   background: ${p => (p.$wide ? '#fafbfc' : '#fafbfc')};
// `;

// const SectionHeaderBar = styled.div`
//   margin: 24px 6px 0px 6px;
//   padding: 16px 14px 14px 14px;
//   border-top: 1px solid #f1d0e3;
//   border-left: 1px solid #f1d0e3;
//   border-right: 1px solid #f1d0e3;
//   border-top-left-radius: 12px;
//   border-top-right-radius: 12px;
//   border-bottom: 1px solid #f1d0e3;
//   border-bottom-left-radius: 0;
//   border-bottom-right-radius: 0;
// `;

// const Canvas = styled.div`
//   height: 280px;
//   border-radius: 10px;
//   background: #efefef;
//   border: 1px solid #e8e8ef;
//   position: relative;
// `;

// const CanvasMarker = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 180px;
//   height: 28px;
//   border: 2px dashed #ff6ea9;
//   border-radius: 6px;
// `;

// const Thumbs = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

// const Thumb = styled.div`
//   width: 64px;
//   height: 60px;
//   border-radius: 10px;
//   background: #e9e9ee;
//   border: 1px solid #e1e1ea;
// `;

// const AccordionInner = styled.div`
//   display: grid;
//   grid-template-columns: ${p => (p.$wide ? '1.2fr 1.6fr' : '1fr')};
//   gap: ${p => (p.$wide ? '0' : '16px')};
//   align-items: start;
//   margin:0  6px 20px 6px;
// `;

// const SECTIONS = [
//   {k:'ground',label:'Ground Lease',icon:'🏳️'},
//   {k:'tower',label:'Tower Lease',icon:'🗼'},
//   {k:'utility',label:'Utility Easement',icon:'🧬'},
//   {k:'access',label:'Access Easement',icon:'🔗'},
//   {k:'insights',label:'Insights',icon:'✴️'}
// ];

// export default function App({ onClose }) {
//   const [wide, setWide] = React.useState(false);
//   const [openKeys, setOpenKeys] = React.useState({ ground: true, tower: false, utility: false, access: false, insights: false });
//   const [activeKey, setActiveKey] = React.useState('ground');

//   const toggle = (key) => {
//     setActiveKey(key);
//     setOpenKeys({ ground: false, tower: false, utility: false, access: false, insights: false, [key]: true });
//   };

//   const sortedSections = React.useMemo(() => {
//     const active = SECTIONS.find(s => s.k === activeKey);
//     const rest = SECTIONS.filter(s => s.k !== activeKey);
//     return active ? [active, ...rest] : SECTIONS;
//   }, [activeKey]);

//   return (
//     <PanelWrap $wide={wide} onClick={(e)=>e.stopPropagation()}>
//       <Header $wide={wide}>
//         <div>
//           <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between', gap:'10px'}}>
//           <Title>Site: <span style={{fontWeight:600}}>ABCD1234</span></Title>
//           {!wide ? null
//            : (<>
//           <IconBtn aria-label="favorite">☆</IconBtn>
//           <IconBtn aria-label="expand" onClick={()=>setWide(w=>!w)} title="Toggle wide view">➕</IconBtn></>)}</div>
//           <SubTitle>Seattle \\ West \\ Northwest</SubTitle>
//           <SubTitle style={{marginTop:6}}>Tower Type: Macro Tower (150 ft)</SubTitle>
      
//         </div>
//         <HeaderRight>
//           {wide ? (
//             <IconBtn aria-label="close" onClick={onClose} title="Close">✖</IconBtn>
//           ) : (<>
//           <IconBtn aria-label="favorite">☆</IconBtn>
//           <IconBtn aria-label="expand" onClick={()=>setWide(w=>!w)} title="Toggle wide view">➕</IconBtn></>)}
          
//         </HeaderRight>
//       </Header>

//       <ContentGrid $wide={wide}>
//         <LeftCol>
//           <AccordionGroup>
//             {sortedSections.map(({k,label,icon}) => (
//               <SectionCard
//                 key={k}
//                 onClick={() => toggle(k)}
//                 aria-expanded={openKeys[k]}
//                 $active={activeKey === k}
//                 $wide={wide}
//               >
//                 <div style={{width:'100%'}}>
//                   {wide ? (
//                     <>
//                       <SectionHeaderBar>
//                         <SectionHeader>
//                           <SectionTitle>
//                             <span>{icon}</span> {label}
//                           </SectionTitle>
//                           {k !== 'insights' && (
//                             <BadgeRow>
//                               <Badge title="On track" color="#1db954">✓</Badge>
//                               <Badge title="Risk" color="#ff7a45">!</Badge>
//                               <Badge title="Notes" color="#ff4da6">≡</Badge>
//                             </BadgeRow>
//                           )}
//                         </SectionHeader>
//                       </SectionHeaderBar>
//                       <AccordionContent $open={openKeys[k]} $wide={wide}>
//                         {k === 'ground' && (
//                           <AccordionInner $wide={wide}>
//                             <DetailsShell $wide={wide} style={{borderTopLeftRadius: 0}}>
//                               <DetailGrid>
//                                 <DetailItem>04/01/2016 – <span style={{color:'#ff4d4f', fontWeight:600}}>03/31/2026</span></DetailItem>
//                                 <DetailItem>Monthly Rent<br/><b>$2,345</b></DetailItem>
//                                 <DetailItem>Owner<br/>John Smith</DetailItem>
//                                 <DetailItem>Renewal Option<br/>3x5 Yr</DetailItem>
//                                 <DetailItem>Co-location<br/>AT&T, Verizon</DetailItem>
//                               </DetailGrid>
//                               <Hint>
//                                 <span>✨</span>
//                                 <span>Landowner signaled rent hike request (~15%)</span>
//                               </Hint>
//                             </DetailsShell>
//                             <PreviewShell $wide={wide} style={{borderTopRightRadius: 0}}>
//                               <Canvas>
//                                 <CanvasMarker style={{ borderColor: '#ff6ea9' }} />
//                               </Canvas>
//                               <Thumbs>
//                                 <Thumb />
//                                 <Thumb />
//                                 <Thumb />
//                               </Thumbs>
//                             </PreviewShell>
//                           </AccordionInner>
//                         )}
//                         {k === 'tower' && (
//                           <AccordionInner $wide={wide}>
//                             <DetailsShell $wide={wide} style={{borderTopLeftRadius: 0}}>
//                               <DetailGrid>
//                                 <DetailItem>Start Date<br/>01/01/2018</DetailItem>
//                                 <DetailItem>Status<br/><b>Active</b></DetailItem>
//                                 <DetailItem>Notes<br/>No outstanding items</DetailItem>
//                                 <DetailItem>Revision<br/>None</DetailItem>
//                               </DetailGrid>
//                             </DetailsShell>
//                             <PreviewShell $wide={wide} style={{borderTopRightRadius: 0}}>
//                               <Canvas>
//                                 <CanvasMarker style={{ borderColor: '#6ea9ff' }} />
//                               </Canvas>
//                               <Thumbs>
//                                 <Thumb />
//                                 <Thumb />
//                                 <Thumb />
//                               </Thumbs>
//                             </PreviewShell>
//                           </AccordionInner>
//                         )}
//                         {k === 'utility' && (
//                           <AccordionInner $wide={wide}>
//                             <DetailsShell $wide={wide} style={{borderTopLeftRadius: 0}}>
//                               <DetailGrid>
//                                 <DetailItem>Utility<br/>Power + Fiber</DetailItem>
//                                 <DetailItem>Status<br/><b>Operational</b></DetailItem>
//                               </DetailGrid>
//                             </DetailsShell>
//                             <PreviewShell $wide={wide} style={{borderTopRightRadius: 0}}>
//                               <Canvas>
//                                 <CanvasMarker style={{ borderColor: '#34c759' }} />
//                               </Canvas>
//                               <Thumbs>
//                                 <Thumb />
//                                 <Thumb />
//                                 <Thumb />
//                               </Thumbs>
//                             </PreviewShell>
//                           </AccordionInner>
//                         )}
//                         {k === 'access' && (
//                           <AccordionInner $wide={wide}>
//                             <DetailsShell $wide={wide} style={{borderTopLeftRadius: 0}}>
//                               <DetailGrid>
//                                 <DetailItem>Access Road<br/>Paved, 200m</DetailItem>
//                                 <DetailItem>Condition<br/>Good</DetailItem>
//                               </DetailGrid>
//                             </DetailsShell>
//                             <PreviewShell $wide={wide} style={{borderTopRightRadius: 0}}>
//                               <Canvas>
//                                 <CanvasMarker style={{ borderColor: '#ffb020' }} />
//                               </Canvas>
//                               <Thumbs>
//                                 <Thumb />
//                                 <Thumb />
//                                 <Thumb />
//                               </Thumbs>
//                             </PreviewShell>
//                           </AccordionInner>
//                         )}
//                         {k === 'insights' && (
//                           <div style={{padding:'12px 14px'}}>
//                             <InsightTitle>
//                             </InsightTitle>
//                             <InsightText>
//                               The ground lease for this site is set to expire on March 15, 2026 (next 6 months). Landlord has indicated interest in revising terms upward by ~15%.
//                             </InsightText>
//                             <InsightText>
//                               Opportunity: Strategically located near a major corridor; relocation unlikely.
//                             </InsightText>
//                             <InsightText>
//                               Action: Start negotiations by December 2025.
//                             </InsightText>
//                           </div>
//                         )}
//                       </AccordionContent>
//                     </>
//                   ) : (
//                     <>
//                       <SectionHeader>
//                         <SectionTitle>
//                           <span>{icon}</span> {label}
//                         </SectionTitle>
//                         {k !== 'insights' && (
//                           <BadgeRow>
//                             <Badge title="On track" color="#1db954">✓</Badge>
//                             <Badge title="Risk" color="#ff7a45">!</Badge>
//                             <Badge title="Notes" color="#ff4da6">≡</Badge>
//                           </BadgeRow>
//                         )}
//                       </SectionHeader>
//                       <AccordionContent $open={openKeys[k]} $wide={wide}>
//                     {k === 'ground' && (
//                           <AccordionInner $wide={wide}>
//                             <div>
//                               <DetailGrid>
//                                 <DetailItem>04/01/2016 – <span style={{color:'#ff4d4f', fontWeight:600}}>03/31/2026</span></DetailItem>
//                                 <DetailItem>Monthly Rent<br/><b>$2,345</b></DetailItem>
//                                 <DetailItem>Owner<br/>John Smith</DetailItem>
//                                 <DetailItem>Renewal Option<br/>3x5 Yr</DetailItem>
//                                 <DetailItem>Co-location<br/>AT&T, Verizon</DetailItem>
//                               </DetailGrid>
//                               <Hint>
//                                 <span>✨</span>
//                                 <span>Landowner signaled rent hike request (~15%)</span>
//                               </Hint>
//                             </div>
//                           </AccordionInner>
//                     )}
//                     {k === 'tower' && (
//                           <AccordionInner $wide={wide}>
//                             <div>
//                               <DetailGrid>
//                                 <DetailItem>Start Date<br/>01/01/2018</DetailItem>
//                                 <DetailItem>Status<br/><b>Active</b></DetailItem>
//                                 <DetailItem>Notes<br/>No outstanding items</DetailItem>
//                                 <DetailItem>Revision<br/>None</DetailItem>
//                               </DetailGrid>
//                             </div>
//                           </AccordionInner>
//                     )}
//                     {k === 'utility' && (
//                           <AccordionInner $wide={wide}>
//                             <div>
//                               <DetailGrid>
//                                 <DetailItem>Utility<br/>Power + Fiber</DetailItem>
//                                 <DetailItem>Status<br/><b>Operational</b></DetailItem>
//                               </DetailGrid>
//                             </div>
//                           </AccordionInner>
//                     )}
//                     {k === 'access' && (
//                           <AccordionInner $wide={wide}>
//                             <div>
//                               <DetailGrid>
//                                 <DetailItem>Access Road<br/>Paved, 200m</DetailItem>
//                                 <DetailItem>Condition<br/>Good</DetailItem>
//                               </DetailGrid>
//                             </div>
//                           </AccordionInner>
//                     )}
//                     {k === 'insights' && (
//                           <>
//                             <InsightTitle>
//                             </InsightTitle>
//                             <InsightText>
//                               The ground lease for this site is set to expire on March 15, 2026 (next 6 months). Landlord has indicated interest in revising terms upward by ~15%.
//                             </InsightText>
//                             <InsightText>
//                               Opportunity: Strategically located near a major corridor; relocation unlikely.
//                             </InsightText>
//                             <InsightText>
//                               Action: Start negotiations by December 2025.
//                             </InsightText>
//                           </>
//                     )}
//                       </AccordionContent>
//                     </>
//                   )}
//                 </div>
//               </SectionCard>
//             ))}
//           </AccordionGroup>
//         </LeftCol>
//       </ContentGrid>
//     </PanelWrap>
//   );
// }
