"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import * as pdfjsLib from "pdfjs-dist";
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs";
}

export { pdfjsLib };



const PanelWrap = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  width: ${(p) => (p.$wide ? "900px" : "420px")};
  max-height: calc(100vh - 48px);
  overflow: auto;
  background:
    radial-gradient(1200px 400px at 100% -50%, rgba(255, 77, 166, 0.06), transparent 60%),
    radial-gradient(1000px 600px at -10% 10%, rgba(255, 202, 236, 0.18), transparent 60%),
    #ffffffee;
  border: 2px solid #ff4da6;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(6px);
  transition:
    width 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s,
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
`;

const Header = styled.div`
  padding: 18px 20px 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #fff9fd 100%);
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 22px;
  color: #2b2b2b;
`;

const TitleStrong = styled.span`
  font-weight: 600;
`;

const SubTitle = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: black;
`;

const SubTitleSecondary = styled(SubTitle)`
  margin-top: 6px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 12px;
  right: 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
`;

const IconBtn = styled.button`
  width: 32px;
  height: 32px;
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
  gap: 10px;
  font-size: ${(p) => (p.$small ? '14px' : '16px')};
  flex: 1;
`;
const PreviewShell = styled.div`
  margin: 0 16px 16px 0;
  padding: 14px;
  border: 2px solid #f1d0e3;
  border-left: none;
  border-radius: 0px 20px 20px 20px;
  border-top-right-radius: ${(p) => (p.$noTopRight ? "0px" : "20px")};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: ${(p) => (p.$isLastOpen ? "0px" : "20px")};
  background: #fff;
  display: grid;
  grid-template-columns: 3fr 104px;
  gap: 12px;
  position: relative;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -2px;
    width: 2px;
    height: 97.5%;
    background: #f1d0e3;
  }

  &::after {
    content: "";
    position: absolute;
      border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
    left: -2px;
    top: ${(p) => p.$gapTop || "0px"};
height: calc(${(p) => p.$gapHeight || "0px"} - 2px);
    width: 2px; 
    background: #fff;
    border-top-right-radius: ${(p) => (p.$isLastOpen ? "25px" : "24px")};
    border-bottom-right-radius: ${(p) => (p.$isLastOpen ? "25px" : "24px")};
    transition:
      top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;


const BadgeRow = styled.div`
  display: flex;
  align-items: center;
`;

const Badge = styled.span`
  width: ${(p) => (p.$size === 'sm' ? '40px' : '28px')};
  height: ${(p) => (p.$size === 'sm' ? '40px' : '28px')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  font-size: ${(p) => (p.$size === 'sm' ? '12px' : '14px')};
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

const CanvasWrap = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageCanvas = styled.canvas`
  width: 100%;
  height:auto;
  transition: opacity 220ms ease, transform 220ms ease;
  will-change: opacity, transform;
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonBox = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f3 0%, #e6e6ee 50%, #f0f0f3 100%);
  background-size: 100% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

const ThumbnailGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 68px;
  width: 104px;
  align-items: center;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #faf4f9;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #f1d0e3;
    border-radius: 8px;
    border: 2px solid #faf4f9;
  }
`;

const Thumb = styled.div`
  width: 96px;
  height: 128px;
  border-radius: 6px;
  background: #ffffff;
  border: 2px solid ${(p) => (p.$active ? '#ff4da6' : '#f1d0e3')};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-1px) scale(1.03);
    border-color: #ff4da6;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0) scale(0.99);
  }

  canvas {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SectionCard = styled.button`
  padding: ${(p) => (p.$wide ? "0px" : "16px")};
  margin: ${(p) => (p.$wide ? "2px 20px" : "8px 8px")};
   background: #fff;
  border: ${(p) =>
    p.$active && p.$wide
      ? "2px solid #ffd1e8"
      : p.$wide
        ? "2px solid #f1d0e3"
        : p.$active
          ? "2px solid #ff4da6"
          : "2px solid #f1d0e3"};

  ${(p) =>
    p.$active && p.$wide
      ? "border-right: none;"
      : "2px solid #f1d0e3"};

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: ${(p) =>
    p.$wide ? (p.$active ? "calc(100% - 20px)" : "90%") : "95%"};
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);

    border-radius: 20px;
     border-top-right-radius: ${(p) => (p.$active ? "24px" : "12px")};
  border-bottom-right-radius: ${(p) => (p.$active ? "24px" : "12px")};
       cursor: pointer;
  box-shadow: ${(p) =>
    p.$active
      ? "0 6px 14px rgba(255,77,166,0.12)"
      : "0 2px 6px rgba(0,0,0,0.04)"};

   opacity: 1;

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
    box-shadow: ${(p) => (p.$wide ? "none" : "0 4px 12px rgba(0,0,0,0.08)")};
  }

  &:active {
    transform: translateY(0);
    opacity: 0.9;
  }
