import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const BLINK_FRAMES = 16;

interface CursorProps {
  color?: string;
  symbol?: string;
}

export const Cursor: React.FC<CursorProps> = ({
  color = "#cdd6f4",
  symbol = "\u258C",
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame % BLINK_FRAMES,
    [0, BLINK_FRAMES / 2, BLINK_FRAMES],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <span style={{ color, opacity }}>
      {symbol}
    </span>
  );
};
