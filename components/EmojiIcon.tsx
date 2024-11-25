import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const EmojiIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      stroke="gray"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.678 14.417c.258.688.682 1.3 1.232 1.777a4.68 4.68 0 0 0 6.067.046 4.408 4.408 0 0 0 1.26-1.76"
    />
    <Path
      stroke="gray"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.945 11.5c0 5.638-4.472 10.208-9.987 10.208C5.442 21.708.97 17.138.97 11.5S5.442 1.292 10.958 1.292a9.878 9.878 0 0 1 7.062 2.99 10.324 10.324 0 0 1 2.925 7.218Z"
      clipRule="evenodd"
    />
    <Path
      stroke="gray"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M6.678 10.042V8.583M15.238 10.042V8.583"
    />
  </Svg>
);
export default EmojiIcon;