`;




const AccordionContent = styled.div`
  max-height: ${(p) => (p.$open ? "500px" : "0")};
  opacity: ${(p) => (p.$open ? "1" : "0")};
  overflow: hidden;
  transition:
     max-height 1s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 0.5s ease,
    transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  margin-top: ${(p) => (p.$open ? "0px" : "0")};
  position: ${(p) => (p.$wide ? "relative" : "static")};
  transform: ${(p) => (p.$open ? "translateY(0)" : "translateY(-10px) scale(0.98)")};
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
  margin: 0 0 16px 16px;
  padding: 0px;
  border-radius: 20px 0px 0px 20px;
  border-top-left-radius: ${(p) => (p.$noTopLeft ? '0px' : '20px')};
  background: #ffffff;
  height: ${(p) => (p.$wide ? "100px" : "auto")};
  min-height: ${(p) => (p.$wide ? "100px" : "auto")};
  max-height: ${(p) => (p.$wide ? "100px" : "none")};
  overflow-y: ${(p) => (p.$wide ? "auto" : "visible")};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${(p) => (p.$wide ? "translateX(0)" : "translateX(0)")};
  opacity: ${(p) => (p.$wide ? "1" : "1")};
`;

const SectionHeaderBar = styled.div`
  margin: ${(p) => (p.$wide ? "0px 0px 0 16px" : "14px 16px 0 16p")};
  padding: ${(p) => (p.$wide ? "8px 0px" : "12px 14px")};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const SECTIONS = [
  { k: "ground", label: "Ground Lease", icon: '/assets/flag.png' },
  { k: "tower", label: "Tower Lease", icon: 'assets/tower.png' },
  { k: "utility", label: "Utility Easement", icon: 'assets/sun.png' },
  { k: "access", label: "Access Easement", icon: 'assets/sketch.png' },
  { k: "insights", label: "Insights", icon: 'assets/star.png' },
];

const PDFThumbnailViewer = ({ pdfUrl, onPageClick, currentPage }) => {
  const [pageNumbers, setPageNumbers] = React.useState([]);
  const canvasRefs = React.useRef([]);

  useEffect(() => {
    let cancelled = false;

    const renderThumbnails = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const nums = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
        if (cancelled) return;
        setPageNumbers(nums);

        requestAnimationFrame(async () => {
          for (let i = 0; i < nums.length; i += 1) {
            if (cancelled) return;
            const pageIndex = nums[i];
            const page = await pdf.getPage(pageIndex);
            const baseViewport = page.getViewport({ scale: 1 });
            const targetWidth = 96;
            const scale = targetWidth / baseViewport.width;
            const viewport = page.getViewport({ scale });

            const canvas = canvasRefs.current[i];
            if (!canvas) continue;
            const ctx = canvas.getContext("2d");
            canvas.width = Math.max(1, Math.floor(viewport.width));
            canvas.height = Math.max(1, Math.floor(viewport.height));

            await page.render({ canvasContext: ctx, viewport }).promise;
          }
        });
      } catch {
        // swallow
      }
    };

    if (pdfUrl) renderThumbnails();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  return (
    <ThumbnailGrid>
      {pageNumbers.map((num, index) => (
        <Thumb
          key={`thumb-${num}`}
          onClick={() => onPageClick(num)}
          title={`Page ${num}`}
          $active={num === currentPage}
          aria-selected={num === currentPage}
        >
          <canvas ref={(el) => (canvasRefs.current[index] = el)} />
        </Thumb>
      ))}
    </ThumbnailGrid>
  );
};

