import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import './App.css';

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReduced;
}

const GAP = 8;

// ── Icons ────────────────────────────────────────────────────────────────────

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IntegrationsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );
}

function BillingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

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

// ── Menu items data ───────────────────────────────────────────────────────────

const MENU_ITEMS = [
  { label: 'Dashboard',        icon: <DashboardIcon /> },
  { label: 'My Integrations',  icon: <IntegrationsIcon /> },
  { label: 'Billing & Invoices', icon: <BillingIcon /> },
  { label: 'Account Settings', icon: <AccountIcon /> },
  { label: 'Log out',          icon: <LogoutIcon />, danger: true },
];

// ── Framer Motion variants ────────────────────────────────────────────────────

const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.1, ease: [0.22, 0.61, 0.36, 1] },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const itemVariants = {
  hidden: {
    scale: 0.97,
    transition: { duration: 0.1, ease: [0.22, 0.61, 0.36, 1] },
  },
  visible: {
    scale: 1,
    transition: { duration: 0.2, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// ── BAD dropdown (pure CSS) ───────────────────────────────────────────────────

function BadDropdown({ isOpen, onOpen, onClose }) {
  const [isBelow, setIsBelow] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  function positionDropdown() {
    const trigger = triggerRef.current;
    const dropdown = dropdownRef.current;
    if (!trigger || !dropdown) return false;
    const triggerRect = trigger.getBoundingClientRect();
    const goBelow = triggerRect.top < dropdown.offsetHeight + GAP;
    if (goBelow) {
      dropdown.style.bottom = '';
      dropdown.style.top = `calc(100% + ${GAP}px)`;
    } else {
      dropdown.style.top = '';
      dropdown.style.bottom = `calc(100% + ${GAP}px)`;
    }
    return goBelow;
  }

  function open() {
    const goBelow = positionDropdown();
    setIsBelow(goBelow);
    onOpen();
  }

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (!dropdownRef.current?.contains(e.target)) onClose();
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const dropdownClass = ['dropdown bad-dropdown', isBelow && 'below', isOpen && 'open']
    .filter(Boolean).join(' ');

  return (
    <div className="menu-wrap">
      <button
        ref={triggerRef}
        className="trigger"
        aria-expanded={isOpen}
        onClick={(e) => { e.stopPropagation(); isOpen ? onClose() : open(); }}
      >
        Options <ChevronIcon />
      </button>
      <div ref={dropdownRef} className={dropdownClass} role="menu" onClick={(e) => e.stopPropagation()}>
        <ul>
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className={item.danger ? 'danger' : undefined}>
              <a href="#">{item.icon} {item.label} {item.trailingIcon}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── GOOD dropdown (Framer Motion) ─────────────────────────────────────────────

function GoodDropdown({ isOpen, onOpen, onClose }) {
  const [isBelow, setIsBelow] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  function positionDropdown() {
    const trigger = triggerRef.current;
    const dropdown = dropdownRef.current;
    if (!trigger || !dropdown) return false;
    const triggerRect = trigger.getBoundingClientRect();
    const goBelow = triggerRect.top < dropdown.offsetHeight + GAP;
    if (goBelow) {
      dropdown.style.bottom = '';
      dropdown.style.top = `calc(100% + ${GAP}px)`;
    } else {
      dropdown.style.top = '';
      dropdown.style.bottom = `calc(100% + ${GAP}px)`;
    }
    return goBelow;
  }

  function open() {
    const goBelow = positionDropdown();
    setIsBelow(goBelow);
    onOpen();
  }

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (!dropdownRef.current?.contains(e.target)) onClose();
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  // Reduced motion: skip scale, shorten duration
  const vars = prefersReducedMotion
    ? {
        hidden: { opacity: 0, transition: { duration: 0.1 } },
        visible: { opacity: 1, transition: { duration: 0.15 } },
      }
    : dropdownVariants;

  return (
    <div className="menu-wrap">
      <button
        ref={triggerRef}
        className="trigger"
        aria-expanded={isOpen}
        onClick={(e) => { e.stopPropagation(); isOpen ? onClose() : open(); }}
      >
        Options <ChevronIcon />
      </button>
      <motion.div
        ref={dropdownRef}
        className="dropdown"
        role="menu"
        onClick={(e) => e.stopPropagation()}
        variants={vars}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        style={{
          x: '-50%',
          originX: 0.5,
          originY: isBelow ? 0 : 1,        // top anchor when below, bottom when above
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <ul>
          {MENU_ITEMS.map((item) => (
            <motion.li
              key={item.label}
              variants={prefersReducedMotion ? undefined : itemVariants}
              className={item.danger ? 'danger' : undefined}
            >
              <a href="#">{item.icon} {item.label} {item.trailingIcon}</a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="app">
      <h1>Demo 01 &mdash; Dropdown Animation</h1>
      <div className="stage">
        <div className="col">
          <BadDropdown
            isOpen={openDropdown === 'bad'}
            onOpen={() => setOpenDropdown('bad')}
            onClose={() => setOpenDropdown(null)}
          />
          <div className="col-label bad"><XIcon /></div>
        </div>
        <div className="col">
          <GoodDropdown
            isOpen={openDropdown === 'good'}
            onOpen={() => setOpenDropdown('good')}
            onClose={() => setOpenDropdown(null)}
          />
          <div className="col-label good"><CheckIcon /></div>
        </div>
      </div>
    </div>
  );
}

export default App;
