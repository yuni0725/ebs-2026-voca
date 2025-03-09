import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    accentColor: string;
    selectedColor: string;
    bgColor: {
      normal: string;
      darker: string;
    };
    color: string;
    tableColor: {
      tBgColor: string;
      tOddBgColor: string;
      borderColor: string;
    };
  }
}