const PDFPageCanvas = ({ pdfUrl, pageNumber }) => {
  const canvasRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    let cancelled = false;
    const renderPage = async () => {
      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber || 1);
        const baseViewport = page.getViewport({ scale: 1 });
        const targetHeight = 350;
        const scale = targetHeight / baseViewport.height;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        const ctx = canvas.getContext("2d");
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));
        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    };
    renderPage();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl, pageNumber]);

  return (
    <CanvasWrap>
      {loading ? (
        <SkeletonBox />
      ) : null}
      <PageCanvas
        ref={canvasRef}
        style={{ opacity: loading ? 0 : 1, transform: loading ? "translateY(6px)" : "translateY(0)" }}
      />
    </CanvasWrap>
  );
};

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
  <div style={{ padding: "12px 14px" }}>
    <div style={{ fontWeight: 700, color: "#2b2b2b", marginBottom: "10px" }}>
      Insights
    </div>
    <p
      style={{
        margin: "10px 0",
        color: "#4a4a4a",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
      The ground lease for this site is set to expire on March 15, 2026 (next 6
      months). Landlord has indicated interest in revising terms upward by ~15%.
    </p>
    <p
      style={{
        margin: "10px 0",
        color: "#4a4a4a",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
      Opportunity: Strategically located near a major corridor; relocation
      unlikely.
    </p>
    {/* <p
      style={{
        margin: "10px 0",
        color: "#4a4a4a",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
      Action: Start negotiations by December 2025.
    </p> */}
  </div>
);

const SectionCardComponent = React.forwardRef((props, ref) => {
  const { section, activeKey, isActive, isOpen, isWide, onToggle, style = {} } = props;
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
      aria-expanded={isOpen}
      $active={isOpen}
      $wide={isWide}
      data-section={k}
      style={style}
      ref={ref}
    >
      <div style={{ width: "100%" }}>
        {isWide ? (
          <>
            <SectionHeaderBar>
              <SectionHeader>
                <SectionTitle>
                  {icon && <img src={icon} alt={label} style={{ width: 18, height: 18 }} />}
                  <span style={{ marginLeft: 6 }}>{label}</span>
                </SectionTitle>

                {k !== "insights" && (
                  <BadgeRow>
                    <Badge title="On track" color="#1db954">
                      <img src="/assets/green.png" alt="On track" style={{ width: '12px', height: '12px' }} />
                    </Badge>
                    <Badge title="Risk" color="#ff7a45">
                      <img src="/assets/red.png" alt="Risk" style={{ width: '12px', height: '12px' }} />
                    </Badge>
                    <Badge title="Notes" color="#ff4da6">
                      <img src="/assets/save.png" alt="Notes" style={{ width: '12px', height: '12px' }} />
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
                {icon && <img src={icon} alt={label} style={{ width: 18, height: 18 }} />}
                <span style={{ marginLeft: 6 }}>{label}</span>
              </SectionTitle>
              {k !== "insights" && (
                <BadgeRow>
                  <Badge title="On track" color="#1db954">
                    <img src="/assets/green.png" alt="On track" style={{ width: '12px', height: '12px' }} />
                  </Badge>
                  <Badge title="Risk" color="#ff7a45">
                    <img src="/assets/red.png" alt="Risk" style={{ width: '12px', height: '12px' }} />
                  </Badge>
                  <Badge title="Notes" color="#ff4da6">
                    <img src="/assets/save.png" alt="Notes" style={{ width: '12px', height: '12px' }} />
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
  const [wide, setWide] = React.useState(false);
  const activeSectionRef = useRef(null);

  const [openKeys, setOpenKeys] = React.useState({
    ground: true,
    tower: false,
    utility: false,
    access: false,
    insights: false,
  });
  const [activeKey, setActiveKey] = React.useState("ground");
  const sectionRefs = React.useRef({});

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
  const [gapStyle, setGapStyle] = React.useState({ top: 0, height: 0 });

  React.useEffect(() => {
    if (!wide) return;

    const updateGap = () => {
      const sectionEl = sectionRefs.current[activeKey];
      const previewEl = document.querySelector('[data-preview-shell]');
      if (!sectionEl || !previewEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const previewRect = previewEl.getBoundingClientRect();
      const style = window.getComputedStyle(sectionEl);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const borderTop = parseFloat(style.borderTopWidth);
      const borderBottom = parseFloat(style.borderBottomWidth);

      setGapStyle({
        top: sectionRect.top - previewRect.top + borderTop + paddingTop,
        height: sectionRect.height - paddingTop - paddingBottom - borderTop - borderBottom,
      });

    };

    updateGap();

    const resizeObserver = new ResizeObserver(updateGap);
    if (sectionRefs.current[activeKey]) resizeObserver.observe(sectionRefs.current[activeKey]);

    const panelWrap = document.querySelector('[data-panel-wrap]');
    if (panelWrap) panelWrap.addEventListener('scroll', updateGap);

    return () => {
      resizeObserver.disconnect();
      if (panelWrap) panelWrap.removeEventListener('scroll', updateGap);
    };
  }, [activeKey, wide]);


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
                    alt="Favorite"
                    style={{ width: '25px', height: '25px' }}
                  />
                </IconBtn>
                <IconBtn aria-label="favorite">
                  <img
                    src="/assets/starshape.png" alt="Expand"
                    style={{ width: '20px', height: '20px' }}

                  />
                </IconBtn>
              </>
            )}
          </HeaderRow>
          <SubTitle>Seattle \\ West \\ Northwest</SubTitle>
          <SubTitleSecondary>
            Tower Type: Macro Tower (150 ft)
          </SubTitleSecondary>
        </div>
        <HeaderRight>
          {wide ? (
            <IconBtn aria-label="close" onClick={onClose} title="Close">
              <img
                src="/assets/cross.png" alt="Cross"
                style={{ width: '25px', height: '25px' }}
              />
            </IconBtn>
          ) : (
            <>


              <IconBtn
                aria-label="expand"
                onClick={() => setWide((w) => !w)}
                title="Toggle wide view"
              >
                <img
                  src="/assets/wide.png"
                  alt="Favorite"
                  style={{ width: '25px', height: '25px' }}
                />
              </IconBtn>  <IconBtn aria-label="favorite">
                <img
                  src="/assets/starshape.png" alt="Expand"
                  style={{ width: '20px', height: '20px' }}
                />
              </IconBtn>

            </>
          )}
        </HeaderRight>
      </Header>
      <div>
        {wide ? (
          <AccordionInner $wide>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {sortedSections.map((section, idx) => (
                <SectionCardComponent
                  key={section.k}
                  ref={(el) => (sectionRefs.current[section.k] = el)}
                  section={section}
                  activeKey={activeKey}
                  isActive={activeKey === section.k}
                  isOpen={openKeys[section.k]}
                  isWide={wide}
                  onToggle={toggle}
                  style={{
                    borderTopLeftRadius: idx === 0 ? "12px" : "12px",
                    borderBottomLeftRadius: idx === sortedSections.length - 1 ? "12px" : "12px",

                    borderTopRightRadius: activeKey === section.k ? "0px" : "12px",
                    borderBottomRightRadius: activeKey === section.k ? "0px" : "12px",
                  }}
                />
              ))}


            </div>
            <PreviewShell
              data-preview-shell
              $wide
              $gapTop={`${gapStyle.top}px`}
              $gapHeight={`${gapStyle.height}px`}
              $isLastOpen={activeKey === SECTIONS[SECTIONS.length - 1].k} >
              <PDFPageCanvas pdfUrl="/dummy.pdf" pageNumber={1} />
              <PDFThumbnailViewer pdfUrl="/dummy.pdf" onPageClick={() => { }} currentPage={1} />
            </PreviewShell>


          </AccordionInner>
        ) : (
          sortedSections.map((section) => (
            <SectionCardComponent
              activeKey={activeKey}
              key={section.k}
              section={section}
              isActive={activeKey === section.k}
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
