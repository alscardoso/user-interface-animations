import { useState } from 'react';
import DropdownAnimation from './examples/DropdownAnimation';
import HoverCircle from './examples/HoverCircle';
import CardHover from './examples/CardHover';
import DownloadButton from './examples/DownloadButton';
import './App.css';

const EXAMPLES = [
  {
    id: 'dropdown',
    num: '01',
    title: 'Dropdown Animation',
    description: 'Ease-out vs. ease-in timing on dropdown menus',
  },
  {
    id: 'hover-circle',
    num: '02',
    title: 'Hover Lift',
    description: 'Element movement on hover with ease timing',
  },
  {
    id: 'card-hover',
    num: '03',
    title: 'Card Hover',
    description: 'Reveal hidden content on hover using transform',
  },
  {
    id: 'download-button',
    num: '04',
    title: 'Download Button',
    description: 'Icon swap animation on hover using clipped transforms',
  },
];

export default function App() {
  const [current, setCurrent] = useState(null);

  if (current === 'dropdown')    return <DropdownAnimation onBack={() => setCurrent(null)} />;
  if (current === 'hover-circle') return <HoverCircle onBack={() => setCurrent(null)} />;
  if (current === 'card-hover')     return <CardHover onBack={() => setCurrent(null)} />;
  if (current === 'download-button') return <DownloadButton onBack={() => setCurrent(null)} />;

  return (
    <div className="home">
      <h1 className="home-title">UI Animations</h1>
      <ul className="examples-list">
        {EXAMPLES.map((ex) => (
          <li key={ex.id}>
            <button className="example-item" onClick={() => setCurrent(ex.id)}>
              <span className="example-num">{ex.num}</span>
              <div className="example-info">
                <span className="example-name">{ex.title}</span>
                <span className="example-desc">{ex.description}</span>
              </div>
              <span className="example-arrow">→</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
