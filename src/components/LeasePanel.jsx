import React, { useState, useRef, useEffect } from "react";
import { PDFPageCanvas, PDFThumbnailViewer } from "./PDFViewer";

interface Section {
  k: string;
  label: string;
  icon: string;
}

const SECTIONS: Section[] = [
  { k: "ground", label: "Ground Lease", icon: "🏳️" },
  { k: "tower", label: "Tower Lease", icon: "🗼" },
  { k: "utility", label: "Utility Easement", icon: "🧬" },
  { k: "access", label: "Access Easement", icon: "🔗" },
  { k: "insights", label: "Insights", icon: "✴️" },
];

const Badge: React.FC<{ color: string; size?: "sm" | "md"; children: React.ReactNode }> = ({
  color,
  size = "md",
  children,
}) => (
  <span
    className={`
      ${size === "sm" ? "w-5 h-5 text-xs" : "w-7 h-7 text-sm"}
      inline-flex items-center justify-center rounded-full
      border-2 bg-white font-medium transition-transform duration-200
      hover:scale-110
    `}
    style={{ borderColor: color, color }}
  >
    {children}
  </span>
);

const DetailItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border-l-3 border-gray-200 pl-3 text-sm text-foreground">
    {children}
  </div>
);

const GroundContent: React.FC<{ isWide: boolean }> = ({ isWide }) => (
  <div className="animate-fade-in">
    <div className="grid grid-cols-2 gap-3 gap-x-4 mt-3">
      <DetailItem>
        04/01/2016 –{" "}
        <span className="text-red-500 font-semibold">03/31/2026</span>
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
    </div>
    <div className="flex items-center gap-2 mt-3 text-muted-foreground text-xs">
      <span>✨</span>
      <span>Landowner signaled rent hike request (~15%)</span>
    </div>
  </div>
);

const TowerContent: React.FC<{ isWide: boolean }> = ({ isWide }) => (
  <div className="animate-fade-in">
    <div className="grid grid-cols-2 gap-3 gap-x-4 mt-3">
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
    </div>
  </div>
);

const UtilityContent: React.FC<{ isWide: boolean }> = ({ isWide }) => (
  <div className="animate-fade-in">
    <div className="grid grid-cols-2 gap-3 gap-x-4 mt-3">
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
    </div>
  </div>
);

const AccessContent: React.FC<{ isWide: boolean }> = ({ isWide }) => (
  <div className="animate-fade-in">
    <div className="grid grid-cols-2 gap-3 gap-x-4 mt-3">
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
    </div>
  </div>
);

const InsightsContent: React.FC = () => (
  <div className="p-3 animate-fade-in">
    <div className="font-bold text-foreground mb-3">Insights</div>
    <p className="my-3 text-foreground text-sm leading-relaxed">
      The ground lease for this site is set to expire on March 15, 2026 (next 6
      months). Landlord has indicated interest in revising terms upward by ~15%.
    </p>
    <p className="my-3 text-foreground text-sm leading-relaxed">
      Opportunity: Strategically located near a major corridor; relocation
      unlikely.
    </p>
    <p className="my-3 text-foreground text-sm leading-relaxed">
      Action: Start negotiations by December 2025.
    </p>
  </div>
);

interface SectionCardProps {
  section: Section;
  isOpen: boolean;
  isWide: boolean;
  onToggle: (key: string) => void;
}

