import styles from './Hero.module.css';
import { CODE_SNIPPETS } from '../utils/codeSnippets';
import { useState } from 'react';

const FEATURES = [
  { icon: '📸', label: 'Image Capture' },
  { icon: '🎥', label: 'Video Recording' },
  { icon: '🔄', label: 'Camera Switch' },
  { icon: '🎛️', label: 'Headless Design' },
  { icon: '📱', label: 'Mobile Ready' },
  { icon: '🔷', label: 'TypeScript' },
];

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CODE_SNIPPETS.install);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.hero} id="home">
      {/* Background glow orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Particle grid */}
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={`animate-fade-up ${styles.badge}`}>
          <span className="badge badge-primary">
            <span className={styles.pulseDot} />
            v1.1.2 · MIT License
          </span>
          <span className="badge badge-green">0 Dependencies</span>
        </div>

        <h1 className={`animate-fade-up delay-100 ${styles.heading}`}>
          The <span className="text-gradient">Camera Component</span>
          <br />for React
        </h1>

        <p className={`animate-fade-up delay-200 ${styles.subtitle}`}>
          A lightweight, headless React component for capturing images and recording videos.
          Built with TypeScript. Designed for maximum flexibility.
        </p>

        {/* Feature pills */}
        <div className={`animate-fade-up delay-300 ${styles.features}`}>
          {FEATURES.map(f => (
            <span key={f.label} className={styles.featurePill}>
              {f.icon} {f.label}
            </span>
          ))}
        </div>

        {/* Install command */}
        <div className={`animate-fade-up delay-400 ${styles.installBox}`}>
          <code className={styles.installCode}>
            <span className={styles.dollar}>$</span>
            {' '}npm install react-camera-component
          </code>
          <button
            className={`btn btn-sm ${copied ? 'btn-success' : 'btn-secondary'}`}
            onClick={handleCopy}
            id="hero-copy-install"
            aria-label="Copy install command"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>

        {/* CTA buttons */}
        <div className={`animate-fade-up delay-500 ${styles.ctas}`}>
          <a href="#demo" className="btn btn-primary btn-lg" id="hero-cta-demo">
            🚀 Try Live Demo
          </a>
          <a
            href="https://github.com/Sahil-Chhabra-09/react-camera-component"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg"
            id="hero-cta-github"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/react-camera-component"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
            id="hero-cta-npm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0V0zm19.2 19.2H12V7.2h-2.4v12H4.8V4.8h14.4v14.4z"/>
            </svg>
            View on npm
          </a>
        </div>

        {/* Stats */}
        <div className={`animate-fade-up delay-600 ${styles.stats}`}>
          <div className={styles.stat}>
            <span className={styles.statVal}>~4KB</span>
            <span className={styles.statLabel}>Minified + Gzipped</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>0</span>
            <span className={styles.statLabel}>Dependencies</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>React 16.8+</span>
            <span className={styles.statLabel}>Peer Dependency</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>TypeScript</span>
            <span className={styles.statLabel}>Full Type Safety</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#demo" className={styles.scrollHint} aria-label="Scroll to demo">
        <div className={styles.scrollDot} />
      </a>
    </section>
  );
}
