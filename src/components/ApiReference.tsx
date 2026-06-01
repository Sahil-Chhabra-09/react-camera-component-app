import styles from './ApiReference.module.css';

const METHODS = [
  {
    name: 'startStream',
    signature: 'startStream(facingMode?: "user" | "environment"): Promise<void>',
    description: 'Requests camera permission and starts the video stream. Accepts an optional facing mode override.',
    icon: '▶️',
    color: 'var(--accent-green)',
  },
  {
    name: 'stopStream',
    signature: 'stopStream(): void',
    description: 'Stops all camera tracks and releases the camera device. Also stops any active recording.',
    icon: '⏹️',
    color: 'var(--accent-red)',
  },
  {
    name: 'captureImage',
    signature: 'captureImage(): void',
    description: 'Captures a frame from the video stream and fires onCapture with a CapturedMedia object of type "image".',
    icon: '📸',
    color: 'var(--accent-cyan)',
  },
  {
    name: 'startRecording',
    signature: 'startRecording(): void',
    description: 'Begins video recording using the MediaRecorder API. Auto-stops at maxVideoDuration.',
    icon: '🔴',
    color: 'var(--accent-red)',
  },
  {
    name: 'stopRecording',
    signature: 'stopRecording(): void',
    description: 'Stops an active recording and fires onCapture with a CapturedMedia object of type "video" (WebM).',
    icon: '⏺️',
    color: 'var(--accent-orange)',
  },
  {
    name: 'toggleRecording',
    signature: 'toggleRecording(): void',
    description: 'Convenience method — starts recording if idle, stops recording if active.',
    icon: '🔀',
    color: 'var(--accent-secondary)',
  },
  {
    name: 'switchCamera',
    signature: 'switchCamera(): void',
    description: 'Toggles between front (user) and rear (environment) cameras by restarting the stream.',
    icon: '🔄',
    color: 'var(--accent-primary)',
  },
];

const STATE_PROPS = [
  {
    name: 'isStreaming',
    type: 'boolean',
    description: 'Current streaming state — true while camera is active.',
  },
  {
    name: 'isRecording',
    type: 'boolean',
    description: 'Current recording state — true while video recording is in progress.',
  },
  {
    name: 'videoElement',
    type: 'HTMLVideoElement | null',
    description: 'Direct reference to the underlying <video> DOM element.',
  },
];

export default function ApiReference() {
  return (
    <section className="section" id="api">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>🔧</span> Imperative API
          </div>
          <h2 className="section-title">
            Ref <span className="text-gradient">Methods</span>
          </h2>
          <p className="section-subtitle">
            Attach a ref to gain full programmatic control. Build any camera UI imaginable.
          </p>
        </div>

        {/* Usage example */}
        <div className={styles.refUsage}>
          <div className="code-block">
            <div className="code-block-header">
              <div className="code-block-dots">
                <div className="code-block-dot dot-red" />
                <div className="code-block-dot dot-yellow" />
                <div className="code-block-dot dot-green" />
              </div>
              <span className="code-block-lang">tsx — Attach ref</span>
            </div>
            <div className="code-block-body">
              <pre>{`import { useRef } from "react";
import { CameraComponent, CameraComponentHandles } from "react-camera-component";

const cameraRef = useRef<CameraComponentHandles>(null);

<CameraComponent ref={cameraRef} autoPlayOnStart={false} />`}</pre>
            </div>
          </div>
        </div>

        {/* Method cards */}
        <h3 className={styles.subHeading}>Methods</h3>
        <div className={styles.methodsGrid}>
          {METHODS.map((method, i) => (
            <div key={method.name} className={`card ${styles.methodCard}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className={styles.methodHeader}>
                <div className={styles.methodIcon} style={{ color: method.color }}>
                  {method.icon}
                </div>
                <code className={styles.methodName}>{method.name}</code>
              </div>
              <div className={styles.methodSig}>
                <code>{method.signature}</code>
              </div>
              <p className={styles.methodDesc}>{method.description}</p>
            </div>
          ))}
        </div>

        {/* State props */}
        <h3 className={styles.subHeading}>State Properties</h3>
        <p className={styles.subDesc}>
          These ref properties expose the current internal state for conditional rendering in your UI.
        </p>
        <div className={styles.stateGrid}>
          {STATE_PROPS.map(prop => (
            <div key={prop.name} className={`card ${styles.stateCard}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <code className={styles.statePropName}>{prop.name}</code>
                <span className="badge badge-cyan">{prop.type}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{prop.description}</p>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div className={styles.note}>
          <span className={styles.noteIcon}>💡</span>
          <div>
            <strong>Headless by design:</strong> The component renders only a{' '}
            <code>{`<div><video /><canvas /></div>`}</code>. All controls, overlays, and UI are entirely up to you.
            This gives you complete design freedom while the component handles all the complex camera logic.
          </div>
        </div>
      </div>
    </section>
  );
}