const SectionCard = React.forwardRef<HTMLButtonElement, SectionCardProps>(
  ({ section, isOpen, isWide, onToggle }, ref) => {
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
      <button
        ref={ref}
        onClick={() => onToggle(k)}
        data-section={k}
        className={`
          ${isWide ? "m-2 mx-4" : "m-2 mx-2"}
          ${isWide ? (isOpen ? "w-[calc(100%-20px)]" : "w-[90%]") : "w-[95%]"}
          ${isWide ? "p-0" : "p-4"}
          flex items-start justify-between cursor-pointer
          transition-all duration-700 ease-out
          ${
            isWide
              ? isOpen
                ? "rounded-l-xl rounded-r-none border-2 border-r-0 border-pink-light"
                : "rounded-xl border-2 border-pink-light"
              : isOpen
                ? "rounded-xl border-2 border-primary"
                : "rounded-xl border-2 border-pink-light"
          }
          ${isOpen ? "shadow-lg" : "shadow-sm"}
          hover:opacity-80 hover:-translate-y-0.5 active:translate-y-0
          ${isWide ? "hover:shadow-none" : "hover:shadow-md"}
          bg-white
        `}
      >
        <div className="w-full">
          {isWide ? (
            <>
              <div className={`${isOpen ? "mx-0 ml-4" : "mx-4"} py-2`}>
                <div className="flex items-center justify-between w-full">
                  <div className="font-bold text-foreground flex items-center gap-3 flex-1">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                  {k !== "insights" && (
                    <div className="flex items-center gap-3">
                      <Badge color="#1db954">✓</Badge>
                      <Badge color="#ff7a45">!</Badge>
                      <Badge color="#ff4da6">≡</Badge>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`
                  transition-all duration-500 ease-out overflow-hidden
                  ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="mx-0 mb-4 ml-4 p-0 rounded-l-2xl bg-white">
                  {renderContent()}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between w-full">
                <div className="font-bold text-sm text-foreground flex items-center gap-2 flex-1">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
                {k !== "insights" && (
                  <div className="flex items-center gap-2">
                    <Badge color="#1db954" size="sm">✓</Badge>
                    <Badge color="#ff7a45" size="sm">!</Badge>
                    <Badge color="#ff4da6" size="sm">≡</Badge>
                  </div>
                )}
              </div>
              <div
                className={`
                  transition-all duration-500 ease-out overflow-hidden
                  ${isOpen ? "max-h-[500px] opacity-100 mt-0" : "max-h-0 opacity-0"}
                `}
              >
                {renderContent()}
              </div>
            </>
          )}
        </div>
      </button>
    );
  }
);

SectionCard.displayName = "SectionCard";

interface SitePanelProps {
  onClose?: () => void;
}

export const SitePanel: React.FC<SitePanelProps> = ({ onClose = () => {} }) => {
  const [wide, setWide] = useState(false);
  const [openKeys, setOpenKeys] = useState({
    ground: true,
    tower: false,
    utility: false,
    access: false,
    insights: false,
  });
  const [activeKey, setActiveKey] = useState("ground");
  const [gapStyle, setGapStyle] = useState({ top: 0, height: 0 });
  const sectionRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const toggle = (key: string) => {
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

  useEffect(() => {
    if (!wide) return;

    const updateGap = () => {
      const sectionEl = sectionRefs.current[activeKey];
      const previewEl = document.querySelector("[data-preview-shell]");
      if (!sectionEl || !previewEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const previewRect = previewEl.getBoundingClientRect();
      setGapStyle({
        top: sectionRect.top - previewRect.top,
        height: sectionRect.height,
      });
    };

    updateGap();

    const resizeObserver = new ResizeObserver(updateGap);
    if (sectionRefs.current[activeKey]) {
      resizeObserver.observe(sectionRefs.current[activeKey]!);
    }

    const panelWrap = document.querySelector("[data-panel-wrap]");
    if (panelWrap) {
      panelWrap.addEventListener("scroll", updateGap);
    }

    return () => {
      resizeObserver.disconnect();
      if (panelWrap) {
        panelWrap.removeEventListener("scroll", updateGap);
      }
    };
  }, [activeKey, wide]);

  const isLastSection = activeKey === SECTIONS[SECTIONS.length - 1].k;

  return (
    <div
      data-panel-wrap
      onClick={(e) => e.stopPropagation()}
      className={`
        fixed top-6 right-6 max-h-[calc(100vh-48px)] overflow-auto
        ${wide ? "w-[900px]" : "w-[420px]"}
        bg-gradient-to-br from-white/95 via-pink-50/40 to-white/95
        backdrop-blur-md
        border-2 border-primary rounded-2xl
        shadow-[0_12px_30px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06)]
        transition-all duration-700 ease-out
        animate-scale-in
      `}
      style={{
        background: `
          radial-gradient(1200px 400px at 100% -50%, rgba(255, 77, 166, 0.06), transparent 60%),
          radial-gradient(1000px 600px at -10% 10%, rgba(255, 202, 236, 0.18), transparent 60%),
          rgba(255, 255, 255, 0.93)
        `,
      }}
    >
      {/* Header */}
      <header className="p-5 pb-3 flex items-center justify-center relative bg-gradient-to-b from-white to-pink-50/30">
        <div>
          <div className="flex items-start justify-between w-full gap-3">
            <div>
              <h1 className="text-2xl font-light text-foreground">
                Site: <span className="font-semibold">ABCD1234</span>
              </h1>
              <p className="mt-1 text-xs text-black">Seattle \\ West \\ Northwest</p>
              <p className="mt-1.5 text-xs text-black">
                Tower Type: Macro Tower (150 ft)
              </p>
            </div>
            {wide && (
              <div className="flex gap-2">
                <button
                  aria-label="favorite"
                  className="w-8 h-8 rounded-xl border-2 border-pink-light bg-white text-primary
                    flex items-center justify-center cursor-pointer shadow-md
                    transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  ☆
                </button>
                <button
                  aria-label="expand"
                  onClick={() => setWide((w) => !w)}
                  title="Toggle wide view"
                  className="w-8 h-8 rounded-xl border-2 border-pink-light bg-white text-primary
                    flex items-center justify-center cursor-pointer shadow-md
                    transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  ➕
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-3 right-5 flex items-center gap-2">
          {!wide ? (
            <>
              <button
                aria-label="favorite"
                className="w-8 h-8 rounded-xl border-2 border-pink-light bg-white text-primary
                  flex items-center justify-center cursor-pointer shadow-md
                  transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                ☆
              </button>
              <button
                aria-label="expand"
                onClick={() => setWide((w) => !w)}
                title="Toggle wide view"
                className="w-8 h-8 rounded-xl border-2 border-pink-light bg-white text-primary
                  flex items-center justify-center cursor-pointer shadow-md
                  transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                ➕
              </button>
            </>
          ) : (
            <button
              aria-label="close"
              onClick={onClose}
              title="Close"
              className="w-8 h-8 rounded-xl border-2 border-pink-light bg-white text-primary
                flex items-center justify-center cursor-pointer shadow-md
                transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              ✖
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div>
        {wide ? (
          <div className="grid grid-cols-[1fr_auto] gap-0 items-stretch">
            {/* Left side - Sections */}
            <div className="flex flex-col h-full">
              {SECTIONS.map((section) => (
                <SectionCard
                  key={section.k}
                  ref={(el) => (sectionRefs.current[section.k] = el)}
                  section={section}
                  isOpen={openKeys[section.k]}
                  isWide={wide}
                  onToggle={toggle}
                />
              ))}
            </div>

            {/* Right side - Preview Shell */}
            <div
              data-preview-shell
              className={`
                relative mr-4 mb-4 p-3.5 bg-gradient-to-b from-white to-pink-50/30
                border-2 border-l-0 border-pink-light
                grid grid-cols-[3fr_104px] gap-3
                transition-all duration-700 ease-out
                ${isLastSection ? "rounded-br-2xl rounded-tr-none" : "rounded-r-2xl"}
                before:content-[''] before:absolute before:top-0 before:left-[-2px]
                before:w-[2px] before:h-full before:bg-pink-light
                after:content-[''] after:absolute after:left-[-2px]
                after:w-[2px] after:bg-gradient-to-b after:from-white after:to-pink-50/30
                after:transition-all after:duration-500 after:ease-out
                after:rounded-full
              `}
            >
              <style>{`
                [data-preview-shell]::after {
                  top: ${gapStyle.top}px;
                  height: ${gapStyle.height}px;
                }
              `}</style>
              <PDFPageCanvas pdfUrl="/dummy.pdf" pageNumber={currentPage} />
              <PDFThumbnailViewer
                pdfUrl="/dummy.pdf"
                onPageClick={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        ) : (
          SECTIONS.map((section) => (
            <SectionCard
              key={section.k}
              section={section}
              isOpen={openKeys[section.k]}
              isWide={wide}
              onToggle={toggle}
            />
          ))
        )}
      </div>
    </div>
  );
};
