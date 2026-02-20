import React from "react";
import { AbsoluteFill } from "remotion";

interface TerminalProps {
  children: React.ReactNode;
  title?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  children,
  title = "Terminal",
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#181825",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 1000,
          height: 560,
          borderRadius: 12,
          backgroundColor: "#1e1e2e",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 40,
            backgroundColor: "#313244",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            position: "relative",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {/* Traffic light dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#f38ba8",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#f9e2af",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#a6e3a1",
              }}
            />
          </div>

          {/* Centered title */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#6c7086",
              fontSize: 13,
              fontFamily: "sans-serif",
              pointerEvents: "none",
            }}
          >
            {title}
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
