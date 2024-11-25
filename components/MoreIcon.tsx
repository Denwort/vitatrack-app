import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MoreIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.2 4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM13.4 4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM20.6 4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default MoreIcon;
