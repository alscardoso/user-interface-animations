import { motion } from 'motion/react';

export default function CardHover({ onBack }) {
  return (
    <div className="example-page">
      <header className="example-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <span className="example-label">03 — Card Hover</span>
      </header>
      <div className="card-stage">
        <motion.div
          className="card"
          whileHover="hovered"
          initial="rest"
        >
          <div className="card-visual" />
          <motion.div
            className="card-reveal"
            variants={{
              rest:    { y: '100%' },
              hovered: { y: 0 },
            }}
            transition={{ duration: 0.500, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="card-toast">
              <h3 className="card-title">Mountain Escape</h3>
              <p className="card-desc">A quiet retreat nestled in the heart of the Alps.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
