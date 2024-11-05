import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const TabStatIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    viewBox="3 0 20 22"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.192 5H9.808A4.332 4.332 0 0 0 5.5 9.356v5.288A4.332 4.332 0 0 0 9.808 19h5.384a4.332 4.332 0 0 0 4.308-4.356V9.356A4.332 4.332 0 0 0 15.192 5Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.184 10.53h3.346v3.334"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m16.53 10.53-4.2 4.32a1 1 0 0 1-1.353.055l-.9-.765a1 1 0 0 0-1.446.16c-.039.052-.077.105-.12.153L6.183 17"
    />
  </Svg>
);
export default TabStatIcon;
