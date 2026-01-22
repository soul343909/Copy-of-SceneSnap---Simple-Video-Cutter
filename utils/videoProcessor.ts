import { SceneTimestamp, ProcessedScene } from "../types";

/**
 * Seeks a video element to specific times and captures frames.
 */
export const extractFramesFromVideo = async (
  videoUrl: string,
  scenes: SceneTimestamp[],
  onProgress: (percent: number) => void
): Promise<ProcessedScene[]> => {
  
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;

    const processedScenes: ProcessedScene[] = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
      reject(new Error("Could not create drawing context"));
      return;
    }

    video.onloadedmetadata = async () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      try {
        for (let i = 0; i < scenes.length; i++) {
          const scene = scenes[i];
          
          // Update progress
          onProgress(Math.round(((i) / scenes.length) * 100));

          // 1. Capture Start Frame
          // Add a small buffer (0.1s) to avoid black frames at exact 0.0 or cut points
          let seekTimeStart = scene.startTime + 0.1;
          if (seekTimeStart >= video.duration) seekTimeStart = video.duration - 0.1;
          
          await seekToTime(video, seekTimeStart);
          const startUrl = captureFrame(video, canvas, ctx);

          // 2. Capture End Frame
          // Subtract a small buffer to avoid grabbing the next scene
          let seekTimeEnd = scene.endTime - 0.1;
          if (seekTimeEnd <= scene.startTime) seekTimeEnd = scene.startTime + 0.1;
           if (seekTimeEnd >= video.duration) seekTimeEnd = video.duration - 0.1;

          await seekToTime(video, seekTimeEnd);
          const endUrl = captureFrame(video, canvas, ctx);

          processedScenes.push({
            id: scene.sceneNumber,
            startFrameUrl: startUrl,
            endFrameUrl: endUrl,
            description: scene.description
          });
        }
        
        onProgress(100);
        resolve(processedScenes);
      } catch (e) {
        reject(e);
      } finally {
        // Cleanup
        video.src = "";
        video.remove();
      }
    };

    video.onerror = () => {
      reject(new Error("Could not load video for processing."));
    };
  });
};

const seekToTime = (video: HTMLVideoElement, time: number): Promise<void> => {
  return new Promise((resolve) => {
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked);
      resolve();
    };
    video.addEventListener('seeked', onSeeked);
    video.currentTime = time;
  });
};

const captureFrame = (
  video: HTMLVideoElement, 
  canvas: HTMLCanvasElement, 
  ctx: CanvasRenderingContext2D
): string => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw video frame
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  // Return as JPEG for reasonable quality/size balance
  return canvas.toDataURL('image/jpeg', 0.9);
};