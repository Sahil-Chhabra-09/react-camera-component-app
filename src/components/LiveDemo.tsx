import { useRef, useState, useCallback } from "react";
import { CameraComponent } from "react-camera-component";
import type {
  CameraComponentHandles,
  CapturedMedia,
  StreamInfo,
} from "react-camera-component";
import styles from "./LiveDemo.module.css";

interface DemoConfig {
  autoPlayOnStart: boolean;
  facingMode: "user" | "environment";
  maxVideoDuration: number;
  imageFormat: "image/png" | "image/jpeg" | "image/webp";
  imageQuality: number;
  displayStream: boolean;
  captureAudio: boolean;
  frameRate: number;
  width: number;
  height: number;
}

const DEFAULT_CONFIG: DemoConfig = {
  autoPlayOnStart: true,
  facingMode: "user",
  maxVideoDuration: 60000,
  imageFormat: "image/png",
  imageQuality: 1,
  displayStream: true,
  captureAudio: false,
  frameRate: 30,
  width: 1280,
  height: 720,
};

function Toggle({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="toggle" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-slider" />
    </label>
  );
}

function GalleryItem({
  item,
  onDownload,
}: {
  item: CapturedMedia;
  onDownload: (item: CapturedMedia) => void;
}) {
  return (
    <div className="gallery-item">
      <span className="gallery-item-type">
        <span
          className={`badge ${item.type === "image" ? "badge-cyan" : "badge-red"}`}
        >
          {item.type === "image" ? "📸 IMG" : "🎥 VID"}
        </span>
      </span>
      {item.type === "image" ? (
        <img
          src={item.url}
          alt={`Capture at ${new Date(item.timestamp).toLocaleTimeString()}`}
        />
      ) : (
        <video src={item.url} controls muted loop />
      )}
      <div className="gallery-item-actions">
        <button
          className="btn btn-sm btn-primary"
          style={{ fontSize: "0.7rem", padding: "3px 8px" }}
          onClick={() => onDownload(item)}
        >
          ⬇ Save
        </button>
      </div>
    </div>
  );
}

