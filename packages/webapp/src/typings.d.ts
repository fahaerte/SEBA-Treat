/* eslint-disable @typescript-eslint/no-empty-interface */
import "styled-components";
import { IDefaultTheme } from "./assets/theme/interfaces/IDefaultTheme";

declare module "styled-components" {
  export interface DefaultTheme extends IDefaultTheme {}
}
