import { Box, Text, useInput } from "ink";
import type { Key } from "ink";
import { useGame, type GameResults } from "../hooks/useGame.ts";
import { memo, useEffect, useMemo, useCallback } from "react";

const PastWord = memo(({ word, inputChars }: { word: string; inputChars: string[] }) => (
  <Box marginRight={1}>
    {word.split("").map((char, charIndex) => {
      const inputChar = inputChars[charIndex];
      return (
        <Text key={charIndex} color={inputChar === char ? "green" : "red"}>
          {char}
        </Text>
      );
    })}
    {inputChars.length > word.length &&
      inputChars
        .slice(word.length)
        .map((char, i) => (
          <Text key={`extra-${i}`} color="red" strikethrough>
            {char}
          </Text>
        ))}
  </Box>
));

const FutureWord = memo(({ word }: { word: string }) => (
  <Box marginRight={1}>
    <Text dimColor>{word}</Text>
  </Box>
));

const CurrentWord = memo(({ word, currentInput }: { word: string; currentInput: string }) => (
  <Box marginRight={1}>
    {word.split("").map((char, charIndex) => {
      const inputChar = currentInput[charIndex];
      if (inputChar === undefined && charIndex === currentInput.length) {
        return (
          <Text key={charIndex} color="white" bold underline>
            {char}
          </Text>
        );
      }
      if (inputChar === undefined) {
        return (
          <Text key={charIndex} dimColor>
            {char}
          </Text>
        );
      }
      return (
        <Text key={charIndex} color={inputChar === char ? "green" : "red"}>
          {char}
        </Text>
      );
    })}
    {currentInput.length > word.length &&
      currentInput
        .slice(word.length)
        .split("")
        .map((char, i) => (
          <Text key={`extra-${i}`} color="red">
            {char}
          </Text>
        ))}
  </Box>
));

type GameProps = {
  duration: number;
  onFinish: (results: GameResults) => void;
  onExit: () => void;
  onRestart: () => void;
};

export function Game({ duration, onFinish, onExit, onRestart }: GameProps) {
  const game = useGame(duration);

  useEffect(() => {
    if (game.isFinished) {
      onFinish(game.getResults());
    }
  }, [game.isFinished]);

  const handleInput = useCallback(
    (input: string, key: Key) => {
      if (key.escape) {
        onExit();
        return;
      }
      if (key.tab) {
        onRestart();
        return;
      }
      if (game.isFinished) return;

      if (key.backspace || key.delete) {
        game.handleBackspace();
      } else if (input && !key.ctrl && !key.meta) {
        for (const char of input) {
          if (char === " ") {
            game.handleSpace();
          } else if (char >= "!" && char <= "~") {
            game.handleChar(char);
          }
        }
      }
    },
    [onExit, onRestart, game.isFinished, game.handleBackspace, game.handleSpace, game.handleChar],
  );

  useInput(handleInput);

  const liveWpm = useMemo(() => {
    if (!game.isRunning || game.isFinished) return 0;
    const elapsed = (duration - game.timeLeft) || 1;
    return Math.round((game.correctCharsAcc / 5) / (elapsed / 60));
  }, [game.correctCharsAcc, game.timeLeft, game.isRunning, game.isFinished, duration]);

  const windowStart = Math.max(0, game.currentWordIndex - 5);
  const windowEnd = game.currentWordIndex + 25;
  const visibleWords = game.words.slice(windowStart, windowEnd);

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box justifyContent="space-between">
        <Text color="yellow" bold>
          {game.timeLeft}s
        </Text>
        <Text color="yellow" bold>
          {liveWpm} wpm
        </Text>
      </Box>
      <Box marginTop={1} flexWrap="wrap">
        {visibleWords.map((word, i) => {
          const wordIndex = windowStart + i;

          if (wordIndex < game.currentWordIndex) {
            return <PastWord key={wordIndex} word={word} inputChars={game.charInputs[wordIndex]} />;
          }

          if (wordIndex === game.currentWordIndex) {
            return <CurrentWord key={wordIndex} word={word} currentInput={game.currentInput} />;
          }

          return <FutureWord key={wordIndex} word={word} />;
        })}
      </Box>
    </Box>
  );
}
