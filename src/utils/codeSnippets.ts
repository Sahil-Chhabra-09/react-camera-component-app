export const CODE_SNIPPETS = {
  install: `npm install react-camera-component`,

  quickStart: `import { CameraComponent } from "react-camera-component";

function App() {
  const handleCapture = (media) => {
    console.log("Captured:", media);
    // media.type  → "image" | "video"
    // media.url   → Blob URL for preview
    // media.blob  → Raw data for upload
  };

  return (
    <CameraComponent onCapture={handleCapture} />
  );
}`,

  refControl: `import { useRef } from "react";
import {
  CameraComponent,
  CameraComponentHandles,
} from "react-camera-component";

function App() {
  const cameraRef = useRef<CameraComponentHandles>(null);

  return (
    <>
      <CameraComponent
        ref={cameraRef}
        autoPlayOnStart={false}
        captureAudio={true}
      />

      <button onClick={() => cameraRef.current?.startStream()}>
        Start Camera
      </button>
      <button onClick={() => cameraRef.current?.captureImage()}>
        📷 Take Photo
      </button>
      <button onClick={() => cameraRef.current?.toggleRecording()}>
        🎥 Record Video
      </button>
      <button onClick={() => cameraRef.current?.switchCamera()}>
        🔄 Flip Camera
      </button>
    </>
  );
}`,

  uploadServer: `const handleCapture = async (media: CapturedMedia) => {
  const formData = new FormData();
  const ext = media.type === "image" ? "png" : "webm";
  const filename = \`\${media.type}-\${media.timestamp}.\${ext}\`;

  formData.append("file", media.blob, filename);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  console.log("Uploaded:", result.url);
};

<CameraComponent onCapture={handleCapture} />;`,

  highQuality: `// High-quality JPEG capture at 4K
<CameraComponent
  imageFormat="image/jpeg"
  imageQuality={0.95}
  width={3840}
  height={2160}
  frameRate={60}
  onCapture={handleCapture}
/>`,

  rearCamera: `// Rear camera with audio recording, 2-min max
<CameraComponent
  facingMode="environment"
  captureAudio={true}
  maxVideoDuration={120000}
  onCapture={handleCapture}
/>`,

  errorHandling: `const handleError = (error: Error) => {
  switch (error.name) {
    case "NotAllowedError":
      alert("Camera permission denied");
      break;
    case "NotFoundError":
      alert("No camera found on this device");
      break;
    case "NotReadableError":
      alert("Camera is already in use");
      break;
    default:
      console.error("Camera error:", error);
  }
};

<CameraComponent onError={handleError} />;`,
};

export const HIGHLIGHTED = (code: string): string => {
  // Lightweight syntax highlighter using spans
  return code
    // strings
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="hl-string">$1</span>')
    // comments
    .replace(/(\/\/[^\n]*)/g, '<span class="hl-comment">$1</span>')
    // keywords
    .replace(/\b(import|export|from|const|let|var|function|return|async|await|new|type|interface|extends|implements|default|if|else|switch|case|break)\b/g, '<span class="hl-keyword">$1</span>')
    // JSX tags
    .replace(/(&lt;\/?[A-Z][A-Za-z]*)/g, '<span class="hl-tag">$1</span>')
    // numbers
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="hl-number">$1</span>')
    // props/attributes
    .replace(/\b([a-z][a-zA-Z]+)(?==)/g, '<span class="hl-attr">$1</span>');
};
