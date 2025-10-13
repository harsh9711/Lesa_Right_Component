import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import         { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

export const PDFCanvasViewer = ({ pdfUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };

      page.render(renderContext);
    };

    loadPDF();
  }, [pdfUrl]);

  return <canvas ref={canvasRef}></canvas>;
};


const PDFViewer = ({ pdfUrl }) => {
  return (
    <div>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;

