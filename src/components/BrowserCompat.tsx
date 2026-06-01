import styles from './BrowserCompat.module.css';

const COMPAT = [
  {
    feature: 'getUserMedia (camera access)',
    spec: 'MediaDevices API',
    chrome: '53+',
    firefox: '49+',
    safari: '11+',
    edge: '79+',
    status: 'full',
  },
  {
    feature: 'MediaRecorder (video recording)',
    spec: 'MediaRecorder API',
    chrome: '47+',
    firefox: '25+',
    safari: '14.1+',
    edge: '79+',
    status: 'full',
  },
  {
    feature: 'Canvas toBlob (image capture)',
    spec: 'HTML Canvas API',
    chrome: '50+',
    firefox: '19+',
    safari: '11+',
    edge: '79+',
    status: 'full',
  },
  {
    feature: 'facingMode (front/rear switch)',
    spec: 'MediaTrackConstraints',
    chrome: '59+',
    firefox: '50+',
    safari: '11+',
    edge: '79+',
    status: 'partial',
  },
];

const REQUIREMENTS = [
  { icon: '🔒', title: 'HTTPS Required', desc: 'Camera access is only allowed on secure origins (HTTPS or localhost).' },
  { icon: '🎤', title: 'User Permission', desc: 'The browser prompts the user to grant camera and microphone access.' },
  { icon: '📡', title: 'Modern Browser', desc: 'Requires WebRTC support. All modern browsers since ~2017 are supported.' },
  { icon: '📱', title: 'Mobile Ready', desc: 'Works on iOS Safari 11+ and Android Chrome. facingMode enables front/rear camera switching.' },
];

export default function BrowserCompat() {
  return (
    <section className="section" id="compat">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>🌐</span> Compatibility
          </div>
          <h2 className="section-title">
            Browser <span className="text-gradient">Support</span>
          </h2>
          <p className="section-subtitle">
            Built on standard Web APIs with excellent modern browser support.
          </p>
        </div>

        {/* Requirements */}
        <div className="grid-4" style={{ marginBottom: 'var(--space-10)' }}>
          {REQUIREMENTS.map(req => (
            <div key={req.title} className={`card ${styles.reqCard}`}>
              <div className={styles.reqIcon}>{req.icon}</div>
              <div className={styles.reqTitle}>{req.title}</div>
              <p className={styles.reqDesc}>{req.desc}</p>
            </div>
          ))}
        </div>

        {/* Compat table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Spec</th>
                <th>
                  <span className={styles.browserLabel}>
                    <img
                      src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_16x16.png"
                      alt=""
                      width="14"
                      height="14"
                    />
                    Chrome
                  </span>
                </th>
                <th>
                  <span className={styles.browserLabel}>
                    <img
                      src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_16x16.png"
                      alt=""
                      width="14"
                      height="14"
                    />
                    Firefox
                  </span>
                </th>
                <th>
                  <span className={styles.browserLabel}>
                    <img
                      src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_16x16.png"
                      alt=""
                      width="14"
                      height="14"
                    />
                    Safari
                  </span>
                </th>
                <th>
                  <span className={styles.browserLabel}>
                    <img
                      src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_16x16.png"
                      alt=""
                      width="14"
                      height="14"
                    />
                    Edge
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPAT.map(row => (
                <tr key={row.feature}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        className="status-dot"
                        style={{
                          background: row.status === 'full' ? 'var(--accent-green)' : 'var(--accent-orange)',
                          boxShadow: 'none',
                          animation: 'none',
                        }}
                      />
                      {row.feature}
                    </div>
                  </td>
                  <td><code style={{ fontSize: '0.72rem' }}>{row.spec}</code></td>
                  <td><span className={`badge badge-green ${styles.versionBadge}`}>{row.chrome}</span></td>
                  <td><span className={`badge badge-green ${styles.versionBadge}`}>{row.firefox}</span></td>
                  <td><span className={`badge badge-green ${styles.versionBadge}`}>{row.safari}</span></td>
                  <td><span className={`badge badge-green ${styles.versionBadge}`}>{row.edge}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
