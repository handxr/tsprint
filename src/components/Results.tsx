import { Box, Text, useInput } from "ink";
import type { GameResults } from "../hooks/useGame.ts";

type ResultsProps = {
  results: GameResults;
  onRestart: () => void;
  onMenu: () => void;
};

export function Results({ results, onRestart, onMenu }: ResultsProps) {
  useInput((input, key) => {
    if (key.tab) {
      onRestart();
    } else if (key.escape) {
      onMenu();
    }
  });

  return (
    <Box flexDirection="column" alignItems="center" paddingY={2}>
      <Text bold color="yellow">
        typesprint
      </Text>
      <Box flexDirection="column" alignItems="center" marginTop={2} gap={1}>
        <Text bold color="white">
          {results.wpm} wpm
        </Text>
        <Text color="white">{results.accuracy}% accuracy</Text>
        <Text dimColor>{results.time}s</Text>
      </Box>
      <Box marginTop={2} gap={2}>
        <Text dimColor>Tab → restart</Text>
        <Text dimColor>Esc → menu</Text>
      </Box>
    </Box>
  );
}
