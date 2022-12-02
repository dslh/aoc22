const SYMBOLS = {
  'A': '🪨', 'B': '📄', 'C': '✂️',
  'X': '🪨', 'Y': '📄', 'Z': '✂️'
};

const RESULT = { 0: '👈', 3: '🤝', 6: '👉' };
const MOOD = { 0: '😭', 3: '😐', 6: '😄' };

const Game = ({ game, score, result }) => (
  <div>{SYMBOLS[game[0]]} {RESULT[result]} {SYMBOLS[game[1]]} {MOOD[result]} 🟰 {score}</div>
);

export default Game;
