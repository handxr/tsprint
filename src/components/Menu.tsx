import { useState } from "react";
import { Box, Text, useInput } from "ink";

type Duration = 15 | 30 | 60;
const DURATIONS: Duration[] = [15, 30, 60];

type MenuProps = {
  onStart: (duration: Duration) => void;
  defaultDuration: Duration;
};

export function Menu({ onStart, defaultDuration }: MenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(
    DURATIONS.indexOf(defaultDuration)
  );

  useInput((input, key) => {
    if (key.leftArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.rightArrow) {
      setSelectedIndex((prev) => Math.min(DURATIONS.length - 1, prev + 1));
    } else if (key.return) {
      onStart(DURATIONS[selectedIndex]);
    }
  });

  return (
    <Box flexDirection="column" alignItems="center" paddingY={2}>
      <Text bold color="yellow">
        typesprint
      </Text>

      <Box marginTop={2} gap={2}>
        {DURATIONS.map((d, i) => (
          <Text
            key={d}
            bold={i === selectedIndex}
            color={i === selectedIndex ? "white" : "gray"}
            underline={i === selectedIndex}
          >
            {d}s
          </Text>
        ))}
      </Box>

      <Box marginTop={1}>
        <Text dimColor>← / → to choose, Enter to start</Text>
      </Box>

      <Box flexDirection="column" marginTop={2} gap={0}>
        <Text dimColor>─── keys ───</Text>
        <Text dimColor>
          <Text color="gray">Tab</Text>    restart game
        </Text>
        <Text dimColor>
          <Text color="gray">Esc</Text>    back to menu
        </Text>
        <Text dimColor>
          <Text color="gray">Ctrl+C</Text> quit
        </Text>
      </Box>
    </Box>
  );
}
