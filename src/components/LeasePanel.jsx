"use client";
import dummyPdf from "../dummy.pdf";
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf";
import styled, { keyframes } from "styled-components";
import { viewSizeCalculator, viewHeightCalculator } from "../utils/dropdown";
import { PDFPageCanvas, PDFThumbnailViewer } from "./Pdf";

if (typeof window !== "undefined" && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).toString();
}
const Container = styled.div`
  padding: 0px 14px;
`;

const Title = styled.div`
  font-weight: 700;
  color: #2b2b2b;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin: 0px 0px;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 1.5;
`;
const PanelWrap = styled.div`
  padding: ${() => viewSizeCalculator(10, true)};
  position: absolute;
  top: ${() => viewHeightCalculator(24, true)};
  right: ${() => viewSizeCalculator(24, true)};
  width: ${(p) =>
    p.$wide ? viewSizeCalculator(900, true) : viewSizeCalculator(420, true)};
  max-width: ${(p) => (p.$wide ? "970px" : "408px")};
  max-height: calc(100vh - ${() => viewHeightCalculator(48, true)});
  overflow: auto;
  background: radial-gradient(
      1200px 400px at 100% -50%,
      rgba(255, 77, 166, 0.06),
      transparent 60%
    ),
    radial-gradient(
      1000px 600px at -10% 10%,
      rgba(255, 202, 236, 0.18),
      transparent 60%
    ),
    #ffffffee;
  border: 2px solid #ff4da6;
  border-radius: ${() => viewSizeCalculator(12, true)};
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(6px);
  transition: width 2s cubic-bezier(0.22, 1, 0.36, 1),
    max-width 2s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
`;

const Header = styled.div`
  padding: ${() => viewHeightCalculator(6, true)}
    ${() => viewSizeCalculator(4, true)}
    ${() => viewHeightCalculator(4, true)}
    ${() => viewSizeCalculator(4, true)};
  flex-direction: row;
  display: flex;
  align-items: start;
  justify-content: center;
  position: relative;
`;


const TitleStrong = styled.span`
  font-weight: 600;
`;

const SubTitle = styled.div`
  margin-top: ${() => viewHeightCalculator(4, true)};
  font-size: clamp(10px, ${() => viewSizeCalculator(12, true)}, 12px);
  color: black;
  position: relative;
`;

const SubTitleSecondary = styled(SubTitle)`
  margin-top: ${() => viewHeightCalculator(6, true)};
  margin-bottom: ${() => viewHeightCalculator(6, true)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;

  ${(p) =>
    p.$wide
      ? `
    left:135%;
    transform: translateX(-155%);
    justify-content: flex-end;
    margin-bottom: ${viewSizeCalculator(20, true)};
  `
      : `
    left: 145%;
    transform: translateX(-155%);
    justify-content: center;
  `}
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(6px, ${() => viewSizeCalculator(10, true)}, 10px);
  position: absolute;
  top: ${() => viewHeightCalculator(4, true)};
  right: ${() => viewSizeCalculator(6, true)};
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: clamp(6px, ${() => viewSizeCalculator(10, true)}, 10px);
`;

const IconBtn = styled.button`
  width: clamp(24px, ${() => viewSizeCalculator(32, true)}, 32px);
  height: clamp(24px, ${() => viewSizeCalculator(32, true)}, 32px);
  background: #fff;
  color: #ff4da6;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  outline: none;
  border: none;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
    opacity: 0.9;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SectionTitle = styled.div`
  font-weight: 700;
  color: #2b2b2b;
  display: flex;
  align-items: center;
  gap: clamp(6px, ${() => viewSizeCalculator(10, true)}, 10px);
  font-size: ${(p) =>
    p.$small
      ? `clamp(12px, ${viewSizeCalculator(14, true)}, 14px)`
      : `clamp(14px, ${viewSizeCalculator(16, true)}, 16px)`};
  flex: 1;
