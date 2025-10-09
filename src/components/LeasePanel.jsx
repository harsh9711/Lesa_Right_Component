"use client";

import React, { useEffect } from "react";
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
  transition: width 220ms ease;
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
  border-radius: 10px;
  border: 2px solid #ffd1e8;
  background: #fff;
  color: #ff4da6;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  outline: none;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.95);
    opacity: 0.9;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(255, 77, 166, 0.25), 0 6px 15px rgba(0, 0, 0, 0.1);
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

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Badge = styled.span`
  width: ${(p) => (p.$size === 'sm' ? '20px' : '28px')};
  height: ${(p) => (p.$size === 'sm' ? '20px' : '28px')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid ${(p) => p.color || "#ccc"};
  color: ${(p) => p.color || "#555"};
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

const PreviewShell = styled.div`
  margin: 0 16px 16px 0;
  padding: 14px;
  border: 2px solid #f1d0e3;
  border-top: none;
  border-radius: 0px 20px 20px 20px;
  border-top-right-radius: ${(p) => (p.$noTopRight ? '0px' : '20px')};
  background: linear-gradient(180deg, #ffffff 0%, #fff9fd 100%);
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
    height: 128px;
    background: #ffffff; 
  }
`;


const CanvasWrap = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 8px;
  background: linear-gradient(180deg, #fafafa 0%, #f3f3f8 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  transition: opacity 220ms ease, transform 220ms ease;
  will-change: opacity, transform;
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f3 0%, #e6e6ee 50%, #f0f0f3 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

const ThumbnailGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
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
  margin: 8px 16px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  border: ${(p) => (p.$active && !p.$wide ? "2px solid #ff4da6" : (p.$wide ? "none" : "2px solid #ececf2"))};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: calc(100% - 24px);
  cursor: pointer;
    box-shadow: ${p => (p.$active ? '0 6px 14px rgba(255,77,166,0.12)' : '0 2px 6px rgba(0,0,0,0.04)')};

  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: ${(p) => (p.$open ? "0px" : "0")};
  position: ${(p) => (p.$wide ? "relative" : "static")};
  transform: ${(p) => (p.$open ? "translateY(0)" : "translateY(-5px)")};
`;

const AccordionInner = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.$wide ? "1fr 2fr" : "1fr")};
  gap: 0px;
  align-items: start;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DetailsShell = styled.div`
  margin: 0 0 16px 16px;
  padding: 14px;
  
 border: 2px solid #f1d0e3;
  border-right: none;
  border-top: none;
  border-bottom: ${(p) => (p.$wide ? "2px solid #f1d0e3" : "none")};
    border-left: ${(p) => (p.$wide ? "2px solid #f1d0e3" : "none")};
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

const RestSectionsWrap = styled.div`
  position: absolute;
  left: 36px;
  top: 340px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: calc(30% - 4px);
`;

// const CompactSectionCard = styled(SectionCard)`
//   display: flex;
//   margin: 0;
//   padding: 12px 16px;
// `;

