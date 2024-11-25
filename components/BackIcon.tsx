import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const BackIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M8.459 2.429A.937.937 0 1 0 7.166 1.07L8.459 2.43ZM.603 7.32A.937.937 0 1 0 1.897 8.68L.603 7.32Zm1.294 0A.937.937 0 1 0 .603 8.68L1.897 7.32Zm5.269 7.608a.937.937 0 1 0 1.293-1.358L7.166 14.93ZM1.25 7.062a.938.938 0 0 0 0 1.875V7.063Zm17.5 1.875a.937.937 0 1 0 0-1.874v1.875ZM7.166 1.072.603 7.321 1.897 8.68l6.562-6.25L7.166 1.07ZM.603 8.68l6.563 6.25 1.293-1.358-6.562-6.25L.603 8.68Zm.647.258h17.5V7.063H1.25v1.875Z"
    />
  </Svg>
);
export default BackIcon;