`;

const PreviewShell = styled.div`
  padding: clamp(16px, ${() => viewSizeCalculator(20, true)}, 14px);
  border: 2px solid #f1d0e3;
  border-left: 2px solid #f1d0e3;
  border-radius: 0
    clamp(14px, ${() => viewSizeCalculator(20, true)}, 20px)
    clamp(14px, ${() => viewSizeCalculator(20, true)}, 20px)
    clamp(14px, ${() => viewSizeCalculator(20, true)}, 20px);
    
  border-top-left-radius: ${(p) =>
    p.$isFirstActive ? "0" : `clamp(14px, ${viewSizeCalculator(20, true)}, 20px)`};

   border-bottom-left-radius: ${(p) =>
    p.$isActive ? "0" : `clamp(14px, ${viewSizeCalculator(20, true)}, 20px)`};

  background: #fff;
  display: grid;
  grid-template-columns: 3fr clamp(72px, ${() => viewSizeCalculator(104, true)}, 104px);
  gap: clamp(8px, ${() => viewSizeCalculator(12, true)}, 12px);
  position: relative;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  .curve {
    position: absolute;
    left: -1px;
    bottom: ${(p) => (p.$isLastOpen ? "-1px" : "-2px")};
    width: clamp(16px, ${() => viewSizeCalculator(24, true)}, 24px);
    height: clamp(16px, ${() => viewHeightCalculator(24, true)}, 24px);
    pointer-events: none;
    z-index: 2;
  }
`;



const BadgeRow = styled.div`
  display: flex;
  align-items: center;
`;

const Badge = styled.span`
  width: ${(p) =>
    p.$size === "sm"
      ? `clamp(32px, ${viewSizeCalculator(40, true)}, 40px)`
      : `clamp(24px, ${viewSizeCalculator(28, true)}, 28px)`};
  height: ${(p) =>
    p.$size === "sm"
      ? `clamp(32px, ${viewSizeCalculator(40, true)}, 40px)`
      : `clamp(24px, ${viewSizeCalculator(28, true)}, 28px)`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  font-size: ${(p) =>
    p.$size === "sm"
      ? `clamp(10px, ${viewSizeCalculator(12, true)}, 12px)`
      : `clamp(12px, ${viewSizeCalculator(14, true)}, 14px)`};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(6px, ${() => viewSizeCalculator(10, true)}, 10px)
    clamp(8px, ${() => viewSizeCalculator(16, true)}, 16px);
  margin-top: clamp(8px, ${() => viewHeightCalculator(12, true)}, 12px);
`;

const DetailItem = styled.div`
  border-left: 3px solid #e9e9ef;
  padding-left: clamp(6px, ${() => viewSizeCalculator(10, true)}, 10px);
  font-size: clamp(11px, ${() => viewSizeCalculator(13, true)}, 13px);
  color: #3b3b3b;
`;

const Hint = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(6px, ${() => viewSizeCalculator(8, true)}, 8px);
  margin-top: clamp(6px, ${() => viewHeightCalculator(10, true)}, 10px);
  color: #6a6a6a;
  font-size: clamp(10px, ${() => viewSizeCalculator(12, true)}, 12px);
`;









const SectionCard = styled.button`

  ${(p) =>
    p.$active && p.$wide && p.$isFirst
      ? `
    &::before {
      content: '';
      position: absolute;
      top: -1px;
      right: -6px;
      width: clamp(12px, ${viewSizeCalculator(24, true)}, 24px);
      height: 1px;
      background: #ffd1e8;
      z-index: 3;
    }
    border-top: 2px solid #ffd1e8;
    margin-top: 0;
  `
      : ""}
    ${(p) =>
    p.$active && p.$wide && p.$isLast
      ? `
    &::before {
      content: '';
      position: absolute;
      bottom: -1px;
      right: -6px;
      width: clamp(12px, ${viewSizeCalculator(24, true)}, 24px);
      height: 1px;
      background: #ffd1e8;
      z-index: 3;
    }
    border-bottom: 2px solid #ffd1e8;
    margin-bottom: 0;
  `
      : ""}

  padding: ${(p) => (p.$wide ? "0px" : "16px")};
  margin: ${(p) => (p.$wide ? "0px 0 0px 16px" : "8px 8px")};
  position: relative;
  background: #fff;

  border: ${(p) =>
    p.$active && p.$wide ? "2px solid #ffd1e8" : "2px solid #f1d0e3"};

  z-index: ${(p) => (p.$active && p.$wide ? "2" : "1")};
  right: ${(p) => (p.$active && p.$wide ? "-3px" : "0")};

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: ${(p) =>
    p.$wide ? (p.$active ? "calc(100% - 16px)" : "calc(95% - 8px)") : "95%"};

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Border-right only in wide mode */
  border-right: ${(p) =>
    p.$wide && p.$active ? "4px solid #ffffff" : "2px solid #f1d0e3"};

  border-radius: 20px;

  /* Keep right corners curved in non-wide active mode */
  border-top-right-radius: ${(p) =>
    !p.$wide && p.$active ? "20px" : p.$wide && p.$active ? "0px" : "20px"};

  border-bottom-right-radius: ${(p) =>
    !p.$wide && p.$active ? "20px" : p.$wide && p.$active ? "0px" : "20px"};

  cursor: pointer;
  opacity: 1;

  &:active {
    transform: translateY(0);
    opacity: 0.9;
  }
`;

const AccordionContent = styled.div`
  max-height: ${(p) =>
    p.$open ? `clamp(300px, ${viewHeightCalculator(500, true)}, 500px)` : "0"};
  opacity: ${(p) => (p.$open ? "1" : "0")};
  overflow: hidden;
  transition: max-height 1s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.5s ease,
    transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  margin-top: ${(p) => (p.$open ? "0" : "0")};
  position: ${(p) => (p.$wide ? "relative" : "static")};
  transform: ${(p) =>
    p.$open ? "translateY(0)" : `translateY(-${viewHeightCalculator(10, true)}) scale(0.98)`};
`;

const AccordionInner = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.$wide ? "1.5fr 1.5fr" : "1fr")};
  gap: 0;
  align-items: stretch;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DetailsShell = styled.div`
  margin: 0 0 clamp(10px, ${() => viewSizeCalculator(16, true)}, 16px)
    clamp(10px, ${() => viewSizeCalculator(16, true)}, 16px);
  padding: 0;
  border-radius: clamp(14px, ${() => viewSizeCalculator(20, true)}, 20px) 0 0
    clamp(14px, ${() => viewSizeCalculator(20, true)}, 20px);
  border-top-left-radius: ${(p) =>
    p.$noTopLeft ? "0" : `clamp(14px, ${viewSizeCalculator(20, true)}, 20px)`};
  background: #ffffff;
  height: ${(p) =>
    p.$wide ? `clamp(80px, ${viewHeightCalculator(100, true)}, 100px)` : "auto"};
  min-height: ${(p) =>
    p.$wide ? `clamp(80px, ${viewHeightCalculator(100, true)}, 100px)` : "auto"};
  max-height: ${(p) =>
    p.$wide ? `clamp(80px, ${viewHeightCalculator(100, true)}, 100px)` : "none"};
  overflow-y: ${(p) => (p.$wide ? "auto" : "visible")};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(0);
  opacity: 1;
`;

