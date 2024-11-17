import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const DropdownIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={9}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M.75 1.5 7 7.75l6.25-6.25"
    />
  </Svg>
);
export default DropdownIcon;
