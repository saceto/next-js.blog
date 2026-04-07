import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/ai-tic-tac-toe.module.css';

const CELLS = [
  { url: 'https://chatgpt.com', aiName: 'GPT-5.4' },
  { url: 'https://claude.ai', aiName: 'Claude 4.6' },
  { url: 'https://gemini.google.com', aiName: 'Gemini 3.1' },
  { url: 'https://www.perplexity.ai', aiName: 'Perplexity' },
  { url: 'https://www.deepseek.com', aiName: 'DeepSeek-V3' },
  { url: 'https://deep.ai', aiName: 'Deep.ai' },
  { url: 'https://chat.mistral.ai', aiName: 'Mistral Large' },
  { url: 'https://copilot.microsoft.com', aiName: 'Copilot' },
  { url: 'https://grok.com', aiName: 'Grok 4.2' },
];

const WINS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const human = 'X';
const aiPlayer = 'O';

function checkWinner(b) {
  for (const combo of WINS) {
    const [x, y, z] = combo;
    if (b[x] && b[x] === b[y] && b[x] === b[z]) return b[x];
  }
  return b.includes(null) ? null : 'tie';
}

function minimax(newBoard, depth, isMaximizing) {
  const result = checkWinner(newBoard);
  if (result === aiPlayer) return 10 - depth;
  if (result === human) return depth - 10;
  if (result === 'tie') return 0;
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!newBoard[i]) {
        newBoard[i] = aiPlayer;
        const score = minimax(newBoard, depth + 1, false);
        newBoard[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  }
  let bestScore = Infinity;
  for (let i = 0; i < 9; i++) {
    if (!newBoard[i]) {
      newBoard[i] = human;
      const score = minimax(newBoard, depth + 1, true);
      newBoard[i] = null;
      bestScore = Math.min(score, bestScore);
    }
  }
  return bestScore;
}

function pickAiMove(boardCopy) {
  let bestScore = -Infinity;
  let move;
  const b = boardCopy;
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = aiPlayer;
      const score = minimax(b, 0, false);
      b[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

export default function AiTicTacToe() {
  const [board, setBoard] = useState(() => Array(9).fill(null));
  const [thinking, setThinking] = useState(false);
  const [lastMoveIndex, setLastMoveIndex] = useState(null);

  const result = useMemo(() => checkWinner(board), [board]);
  const gameOver = result !== null;

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setThinking(false);
    setLastMoveIndex(null);
  }, []);

  const handleCellClick = useCallback(
    (index) => {
      if (gameOver) {
        window.open(CELLS[index].url, '_blank', 'noopener,noreferrer');
        return;
      }
      if (thinking || board[index]) return;

      const afterHuman = [...board];
      afterHuman[index] = human;
      setBoard(afterHuman);
      setLastMoveIndex(index);

      const w = checkWinner(afterHuman);
      if (w) return;

      setThinking(true);
      window.setTimeout(() => {
        const move = pickAiMove([...afterHuman]);
        if (move === undefined) {
          setThinking(false);
          return;
        }
        const afterAi = [...afterHuman];
        afterAi[move] = aiPlayer;
        setLastMoveIndex(move);
        setBoard(afterAi);
        setThinking(false);
      }, 500);
    },
    [board, gameOver, thinking],
  );

  const statusContent = useMemo(() => {
    if (!gameOver) {
      if (thinking) return { mode: 'text', text: 'Thinking...' };
      return { mode: 'text', text: 'Your Turn (X)' };
    }
    if (result === 'tie') {
      return {
        mode: 'html',
        line1: "It's a Tie!",
        line2: 'Click any cell to try a model.',
      };
    }
    const name = lastMoveIndex != null ? CELLS[lastMoveIndex].aiName : '';
    return {
      mode: 'html',
      line1: `${name} Wins!`,
      line2: 'Click the green cell to visit the AI.',
    };
  }, [board, gameOver, result, thinking, lastMoveIndex]);

  const pageTitle = 'Deep Night Blue AI Tic-Tac-Toe & Yulbrinner';

  return (
    <Layout>
      <Head>
        <title>{pageTitle} — {siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={styles.page}>
        <div className={styles.topNav}>
          <Link href="/" className={styles.gobackLink}>
            GOBACKTOMAINPAGE
          </Link>
          <button type="button" className={styles.resetBtn} onClick={resetGame}>
            RESET GAME
          </button>
        </div>

        <div className={styles.status} id="status">
          {statusContent.mode === 'html' ? (
            <>
              {statusContent.line1}
              <br />
              <small>{statusContent.line2}</small>
            </>
          ) : (
            statusContent.text
          )}
        </div>

        <div className={styles.grid} id="board">
          {CELLS.map((cell, index) => {
            const val = board[index];
            const taken = val != null;
            const showHover = !taken && !gameOver;
            return (
              <button
                key={cell.aiName}
                type="button"
                className={`${styles.cell} ${taken ? styles.taken : ''} ${gameOver ? styles.gameOver : ''} ${showHover ? styles.cellHover : ''}`}
                onClick={() => handleCellClick(index)}
                aria-label={`Cell ${index + 1}, ${cell.aiName}`}
              >
                {val && (
                  <span className={`${styles.mark} ${val === 'X' ? styles.markX : styles.markO}`}>
                    {val}
                  </span>
                )}
                <span className={styles.aiName}>{cell.aiName}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.commentSection}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <textarea
              name="contents"
              placeholder="THANK YOU FOR CONTACTING YULBRINNER. PLEASE LEAVE YOUR COMMENT..."
              className={styles.formControl}
            />
            <input type="submit" className={styles.btnSuccess} value="Post comment" />
          </form>
        </div>
      </div>
    </Layout>
  );
}
