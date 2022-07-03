import { TBootstrapPalette } from "../../../assets/theme/interfaces/TBootstrapPalette";

// Interface which will be injected as a prop for components with loading prop
export interface ISkeletonConfig {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * If true, the skeleton-animation is a pulse.
   * If false, the skeleton-animation is a wave.
   */
  pulse?: boolean;
  /**
   * Background color of animation
   */
  color?: TBootstrapPalette;
  /**
   * height (include unit)
   */
  height?: string;
  /**
   * width (include unit)
   */
  width?: string;
  /**
   * Number of generated rows
   */
  rows?: number;
  /**
   * Whether the edges of the SkeletonSquare are rounded
   */
  rounded?: boolean;
}

export interface ISkeletonSquare extends ISkeletonConfig {}

export type ISkeletonCircle = Omit<ISkeletonSquare, "rows" | "rounded">;
