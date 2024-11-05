import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const TabAddIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 36 35"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M10.667 18h14.666M18 10.667v14.666M34.5 18c0 9.113-7.387 16.5-16.5 16.5S1.5 27.113 1.5 18 8.887 1.5 18 1.5 34.5 8.887 34.5 18Z"
    />
  </Svg>
);
export default TabAddIcon;
