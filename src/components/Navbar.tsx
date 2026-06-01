import { useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Demo', href: '#demo' },
  { label: 'Props', href: '#props' },
  { label: 'API', href: '#api' },
  { label: 'Examples', href: '#examples' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>📷</span>
          <span>
            <span className="text-gradient">react-camera</span>
            <span style={{ color: 'var(--text-muted)' }}>-component</span>
          </span>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a
            href="https://www.npmjs.com/package/react-camera-component"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            id="nav-npm-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0V0zm19.2 19.2H12V7.2h-2.4v12H4.8V4.8h14.4v14.4z"/>
            </svg>
            npm
          </a>
          <a
            href="https://github.com/Sahil-Chhabra-09/react-camera-component"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            id="nav-github-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
