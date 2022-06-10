import styled, {
  css,
  DefaultTheme,
  ThemeProps,
  keyframes,
} from "styled-components";
import { ABootstrapPalette } from "../../assets/theme/interfaces/TBootstrapPalette";
import { ISkeletonCircle, ISkeletonSquare } from "./ISkeleton";

const wave = (props: ThemeProps<DefaultTheme>) => keyframes`
  0% {
    background-position: -${props.theme.breakpoints.xl} 0;
  }
  100% {
    background-position: ${props.theme.breakpoints.xl} 0;
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`;

const cssCustom = (props: ThemeProps<DefaultTheme>) => {
  let tmp = "";
  ABootstrapPalette.forEach((element: string) => {
    tmp += `
      &.bg-${element} {
          --bs-bg-opacity: 1;
        background-color: ${props.theme.palette[element].main} !important;
      }
      &.wave-${element} {
        background: linear-gradient(
          to right,
          ${props.theme.palette[element].main} 8%,
          ${props.theme.palette[element].hover} 18%,
          ${props.theme.palette[element].main} 50%
        );
      }
      `;
  });
  return css`
    ${tmp}
  `;
};

// Add fixed px size for animation
export const SCSkeleton = styled.div<ISkeletonSquare>`
  ${(props) => cssCustom(props)};
  cursor: default;
  ${(props) =>
    props.rounded
      ? `border-radius: ${props.theme.general.border.radius};`
      : ""};
  height: ${(props) => props.height};
  width: ${(props) => props.width};

  &.wave {
    background-size: ${({ theme }) => theme.breakpoints.xl} 100%;
    animation-duration: 2.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: ${wave};
  }

  &.pulse {
    animation: 0.8s linear infinite alternate none running ${pulse};
  }
`;

export const SCSkeletonCircle = styled(SCSkeleton)<ISkeletonCircle>`
  border-radius: 50%;
  width: ${(props) => props.width ?? props.height};
  height: ${(props) => props.height ?? props.width};
`;
