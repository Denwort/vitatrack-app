import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const RecordIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.584 4.694v5.672c.032 1.845-1.404 3.369-3.21 3.403-1.806-.034-3.243-1.558-3.21-3.403V4.694c-.032-1.845 1.405-3.368 3.21-3.402 1.805.034 3.242 1.557 3.21 3.402Z"
      clipRule="evenodd"
    />
    <Path
      fill="#000"
      d="M2.613 14.203a1.055 1.055 0 0 0-1.502.187 1.11 1.11 0 0 0 .183 1.535l1.32-1.722Zm12.84 1.723a1.11 1.11 0 0 0 .184-1.536 1.055 1.055 0 0 0-1.503-.187l1.32 1.723Zm-6.01 1.407c0-.604-.478-1.093-1.07-1.093-.59 0-1.07.49-1.07 1.093h2.14Zm-2.14 4.375c0 .604.48 1.094 1.07 1.094.592 0 1.07-.49 1.07-1.094h-2.14Zm-6.01-5.782a11.29 11.29 0 0 0 14.16 0l-1.319-1.723a9.186 9.186 0 0 1-11.52 0l-1.32 1.723Zm6.01 1.407v4.375h2.14v-4.375h-2.14Z"
    />
  </Svg>
);
export default RecordIcon;
