export const GAME_WORDS: string[] = [
  "the", "quick", "brown", "fox", "jump", "over", "lazy", "dog",
  "have", "some", "time", "left", "world", "make",
];

export type TypingEvent = {
  frame: number;
  type: "char" | "space" | "backspace";
  char?: string;
};

// Deterministic gap pattern: cycle through [4, 5, 4, 6, 3, 5] for character timing
const GAP_PATTERN = [4, 5, 4, 6, 3, 5];

function buildTypingEvents(): TypingEvent[] {
  const events: TypingEvent[] = [];
  let frame = 15; // Start typing at frame 15
  let gapIndex = 0;

  function nextGap(): number {
    const gap = GAP_PATTERN[gapIndex % GAP_PATTERN.length];
    gapIndex++;
    return gap;
  }

  function addChar(char: string): void {
    events.push({ frame, type: "char", char });
    frame += nextGap();
  }

  function addSpace(): void {
    events.push({ frame, type: "space" });
    frame += nextGap();
  }

  function addBackspace(): void {
    events.push({ frame, type: "backspace" });
    frame += nextGap();
  }

  for (let wordIndex = 0; wordIndex < GAME_WORDS.length; wordIndex++) {
    const word = GAME_WORDS[wordIndex];

    if (wordIndex === 4) {
      // Word "jump" — intentional error sequence:
      // Type "j", "u", "n" correctly (first 3 chars of "jump" but 3rd should be "m", we type wrong "n" for 3rd char)
      // Actually: j-u-m-p, so type j, u correctly, then instead of "m" type "n" (wrong)
      // Then pause 8 frames, backspace twice, retype "m", "p"

      // "j"
      addChar("j");
      // "u"
      addChar("u");
      // Wrong char "n" instead of "m" — advance frame normally then add 8-frame pause
      events.push({ frame, type: "char", char: "n" });
      frame += 8; // pause 8 frames after the mistake (override gap pattern, but still increment gapIndex)
      // backspace twice
      addBackspace();
      addBackspace();
      // retype "m", "p"
      addChar("m");
      addChar("p");
    } else {
      for (const char of word) {
        addChar(char);
      }
    }

    // Space after each word except the last
    if (wordIndex < GAME_WORDS.length - 1) {
      addSpace();
    }
  }

  return events;
}

export const TYPING_EVENTS: TypingEvent[] = buildTypingEvents();
