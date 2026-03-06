import { motion } from 'motion/react';

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const circleTransition = { duration: 0.2, ease: 'easeOut' };

export default function HoverCircle({ onBack }) {
  return (
    <div className="example-page">
      <header className="example-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <span className="example-label">02 — Hover Lift</span>
      </header>
      <div className="hover-stage">
        <div className="stage">

          {/* BAD: circle is the hover target — moves away from cursor, causing flicker */}
          <div className="col">
            <motion.div
              className="hover-circle"
              whileHover={{ y: '-20%' }}
              transition={circleTransition}
            />
            <div className="col-label bad"><XIcon /></div>
          </div>

          {/* GOOD: stationary wrapper is the hover target — circle moves, hover stays */}
          <div className="col">
            <motion.div
              className="hover-circle-target"
              whileHover="hovered"
              initial="rest"
            >
              <motion.div
                className="hover-circle"
                variants={{
                  rest:   { y: 0 },
                  hovered: { y: '-20%' },
                }}
                transition={circleTransition}
              />
            </motion.div>
            <div className="col-label good"><CheckIcon /></div>
          </div>

        </div>
      </div>
    </div>
  );
}