const SectionHeaderBar = styled.div`
  margin: ${(p) =>
    p.$wide
      ? `0 0 0 clamp(10px, ${viewSizeCalculator(16, true)}, 16px)`
      : `clamp(10px, ${viewHeightCalculator(14, true)}, 14px) 
         clamp(10px, ${viewSizeCalculator(16, true)}, 16px) 
         0 
         clamp(10px, ${viewSizeCalculator(16, true)}, 16px)`};
  padding: ${(p) =>
    p.$wide
      ? `clamp(6px, ${viewHeightCalculator(8, true)}, 8px) 0`
      : `clamp(8px, ${viewHeightCalculator(12, true)}, 12px) 
         clamp(10px, ${viewSizeCalculator(14, true)}, 14px)`};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const SECTIONS = [
  { k: "ground", label: "Ground Lease", icon: "/assets/flag.png" },
  { k: "tower", label: "Tower Lease", icon: "/assets/tower.png" },
  { k: "utility", label: "Utility Easement", icon: "/assets/sun.png" },
  { k: "access", label: "Access Easement", icon: "/assets/sketch.png" },
  { k: "insights", label: "Insights", icon: "/assets/star.png" },
];

const GroundContent = ({ isWide }) => {
  return (
    <AccordionInner $wide={isWide}>
      <DetailsShell $wide={isWide} $noTopLeft>
        <DetailGrid>
          <DetailItem>
            04/01/2016 –{" "}
            <span style={{ color: "#ff4d4f", fontWeight: 600 }}>03/31/2026</span>
          </DetailItem>
          <DetailItem>
            Monthly Rent
            <br />
            <b>$2,345</b>
          </DetailItem>
          <DetailItem>
            Owner
            <br />
            John Smith
          </DetailItem>
          <DetailItem>
            Renewal Option
            <br />
            3x5 Yr
          </DetailItem>
          <DetailItem>
            Co-location
            <br />
            AT&T, Verizon
          </DetailItem>
        </DetailGrid>
        <Hint>
          <span>✨</span>
          <span>Landowner signaled rent hike request (~15%)</span>
        </Hint>
      </DetailsShell>
    </AccordionInner>
  );
};

const TowerContent = ({ isWide }) => {
  return (
    <AccordionInner $wide={isWide}>
      <DetailsShell $wide={isWide} $noTopLeft>
        <DetailGrid>
          <DetailItem>
            Start Date
            <br />
            01/01/2018
          </DetailItem>
          <DetailItem>
            Status
            <br />
            <b>Active</b>
          </DetailItem>
          <DetailItem>
            Notes
            <br />
            No outstanding items
          </DetailItem>
          <DetailItem>
            Revision
            <br />
            None
          </DetailItem>
        </DetailGrid>
      </DetailsShell>
    </AccordionInner>
  );
};

const UtilityContent = ({ isWide }) => {
  return (
    <AccordionInner $wide={isWide}>
      <DetailsShell $wide={isWide} style={{ borderTopLeftRadius: 0 }}>
        <DetailGrid>
          <DetailItem>
            Utility
            <br />
            Power + Fiber
          </DetailItem>
          <DetailItem>
            Status
            <br />
            <b>Operational</b>
          </DetailItem>
        </DetailGrid>
      </DetailsShell>
    </AccordionInner>
  );
};

const AccessContent = ({ isWide }) => {
  return (
    <AccordionInner $wide={isWide}>
      <DetailsShell $wide={isWide} style={{ borderTopLeftRadius: 0 }}>
        <DetailGrid>
          <DetailItem>
            Access Road
            <br />
            Paved, 200m
          </DetailItem>
          <DetailItem>
            Condition
            <br />
            Good
          </DetailItem>
        </DetailGrid>
      </DetailsShell>
    </AccordionInner>
  );
};

const InsightsContent = () => (
  <Container>
    <Paragraph>
      The ground lease for this site is set to expire on March 15, 2026 (next 6
      months). Landlord has indicated interest in revising terms upward by ~15%.
    </Paragraph>
    <Paragraph>
      Opportunity: Strategically located near a major corridor; relocation
      unlikely.
    </Paragraph>
  </Container>
);
const SectionCardComponent = React.forwardRef((props, ref) => {
  const { section, isOpen, isWide, onToggle, isFirst, isLast } = props;
  const { k, label, icon } = section;

  const renderContent = () => {
    switch (k) {
      case "ground":
        return <GroundContent isWide={isWide} />;
      case "tower":
        return <TowerContent isWide={isWide} />;
      case "utility":
        return <UtilityContent isWide={isWide} />;
      case "access":
        return <AccessContent isWide={isWide} />;
      case "insights":
        return <InsightsContent />;
      default:
        return null;
    }
  };

  return (
    <SectionCard
      onClick={() => onToggle(k)}
      aria-expanded={!!isOpen}
      $active={!!isOpen}
      $wide={!!isWide}
      $isFirst={!!isFirst}
      $isLast={!!isLast}
      data-section={k}
      style={{}}
      ref={ref}
    >
      <div style={{ width: "100%" }}>
        {isWide ? (
          <>
            <SectionHeaderBar $wide>
              <SectionHeader>
                <SectionTitle>
                  {icon && (
                    <img src={icon} alt={label} style={{ width: 18, height: 18 }} />
                  )}
                  <span style={{ marginLeft: 6 }}>{label}</span>
                </SectionTitle>

                {(
                  <BadgeRow>
                    <Badge title="On track" $size="sm">
                      <img
                        src="/assets/green.png"
                        alt="On track"
                        style={{ width: 12, height: 12 }}
                      />
                    </Badge>
                    <Badge title="Risk" $size="sm">
                      <img
                        src="/assets/red.png"
                        alt="Risk"
                        style={{ width: 12, height: 12 }}
                      />
                    </Badge>
                    <Badge title="Notes" $size="sm">
                      <img
                        src="/assets/save.png"
                        alt="Notes"
                        style={{ width: 12, height: 12 }}
                      />
                    </Badge>
                  </BadgeRow>
                )}
              </SectionHeader>
            </SectionHeaderBar>
            <AccordionContent $open={isOpen} $wide={isWide}>
              {renderContent()}
            </AccordionContent>
          </>
        ) : (
          <>
            <SectionHeader>
              <SectionTitle>
                {icon && (
                  <img src={icon} alt={label} style={{ width: 18, height: 18 }} />
                )}
                <span style={{ marginLeft: 6 }}>{label}</span>
              </SectionTitle>
              {(
                <BadgeRow>
                  <Badge title="On track" $size="sm">
                    <img
                      src="/assets/green.png"
                      alt="On track"
                      style={{ width: 12, height: 12 }}
                    />
                  </Badge>
                  <Badge title="Risk" $size="sm">
                    <img src="/assets/red.png" alt="Risk" style={{ width: 12, height: 12 }} />
                  </Badge>
                  <Badge title="Notes" $size="sm">
                    <img
                      src="/assets/save.png"
                      alt="Notes"
                      style={{ width: 12, height: 12 }}
                    />
                  </Badge>
                </BadgeRow>
              )}
            </SectionHeader>
            <AccordionContent $open={isOpen} $wide={isWide}>
              {renderContent()}
            </AccordionContent>
          </>
        )}
      </div>
    </SectionCard>
  );
});

export default function App({ onClose = () => { } }) {
  const [wide, setWide] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [openKeys, setOpenKeys] = useState({
    ground: true,
    tower: false,
    utility: false,
    access: false,
    insights: false,
  });
  const [activeKey, setActiveKey] = useState("ground");
  const sectionRefs = useRef({});

  const toggle = (key) => {
    setActiveKey(key);
    setOpenKeys({
      ground: false,
      tower: false,
      utility: false,
      access: false,
      insights: false,
      [key]: true,
    });
  };


  const sortedSections = SECTIONS;

  return (
    <PanelWrap $wide={wide} onClick={(e) => e.stopPropagation()} data-panel-wrap>
      <Header>
        <div>
          <HeaderRow>
            <Title>
              Site: <TitleStrong>ABCD1234</TitleStrong>
            </Title>
            {!wide ? null : (
              <>
                <IconBtn
                  aria-label="expand"
                  onClick={() => setWide((w) => !w)}
                  title="Toggle wide view"
                >
                  <img
                    src="/assets/wide.png"
                    alt="Toggle wide"
                    style={{ width: "25px", height: "25px" }}
                  />
                </IconBtn>
                <IconBtn aria-label="favorite">
                  <img
                    src="/assets/starshape.png"
                    alt="Favorite"
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconBtn>
              </>
            )}
          </HeaderRow>
          <SubTitle>Seattle \\ West \\ Northwest</SubTitle>
          <SubTitleSecondary $wide={wide}>Tower Type: Macro Tower (150 ft)</SubTitleSecondary>
        </div>
        <HeaderRight>
          {wide ? (
            <IconBtn aria-label="close" onClick={onClose} title="Close">
              <img src="/assets/cross.png" alt="Close" style={{ width: "25px", height: "25px" }} />
            </IconBtn>
          ) : (
            <>
              <IconBtn
                aria-label="expand"
                onClick={() => setWide((w) => !w)}
                title="Toggle wide view"
              >
                <img src="/assets/wide.png" alt="Toggle wide" style={{ width: "25px", height: "25px" }} />
              </IconBtn>
              <IconBtn aria-label="favorite">
                <img src="/assets/starshape.png" alt="Favorite" style={{ width: "20px", height: "20px" }} />
              </IconBtn>
            </>
          )}
        </HeaderRight>
      </Header>

      <div>
        {wide ? (
          <AccordionInner $wide>
            <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "clamp(6px, 1vw, 10px)" }}>
              {sortedSections.map((section, idx) => (
                <SectionCardComponent
                  key={section.k}
                  ref={(el) => (sectionRefs.current[section.k] = el)}
                  section={section}
                  isOpen={openKeys[section.k]}
                  isWide={wide}
                  onToggle={toggle}
                  isFirst={idx === 0}
                  isLast={idx === SECTIONS.length - 1}
                  style={{
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: idx === sortedSections.length - 1 ? "12px" : "12px",
                    borderTopRightRadius: activeKey === section.k ? "0px" : "12px",
                    borderBottomRightRadius: activeKey === section.k ? "0px" : "12px",
                  }}
                />
              ))}
            </div>

            <PreviewShell
              $isActive={activeKey === SECTIONS[SECTIONS.length - 1].k}
              $wide
              $isLastOpen={activeKey === SECTIONS[SECTIONS.length - 1].k}
              $isFirstActive={activeKey === SECTIONS[0].k}
            >
              <div className="curve" />
              <PDFPageCanvas pdfUrl={dummyPdf} pageNumber={selectedPage} />
              <PDFThumbnailViewer
                pdfUrl={dummyPdf}
                onPageClick={setSelectedPage}
                currentPage={selectedPage}
              />

            </PreviewShell>
          </AccordionInner>
        ) : (
          sortedSections.map((section) => (
            <SectionCardComponent
              key={section.k}
              section={section}
              isOpen={openKeys[section.k]}
              isWide={wide}
              onToggle={toggle}
            />
          ))
        )}
      </div>
    </PanelWrap>
  );
}
