import styled from 'styled-components';

export const MapViewContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  position: relative;
`;

export const ControlsContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1000;
`;

export const ToggleGroup = styled.div`
  display: inline-flex;
  background: rgba(255,255,255,0.9);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.08);
`;

export const ToggleButton = styled.button`
  appearance: none;
  border: none;
  padding: 6px 10px;
  background: ${props => props.$active ? '#1f2937' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#111'};
  font-size: 12px;
  cursor: pointer;
  outline: none;
  transition: background 0.15s ease;
  &:not(:last-child) {
    border-right: 1px solid rgba(0,0,0,0.08);
  }
`;
