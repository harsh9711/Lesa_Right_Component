"use client";
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf"; 
import { viewSizeCalculator, viewHeightCalculator } from "../utils/dropdown";
import styled, { keyframes } from "styled-components";

 
export const PDFPageCanvas = ({ pdfUrl, pageNumber }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const renderPage = async () => {
      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber || 1);

        const baseViewport = page.getViewport({ scale: 1 });
        const targetHeight = 600;
        const scale = targetHeight / baseViewport.height;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        const ctx = canvas.getContext("2d");
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));

        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setLoading(false);
      } catch (err) {
        if (!cancelled) setLoading(false);
      }
    };

    if (pdfUrl) renderPage();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl, pageNumber]);

  return (
    <CanvasWrap>
      {loading && <SkeletonBox />}
      <PageCanvas
        ref={canvasRef}
        style={{
          opacity: loading ? 0 : 1,
          transform: loading ? "translateY(6px)" : "translateY(0)",
        }}
        aria-hidden={loading}
      />
    </CanvasWrap>
  );
};
export const PDFThumbnailViewer = ({ pdfUrl, onPageClick, currentPage }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const canvasRefs = useRef([]);

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
          for (let i = 0; i < nums.length; i++) {
            if (cancelled) return;
            const page = await pdf.getPage(nums[i]);
            const baseViewport = page.getViewport({ scale: 1 });
            const targetWidth = 96;
            const scale = targetWidth / baseViewport.width;
            const viewport = page.getViewport({ scale });

            const canvas = canvasRefs.current[i];
            if (!canvas) continue;
            const ctx = canvas.getContext("2d");
            canvas.width = Math.max(1, Math.floor(viewport.width));
            canvas.height = Math.max(1, Math.floor(viewport.height));

            if (cancelled) return;
            await page.render({ canvasContext: ctx, viewport }).promise;
          }
        });
      } catch (err) { }
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
          $active={num === currentPage}
        >
          <canvas ref={(el) => (canvasRefs.current[index] = el)} />
        </Thumb>
      ))}
    </ThumbnailGrid>
  );
};

export const CanvasWrap = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-top-left-radius: clamp(6px, ${() => viewSizeCalculator(8, true)}, 8px);
  border-top-right-radius: clamp(6px, ${() => viewSizeCalculator(8, true)}, 8px);
  border-bottom-left-radius: 0;  /* 👈 ensure no radius at bottom */
  border-bottom-right-radius: 0; /* 👈 ensures flush join */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8fa;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6ee; /* 👈 visually ties it to the card below */
`;


const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const SkeletonBox = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, #f0f0f3 0%, #e6e6ee 50%, #f0f0f3 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

export const PageCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 220ms ease, transform 220ms ease;
  will-change: opacity, transform;
  flex-shrink: 0;
  display: block;
`;
export const ThumbnailGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.6vw, 8px);
  width: clamp(64px, 7vw, 104px);
  align-items: center;
  max-height: clamp(180px, 40vh, 300px);
  overflow-y: auto;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

export const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: clamp(4px, ${() => viewSizeCalculator(6, true)}, 6px);
  background: #ffffff;
  border: 2px solid ${(p) => (p.$active ? "#ff4da6" : "#f1d0e3")};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

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
    display: block;
  }
`;

