import styles from './PropsTable.module.css';

const PROPS = [
  {
    name: 'autoPlayOnStart',
    type: 'boolean',
    default: 'true',
    description: 'Automatically start the camera stream when the component mounts.',
    badge: 'behavior',
  },
  {
    name: 'facingMode',
    type: '"user" | "environment"',
    default: '"user"',
    description: 'Initial camera facing mode — front camera (user) or rear camera (environment).',
    badge: 'camera',
  },
  {
    name: 'maxVideoDuration',
    type: 'number',
    default: '60000',
    description: 'Maximum video recording duration in milliseconds. Auto-stops after this limit.',
    badge: 'video',
  },
  {
    name: 'imageFormat',
    type: '"image/png" | "image/jpeg" | "image/webp"',
    default: '"image/png"',
    description: 'Output format for captured images.',
    badge: 'image',
  },
  {
    name: 'imageQuality',
    type: 'number',
    default: '1',
    description: 'Image compression quality from 0 (worst) to 1 (best). Only applies to JPEG and WebP.',
    badge: 'image',
  },
  {
    name: 'displayStream',
    type: 'boolean',
    default: 'true',
    description: 'Show or hide the video feed. Useful for "headless" capture without showing the stream.',
    badge: 'behavior',
  },
  {
    name: 'captureAudio',
    type: 'boolean',
    default: 'false',
    description: 'Enable microphone audio capture when recording videos.',
    badge: 'video',
  },
  {
    name: 'containerClassName',
    type: 'string',
    default: 'undefined',
    description: 'Custom CSS class name applied to the outermost container div.',
    badge: 'styling',
  },
  {
    name: 'frameRate',
    type: 'number',
    default: '30',
    description: 'Desired video frame rate in frames per second (fps).',
    badge: 'camera',
  },
  {
    name: 'width',
    type: 'number',
    default: '1280',
    description: 'Ideal video stream width in pixels. Actual resolution depends on camera capabilities.',
    badge: 'camera',
  },
  {
    name: 'height',
    type: 'number',
    default: '720',
    description: 'Ideal video stream height in pixels. Actual resolution depends on camera capabilities.',
    badge: 'camera',
  },
  {
    name: 'onCapture',
    type: '(media: CapturedMedia) => void',
    default: 'undefined',
    description: 'Callback fired when an image is captured or video recording stops. Receives media object.',
    badge: 'callback',
  },
  {
    name: 'onStreamStart',
    type: '(info: StreamInfo) => void',
    default: 'undefined',
    description: 'Callback fired when the camera stream successfully starts. Receives actual stream dimensions.',
    badge: 'callback',
  },
  {
    name: 'onError',
    type: '(error: Error) => void',
    default: 'undefined',
    description: 'Error callback. Called on permission denial, missing camera, or recording failures.',
    badge: 'callback',
  },
];

const BADGE_COLOR: Record<string, string> = {
  behavior: 'badge-primary',
  camera: 'badge-cyan',
  video: 'badge-red',
  image: 'badge-orange',
  styling: 'badge-green',
  callback: 'badge-primary',
};

export default function PropsTable() {
  return (
    <section className="section" id="props" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>📋</span> API Reference
          </div>
          <h2 className="section-title">
            Props <span className="text-gradient">Reference</span>
          </h2>
          <p className="section-subtitle">
            Every prop is optional with sensible defaults. Mix and match to build your perfect camera UI.
          </p>
        </div>

        <div className={styles.tableCard}>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {PROPS.map(prop => (
                  <tr key={prop.name}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <code>{prop.name}</code>
                        <span className={`badge ${BADGE_COLOR[prop.badge]}`}>
                          {prop.badge}
                        </span>
                      </div>
                    </td>
                    <td>
                      <code className={styles.typeCode}>{prop.type}</code>
                    </td>
                    <td>
                      <code className={styles.defaultCode}>{prop.default}</code>
                    </td>
                    <td>
                      <span className={styles.desc}>{prop.description}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Types */}
        <div className={styles.typesSection}>
          <h3 className={styles.typesHeading}>TypeScript Types</h3>
          <div className="grid-2" style={{ gap: 'var(--space-5)' }}>
            <div className="code-block">
              <div className="code-block-header">
                <div className="code-block-dots">
                  <div className="code-block-dot dot-red" />
                  <div className="code-block-dot dot-yellow" />
                  <div className="code-block-dot dot-green" />
                </div>
                <span className="code-block-lang">typescript — CapturedMedia</span>
              </div>
              <div className="code-block-body">
                <pre>{`interface CapturedMedia {
  type: "image" | "video";
  url: string;      // Blob URL for preview
  timestamp: number; // Date.now()
  blob: Blob;        // Raw data for upload
}`}</pre>
              </div>
            </div>

            <div className="code-block">
              <div className="code-block-header">
                <div className="code-block-dots">
                  <div className="code-block-dot dot-red" />
                  <div className="code-block-dot dot-yellow" />
                  <div className="code-block-dot dot-green" />
                </div>
                <span className="code-block-lang">typescript — StreamInfo</span>
              </div>
              <div className="code-block-body">
                <pre>{`interface StreamInfo {
  width: number;   // Actual stream width
  height: number;  // Actual stream height
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
