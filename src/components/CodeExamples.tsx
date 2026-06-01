import { useState } from 'react';
import { CODE_SNIPPETS } from '../utils/codeSnippets';
import styles from './CodeExamples.module.css';

const EXAMPLES = [
  {
    id: 'quickStart',
    title: 'Quick Start',
    desc: 'Minimal setup — drop in the component and get started in seconds.',
    icon: '⚡',
    snippet: CODE_SNIPPETS.quickStart,
    lang: 'tsx',
  },
  {
    id: 'refControl',
    title: 'Programmatic Control',
    desc: 'Use a ref to call imperative methods — start, stop, capture, record, and switch camera.',
    icon: '🎛️',
    snippet: CODE_SNIPPETS.refControl,
    lang: 'tsx',
  },
  {
    id: 'uploadServer',
    title: 'Upload to Server',
    desc: 'Use the raw Blob from captured media to upload directly to your backend.',
    icon: '☁️',
    snippet: CODE_SNIPPETS.uploadServer,
    lang: 'tsx',
  },
  {
    id: 'highQuality',
    title: 'High-Quality Capture',
    desc: 'Configure resolution, format, and quality for professional-grade image capture.',
    icon: '🌟',
    snippet: CODE_SNIPPETS.highQuality,
    lang: 'tsx',
  },
  {
    id: 'rearCamera',
    title: 'Rear Camera + Audio',
    desc: 'Use the rear camera with audio recording enabled and an extended max duration.',
    icon: '📱',
    snippet: CODE_SNIPPETS.rearCamera,
    lang: 'tsx',
  },
  {
    id: 'errorHandling',
    title: 'Error Handling',
    desc: 'Handle common camera errors gracefully with a typed error callback.',
    icon: '🛡️',
    snippet: CODE_SNIPPETS.errorHandling,
    lang: 'tsx',
  },
];

function CodeBlock({ snippet, lang }: { snippet: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-block-header">
        <div className="code-block-dots">
          <div className="code-block-dot dot-red" />
          <div className="code-block-dot dot-yellow" />
          <div className="code-block-dot dot-green" />
        </div>
        <span className="code-block-lang">{lang}</span>
        <button className="copy-btn" onClick={handleCopy} aria-label="Copy code">
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <div className="code-block-body">
        <pre>{snippet}</pre>
      </div>
    </div>
  );
}

export default function CodeExamples() {
  const [active, setActive] = useState(EXAMPLES[0].id);
  const currentExample = EXAMPLES.find(e => e.id === active)!;

  return (
    <section className="section" id="examples" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>💻</span> Code Examples
          </div>
          <h2 className="section-title">
            Ready-to-use <span className="text-gradient">Snippets</span>
          </h2>
          <p className="section-subtitle">
            Copy, paste, and customise. All examples use full TypeScript types.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {EXAMPLES.map(ex => (
              <button
                key={ex.id}
                id={`example-tab-${ex.id}`}
                className={`${styles.sidebarBtn} ${active === ex.id ? styles.activeBtn : ''}`}
                onClick={() => setActive(ex.id)}
              >
                <span className={styles.sidebarIcon}>{ex.icon}</span>
                <div className={styles.sidebarText}>
                  <span className={styles.sidebarTitle}>{ex.title}</span>
                  <span className={styles.sidebarDesc}>{ex.desc}</span>
                </div>
              </button>
            ))}
          </aside>

          {/* Code panel */}
          <div className={styles.codePanel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIcon}>{currentExample.icon}</span>
              <div>
                <div className={styles.panelTitle}>{currentExample.title}</div>
                <div className={styles.panelDesc}>{currentExample.desc}</div>
              </div>
            </div>
            <CodeBlock snippet={currentExample.snippet} lang={currentExample.lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