export default function LiveDemo() {
  const cameraRef = useRef<CameraComponentHandles>(null);
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG);
  const [capturedMedia, setCapturedMedia] = useState<CapturedMedia[]>([]);
  const [streamInfo, setStreamInfo] = useState<StreamInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  // true when the user has hard-blocked camera access in the browser (state==='denied').
  // In this case no JS can re-prompt — we must show manual unlock instructions.
  const [permissionDenied, setPermissionDenied] = useState(false);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateConfig = <K extends keyof DemoConfig>(
    key: K,
    value: DemoConfig[K],
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleCapture = useCallback((media: CapturedMedia) => {
    setCapturedMedia((prev) => [media, ...prev].slice(0, 20));
    setError(null);
  }, []);

  const handleStreamStart = useCallback((info: StreamInfo) => {
    setStreamInfo(info);
    setIsStreaming(true);
    setIsStartingCamera(false);
    setError(null);
  }, []);

  const handleError = useCallback((err: Error) => {
    const isPermissionError =
      err.name === "NotAllowedError" || err.name === "PermissionDeniedError";

    if (isPermissionError) {
      // Use the Permissions API to distinguish:
      //   'denied'  → user hard-blocked — browser won't re-prompt, must guide to settings
      //   'prompt'  → user just dismissed the popup — Retry will re-ask
      //   unsupported (Firefox) → treat as dismissable, let retry attempt
      const checkPermission = async () => {
        try {
          const status = await navigator.permissions.query({
            name: "camera" as PermissionName,
          });
          if (status.state === "denied") {
            setPermissionDenied(true);
            setError(
              "Camera access is blocked. Follow the steps below to allow it.",
            );
          } else {
            // 'prompt' or 'granted' (edge-case) — a retry call will show the dialog
            setPermissionDenied(false);
            setError(
              "Camera permission was dismissed. Click Retry to request access again.",
            );
          }
        } catch {
          // Permissions API not supported (e.g. Firefox) — show a generic retry message
          setPermissionDenied(false);
          setError(
            "Camera permission was denied. Click Retry, or check your browser's site settings.",
          );
        }
      };
      checkPermission();
    } else {
      setPermissionDenied(false);
      setError(err.message);
    }

    setIsStreaming(false);
    setIsRecording(false);
    setIsStartingCamera(false);
  }, []);

  const handleStartStream = async () => {
    setError(null);
    setIsStartingCamera(true);
    await cameraRef.current?.startStream();
  };

  // Retry: remounts the CameraComponent (key bump) so the browser issues a fresh
  // getUserMedia call. This works when permission state is 'prompt' (user dismissed
  // the popup). It has no effect when state is 'denied' — we show instructions instead.
  const handleRetry = () => {
    setError(null);
    setPermissionDenied(false);
    setIsStreaming(false);
    setIsStartingCamera(config.autoPlayOnStart);
  };

  const handleStopStream = () => {
    cameraRef.current?.stopStream();
    setIsStreaming(false);
    setStreamInfo(null);
    if (isRecording) handleStopRecording();
  };

  const handleCaptureImage = () => {
    if (!isStreaming) return;
    cameraRef.current?.captureImage();
  };

  const handleStartRecording = () => {
    if (!isStreaming) return;
    cameraRef.current?.startRecording();
    setIsRecording(true);
    setRecordingTime(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime((t) => t + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    cameraRef.current?.stopRecording();
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setRecordingTime(0);
  };

  const handleToggleRecording = () => {
    if (isRecording) handleStopRecording();
    else handleStartRecording();
  };

  const handleSwitchCamera = () => {
    cameraRef.current?.switchCamera();
    updateConfig(
      "facingMode",
      config.facingMode === "user" ? "environment" : "user",
    );
  };

  const handleDownload = (item: CapturedMedia) => {
    const a = document.createElement("a");
    a.href = item.url;
    const ext =
      item.type === "image"
        ? config.imageFormat.split("/")[1] // png | jpeg | webp
        : "webm";
    a.download = `capture-${item.timestamp}.${ext}`;
    a.click();
  };

  const handleClearGallery = () => {
    capturedMedia.forEach((item) => URL.revokeObjectURL(item.url));
    setCapturedMedia([]);
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section className="section" id="demo">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>🎬</span> Interactive Playground
          </div>
          <h2 className="section-title">
            Try it <span className="text-gradient">Live</span>
          </h2>
          <p className="section-subtitle">
            A fully functional camera powered by{" "}
            <code
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-secondary)",
              }}
            >
              react-camera-component
            </code>
            . Tweak every prop in real time.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Camera Viewport */}
          <div className={styles.viewport}>
            <div className={styles.cameraWrap}>
              {/* Status bar */}
              <div className={styles.statusBar}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    className={`status-dot ${isStreaming ? (isRecording ? "recording" : "active") : "inactive"}`}
                  />
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {isRecording
                      ? `🔴 REC ${formatTime(recordingTime)}`
                      : isStreaming
                        ? "● LIVE"
                        : "○ Stopped"}
                  </span>
                </div>
                {streamInfo && (
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {streamInfo.width}×{streamInfo.height}
                  </span>
                )}
              </div>

              {/* Camera component renders here */}
              <div
                className={styles.cameraContainer}
                style={{
                  background: isStreaming ? "#000" : "var(--bg-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CameraComponent
                  ref={cameraRef}
                  autoPlayOnStart={config.autoPlayOnStart}
                  facingMode={config.facingMode}
                  maxVideoDuration={config.maxVideoDuration}
                  imageFormat={config.imageFormat}
                  imageQuality={config.imageQuality}
                  displayStream={config.displayStream}
                  captureAudio={config.captureAudio}
                  frameRate={config.frameRate}
                  width={config.width}
                  height={config.height}
                  onCapture={handleCapture}
                  onStreamStart={handleStreamStart}
                  onError={handleError}
                  containerClassName={styles.cameraInner}
                />

                {!isStreaming && !error && (
                  <div className={styles.placeholder}>
                    <div className={styles.placeholderIcon}>📷</div>
                    <p>Camera stream not active</p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginTop: "4px",
                      }}
                    >
                      Grant permission and click Start Camera
                    </p>
                  </div>
                )}

                {error && (
                  <div className={styles.errorOverlay}>
                    <span style={{ fontSize: "2rem" }}>
                      {permissionDenied ? "🔒" : "⚠️"}
                    </span>
                    <p style={{ fontWeight: 600, marginBottom: 4 }}>
                      {permissionDenied ? "Camera Blocked" : "Camera Error"}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        marginBottom: permissionDenied ? 10 : 0,
                      }}
                    >
                      {error}
                    </p>

                    {permissionDenied ? (
                      // Hard-blocked: no JS can re-prompt, guide the user to browser settings
                      <ol
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-secondary)",
                          textAlign: "left",
                          paddingLeft: "1.2rem",
                          lineHeight: 1.7,
                          margin: "0 0 12px",
                        }}
                      >
                        <li>
                          Click the <strong>lock 🔒</strong> or{" "}
                          <strong>camera 📷</strong> icon in your browser's
                          address bar
                        </li>
                        <li>
                          Set <strong>Camera</strong> to <strong>Allow</strong>
                        </li>
                        <li>Reload the page, then try again</li>
                      </ol>
                    ) : (
                      // Dismissed (not hard-blocked): Retry will call getUserMedia again
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: 12 }}
                        onClick={handleRetry}
                      >
                        Retry
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Primary controls */}
              <div className={styles.controls}>
                {!isStreaming || error ? (
                  <button
                    className="btn btn-primary"
                    onClick={handleStartStream}
                    disabled={isStartingCamera}
                    id="demo-start-stream"
                  >
                    {isStartingCamera ? "⏳ Starting…" : "▶ Start Camera"}
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={handleStopStream}
                    id="demo-stop-stream"
                  >
                    ■ Stop Camera
                  </button>
                )}

                <button
                  className="btn btn-secondary"
                  onClick={handleCaptureImage}
                  disabled={!isStreaming || !!error}
                  id="demo-capture-image"
                  title="Capture Image"
                >
                  📸 Photo
                </button>

                <button
                  className={`btn ${isRecording ? "btn-danger" : "btn-secondary"}`}
                  onClick={handleToggleRecording}
                  disabled={!isStreaming || !!error}
                  id="demo-toggle-recording"
                  title={isRecording ? "Stop Recording" : "Start Recording"}
                >
                  {isRecording
                    ? `⏹ Stop ${formatTime(recordingTime)}`
                    : "🎥 Record"}
                </button>

                <button
                  className="btn btn-secondary btn-icon"
                  onClick={handleSwitchCamera}
                  disabled={!isStreaming || !!error}
                  id="demo-switch-camera"
                  title="Switch Camera"
                >
                  🔄
                </button>
              </div>
            </div>

            {/* Gallery */}
            {capturedMedia.length > 0 && (
              <div className={styles.gallery}>
                <div className={styles.galleryHeader}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Gallery ({capturedMedia.length})
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleClearGallery}
                    id="demo-clear-gallery"
                  >
                    Clear
                  </button>
                </div>
                <div className="gallery-grid">
                  {capturedMedia.map((item, i) => (
                    <GalleryItem
                      key={`${item.timestamp}-${i}`}
                      item={item}
                      onDownload={handleDownload}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Config Panel */}
          <aside className={styles.configPanel}>
            <div className={styles.panelHeader}>
              <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                ⚙️ Props Config
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setConfig(DEFAULT_CONFIG)}
                id="demo-reset-config"
              >
                Reset
              </button>
            </div>

            <div className={styles.configGroups}>
              {/* Boolean toggles */}
              <div className={styles.configGroup}>
                <div className={styles.groupLabel}>Behavior</div>

                <div className={styles.configRow}>
                  <div>
                    <div className={styles.configRowLabel}>autoPlayOnStart</div>
                    <div className={styles.configRowDesc}>
                      Start stream on mount
                    </div>
                  </div>
                  <Toggle
                    id="cfg-autoplay"
                    checked={config.autoPlayOnStart}
                    onChange={(v) => updateConfig("autoPlayOnStart", v)}
                  />
                </div>

                <div className={styles.configRow}>
                  <div>
                    <div className={styles.configRowLabel}>displayStream</div>
                    <div className={styles.configRowDesc}>Show video feed</div>
                  </div>
                  <Toggle
                    id="cfg-display"
                    checked={config.displayStream}
                    onChange={(v) => updateConfig("displayStream", v)}
                  />
                </div>

                <div className={styles.configRow}>
                  <div>
                    <div className={styles.configRowLabel}>captureAudio</div>
                    <div className={styles.configRowDesc}>
                      Record mic with video
                    </div>
                  </div>
                  <Toggle
                    id="cfg-audio"
                    checked={config.captureAudio}
                    onChange={(v) => updateConfig("captureAudio", v)}
                  />
                </div>
              </div>

              {/* Select inputs */}
              <div className={styles.configGroup}>
                <div className={styles.groupLabel}>Camera</div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cfg-facing">
                    facingMode
                  </label>
                  <select
                    id="cfg-facing"
                    className="form-select"
                    value={config.facingMode}
                    onChange={(e) =>
                      updateConfig(
                        "facingMode",
                        e.target.value as "user" | "environment",
                      )
                    }
                  >
                    <option value="user">user (front)</option>
                    <option value="environment">environment (rear)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cfg-format">
                    imageFormat
                  </label>
                  <select
                    id="cfg-format"
                    className="form-select"
                    value={config.imageFormat}
                    onChange={(e) =>
                      updateConfig(
                        "imageFormat",
                        e.target.value as DemoConfig["imageFormat"],
                      )
                    }
                  >
                    <option value="image/png">image/png</option>
                    <option value="image/jpeg">image/jpeg</option>
                    <option value="image/webp">image/webp</option>
                  </select>
                </div>
              </div>

              {/* Sliders */}
              <div className={styles.configGroup}>
                <div className={styles.groupLabel}>Quality & Resolution</div>

                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="cfg-quality"
                    style={{
                      opacity: config.imageFormat === "image/png" ? 0.45 : 1,
                    }}
                  >
                    imageQuality
                    <span className={styles.configVal}>
                      {config.imageQuality.toFixed(2)}
                    </span>
                  </label>
                  <input
                    id="cfg-quality"
                    type="range"
                    className="form-range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={config.imageQuality}
                    disabled={config.imageFormat === "image/png"}
                    onChange={(e) =>
                      updateConfig("imageQuality", parseFloat(e.target.value))
                    }
                    style={{
                      opacity: config.imageFormat === "image/png" ? 0.35 : 1,
                      cursor:
                        config.imageFormat === "image/png"
                          ? "not-allowed"
                          : "pointer",
                    }}
                  />
                  {config.imageFormat === "image/png" && (
                    <div className={styles.qualityNote}>
                      ⚠️ PNG is lossless — <code>imageQuality</code> has no
                      effect. Switch to <strong>jpeg</strong> or{" "}
                      <strong>webp</strong> to control file size.
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cfg-fps">
                    frameRate
                    <span className={styles.configVal}>
                      {config.frameRate} fps
                    </span>
                  </label>
                  <input
                    id="cfg-fps"
                    type="range"
                    className="form-range"
                    min="15"
                    max="60"
                    step="5"
                    value={config.frameRate}
                    onChange={(e) =>
                      updateConfig("frameRate", parseInt(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cfg-width">
                    width
                    <span className={styles.configVal}>{config.width}px</span>
                  </label>
                  <input
                    id="cfg-width"
                    type="range"
                    className="form-range"
                    min="320"
                    max="3840"
                    step="160"
                    value={config.width}
                    onChange={(e) =>
                      updateConfig("width", parseInt(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cfg-height">
                    height
                    <span className={styles.configVal}>{config.height}px</span>
                  </label>
                  <input
                    id="cfg-height"
                    type="range"
                    className="form-range"
                    min="240"
                    max="2160"
                    step="120"
                    value={config.height}
                    onChange={(e) =>
                      updateConfig("height", parseInt(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cfg-duration">
                    maxVideoDuration
                    <span className={styles.configVal}>
                      {config.maxVideoDuration / 1000}s
                    </span>
                  </label>
                  <input
                    id="cfg-duration"
                    type="range"
                    className="form-range"
                    min="5000"
                    max="300000"
                    step="5000"
                    value={config.maxVideoDuration}
                    onChange={(e) =>
                      updateConfig("maxVideoDuration", parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              {/* Live code preview */}
              <div className={styles.configGroup}>
                <div className={styles.groupLabel}>Generated Code</div>
                <div className={styles.liveCode}>
                  <pre className={styles.liveCodePre}>{`<CameraComponent
  facingMode="${config.facingMode}"
  imageFormat="${config.imageFormat}"
  imageQuality={${config.imageQuality}}
  frameRate={${config.frameRate}}
  width={${config.width}}
  height={${config.height}}
  maxVideoDuration={${config.maxVideoDuration}}
  captureAudio={${config.captureAudio}}
  displayStream={${config.displayStream}}
  autoPlayOnStart={${config.autoPlayOnStart}}
  onCapture={handleCapture}
  onStreamStart={handleStreamStart}
  onError={handleError}
/>`}</pre>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
