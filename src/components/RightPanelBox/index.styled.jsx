import styled, { keyframes } from 'styled-components';
import { ChevronRight } from 'lucide-react';
import { viewHeightCalculator, viewSizeCalculator } from '../RigthPanel/utility';
export const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateX(${viewSizeCalculator(500, true)});
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const dropdownExpand = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(${viewHeightCalculator(-10, true)});
  }
  to {
    max-height: ${viewHeightCalculator(200, true)};
    opacity: 1;
    transform: translateY(0);
  }
`;

export const RightPanelWrapper = styled.div`
  position: absolute;
  top: ${viewHeightCalculator(86, true)};
  right: ${viewSizeCalculator(12, true)};
  width: ${viewSizeCalculator(408, true)};
  height: ${viewHeightCalculator(650, true)};
  background: white;
  border-radius: ${viewSizeCalculator(24, true)};
  box-shadow: 0px ${viewSizeCalculator(1, true)} ${viewSizeCalculator(6, true)} 0px #00000040;
  overflow-y: auto;
  z-index: 10;
  padding: ${viewSizeCalculator(24, true)};
  display: flex;
  flex-direction: column;
  gap: ${viewSizeCalculator(10, true)};
  animation: ${slideIn} 0.45s ease forwards;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${viewSizeCalculator(24, true)};
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: ${viewSizeCalculator(20, true)};
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 ${viewSizeCalculator(4, true)} 0;
`;

export const Subtitle = styled.p`
  font-size: ${viewSizeCalculator(14, true)};
  color: #737373;
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${viewSizeCalculator(8, true)};
  align-items: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: ${viewSizeCalculator(6, true)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s ease;

  svg {
    width: ${viewSizeCalculator(24, true)};
    height: ${viewSizeCalculator(24, true)};
    transition: filter 0.2s ease;
  }

  &:hover svg {
    filter: brightness(0) saturate(100%) invert(17%) sepia(6%) saturate(9%) hue-rotate(314deg) brightness(96%) contrast(84%);
  }
`;

export const SiteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const SiteItem = styled.div`
  position: relative;
  border-radius: ${viewSizeCalculator(16, true)};
  border-bottom: ${viewSizeCalculator(1, true)} solid #e5e5e5;
  transition: background-color 0.4s ease, border-bottom-color 0.4s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #e5e5e5; 
    border-bottom-color: #f3f6ff;
  }

  &.open {
    border-bottom: none;
  }
`;

export const SiteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${viewSizeCalculator(16, true)} ${viewSizeCalculator(24, true)} ${viewSizeCalculator(16, true)} ${viewSizeCalculator(24, true)};
  cursor: pointer;
`;

export const SiteInfo = styled.div`
  flex: 1;
`;

export const SiteName = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: ${viewSizeCalculator(14, true)};
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: ${viewSizeCalculator(4, true)};
`;

export const SiteLocation = styled.div`
  font-size: ${viewSizeCalculator(13, true)};
  color: #737373;
  display: flex;
  align-items: center;
  gap: ${viewSizeCalculator(4, true)};
`;

export const SiteActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${viewSizeCalculator(8, true)};
  position: relative;
`;

export const BadgeWrapper = styled.div`
  position: relative;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.span`
  font-family: 'Poppins', sans-serif;
  display: inline-block;
  padding: ${viewSizeCalculator(6, true)} ${viewSizeCalculator(12, true)};
  border-radius: ${viewSizeCalculator(16, true)};
  font-size: ${viewSizeCalculator(12, true)};
  background-color: ${props => (props.variant === 'urgent' ? '#F6DDD8' : '#dcfce7')};
  color: ${props => (props.variant === 'urgent' ? '#EC6140' : '#16a34a')};
  transition: opacity 0.3s ease;
  opacity: 1;

  ${SiteItem}:hover & {
    opacity: 0;
  }
`;

export const TrashButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;

  ${SiteItem}:hover & {
    animation: ${fadeInScale} 0.25s ease forwards;
    pointer-events: auto;
  }

  svg {
    width: ${viewSizeCalculator(20, true)};
    height: ${viewSizeCalculator(20, true)};
    stroke: #a5a5a5;
    transition: stroke 0.2s ease, transform 0.2s ease, filter 0.2s ease;
  }

  &:hover svg {
    stroke: black;
  }
`;


export const ChevronIcon = styled(ChevronRight)`
  color: #d4d4d4;
  width: ${viewSizeCalculator(20, true)};
  height: ${viewSizeCalculator(20, true)};
  transition: transform 0.3s ease, color 0.3s ease;

  &.open {
    transform: rotate(90deg);
    color: #737373;
  }
`;

export const Dropdown = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 0 ${viewSizeCalculator(16, true)} ${viewSizeCalculator(16, true)};
  font-size: ${viewSizeCalculator(14, true)};
  color: #555;
  display: flex;
  flex-direction: column;
  gap: ${viewSizeCalculator(8, true)};
  overflow: hidden;
  animation: ${dropdownExpand} 1s ease forwards;
`;
