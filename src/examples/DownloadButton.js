import { motion } from 'motion/react';

function ArrowDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

const arrowTransition = { duration: 0.5, ease: [0.19, 1, 0.22, 1] };

export default function DownloadButton({ onBack }) {
  return (
    <div className="example-page">
      <header className="example-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <span className="example-label">04 — Download Button</span>
      </header>
      <div className="download-stage">
        <motion.button
          className="download-btn"
          whileHover="hovered"
          initial="rest"
        >
          {/* Original arrow: rests at center, exits downward on hover */}
          <motion.span
            className="download-arrow"
            variants={{
              rest:    { y: 0 },
              hovered: { y: '100%' },
            }}
            transition={arrowTransition}
          >
            <ArrowDown />
          </motion.span>

          {/* Incoming arrow: starts above, lands at center on hover */}
          <motion.span
            className="download-arrow"
            variants={{
              rest:    { y: '-100%' },
              hovered: { y: 0 },
            }}
            transition={arrowTransition}
          >
            <ArrowDown />
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
