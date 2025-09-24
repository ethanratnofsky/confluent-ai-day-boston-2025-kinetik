import styled, { keyframes } from 'styled-components';
import COLORS from '../../constants/styles/colors';

export const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    position: relative;
`;

export const CenterStatusContainer = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    pointer-events: none;
`;

export const ClockText = styled.div`
    font-size: 12px;
    color: ${COLORS.black60};
    line-height: 1.1;
`;

export const LiveBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    border-radius: 9999px;
    background: ${COLORS.greenLight};
    color: ${COLORS.green};
    border: 1px solid ${COLORS.green};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

const pulse = keyframes`
    0% {
        box-shadow: 0 0 0 0 rgba(47, 177, 104, 0.45);
        transform: scale(1);
    }
    70% {
        box-shadow: 0 0 0 8px rgba(47, 177, 104, 0);
        transform: scale(1.1);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(47, 177, 104, 0);
        transform: scale(1);
    }
`;

export const LiveDot = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${COLORS.green};
    animation: ${pulse} 2s ease-out infinite;
`;