const SectionHeaderBar = styled.div`
  margin: 14px 16px 0 16px;
  padding: 12px 14px;
  border-top: 2px solid #f1d0e3;
  border-left: 2px solid #f1d0e3;
  border-right: 2px solid #f1d0e3;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const SECTIONS = [
  { k: "ground", label: "Ground Lease", icon: "🏳️" },
  { k: "tower", label: "Tower Lease", icon: "🗼" },
  { k: "utility", label: "Utility Easement", icon: "🧬" },
  { k: "access", label: "Access Easement", icon: "🔗" },
  { k: "insights", label: "Insights", icon: "✴️" },
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

        // Defer to next tick to ensure canvases are mounted
        requestAnimationFrame(async () => {
          for (let i = 0; i < nums.length; i += 1) {
            if (cancelled) return;
            const pageIndex = nums[i];
            const page = await pdf.getPage(pageIndex);
            const baseViewport = page.getViewport({ scale: 1 });
            const targetWidth = 96; // match Thumb width
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
        // swallow; can enhance with error UI later
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const pdfUrl = "/dummy.pdf";

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
      {isWide && (
        <PreviewShell $wide={isWide} $noTopRight>
          <PDFPageCanvas pdfUrl={pdfUrl} pageNumber={currentPage} />
          <PDFThumbnailViewer
            pdfUrl={pdfUrl}
            onPageClick={setCurrentPage}
            currentPage={currentPage}
          />
        </PreviewShell>
      )}
    </AccordionInner>
  );
};

const TowerContent = ({ isWide }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pdfUrl = "/dummy.pdf";

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
      {isWide && (
        <PreviewShell $wide={isWide} $noTopRight>
          <PDFPageCanvas pdfUrl={pdfUrl} pageNumber={currentPage} />
          <PDFThumbnailViewer
            pdfUrl={pdfUrl}
            onPageClick={setCurrentPage}
            currentPage={currentPage}
          />
        </PreviewShell>
      )}
    </AccordionInner>
  );
};

const UtilityContent = ({ isWide }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pdfUrl = "/dummy.pdf";

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
      {isWide && (
        <PreviewShell $wide={isWide} style={{ borderTopRightRadius: 0 }}>
          <PDFPageCanvas pdfUrl={pdfUrl} pageNumber={currentPage} />
          <PDFThumbnailViewer
            pdfUrl={pdfUrl}
            onPageClick={setCurrentPage}
          />
        </PreviewShell>
      )}
    </AccordionInner>
  );
};

const AccessContent = ({ isWide }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pdfUrl = "/dummy.pdf";

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
      {isWide && (
        <PreviewShell $wide={isWide} style={{ borderTopRightRadius: 0 }}>
          <PDFPageCanvas pdfUrl={pdfUrl} pageNumber={currentPage} />
          <PDFThumbnailViewer
            pdfUrl={pdfUrl}
            onPageClick={setCurrentPage}
          />
        </PreviewShell>
      )}
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
    <p
      style={{
        margin: "10px 0",
        color: "#4a4a4a",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
      Action: Start negotiations by December 2025.
    </p>
  </div>
);

const SectionCardComponent = ({
  section,
  isActive,
  isOpen,
  isWide,
  onToggle,
  style = {},
}) => {
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
      style={style}
    >
      <div style={{ width: "100%" }}>
        {isWide ? (
          <>
            <SectionHeaderBar>
              <SectionHeader>
                <SectionTitle>
                  <span>{icon}</span> {label}
                </SectionTitle>
                {k !== "insights" && (
                  <BadgeRow>
                    <Badge title="On track" color="#1db954">
                      ✓
                    </Badge>
                    <Badge title="Risk" color="#ff7a45">
                      !
                    </Badge>
                    <Badge title="Notes" color="#ff4da6">
                      ≡
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
              <SectionTitle $small>
                <span>{icon}</span> {label}
              </SectionTitle>
              {k !== "insights" && (
                <BadgeRow>
                  <Badge title="On track" color="#1db954" $size="sm">
                    ✓
                  </Badge>
                  <Badge title="Risk" color="#ff7a45" $size="sm">
                    !
                  </Badge>
                  <Badge title="Notes" color="#ff4da6" $size="sm">
                    ≡
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
};

export default function App({ onClose = () => {} }) {
  const [wide, setWide] = React.useState(false);
  const [openKeys, setOpenKeys] = React.useState({
    ground: true,
    tower: false,
    utility: false,
    access: false,
    insights: false,
  });
  const [activeKey, setActiveKey] = React.useState("ground");

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

  const sortedSections = React.useMemo(() => {
    const active = SECTIONS.find((s) => s.k === activeKey);
    const rest = SECTIONS.filter((s) => s.k !== activeKey);
    return active ? [active, ...rest] : SECTIONS;
  }, [activeKey]);

  return (
    <PanelWrap $wide={wide} onClick={(e) => e.stopPropagation()}>
      <Header>
        <div>
          <HeaderRow>
            <Title>
              Site: <TitleStrong>ABCD1234</TitleStrong>
            </Title>
            {!wide ? null : (
              <>
                <IconBtn aria-label="favorite">☆</IconBtn>
                <IconBtn
                  aria-label="expand"
                  onClick={() => setWide((w) => !w)}
                  title="Toggle wide view"
                >
                  ➕
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
              ✖
            </IconBtn>
          ) : (
            <>
          <IconBtn aria-label="favorite">☆</IconBtn>
              <IconBtn
                aria-label="expand"
                onClick={() => setWide((w) => !w)}
                title="Toggle wide view"
              >
                ➕
              </IconBtn>
            </>
          )}
        </HeaderRight>
      </Header>

                        <div>
        {wide ? (
          <>
            {sortedSections.slice(0, 1).map((section) => (
              <SectionCardComponent
                key={section.k}
                section={section}
                isActive={activeKey === section.k}
                isOpen={openKeys[section.k]}
                isWide={wide}
                onToggle={toggle}
              />
            ))}

            <RestSectionsWrap>
              {sortedSections.slice(1).map((section) => (
                <SectionCardComponent
                  key={section.k}
                  section={section}
                  isActive={activeKey === section.k}
                  isOpen={openKeys[section.k]}
                  isWide={false}
                  onToggle={toggle}
                />
              ))}
            </RestSectionsWrap>
          </>
        ) : (
          sortedSections.map((section) => (
            <SectionCardComponent
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
