import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CloseIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="-2.5 0 21 16"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 14 14m0-14L1 15"
    />
  </Svg>
);
export default CloseIcon;
