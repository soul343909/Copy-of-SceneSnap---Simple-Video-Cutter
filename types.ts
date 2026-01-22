export interface SceneTimestamp {
  sceneNumber: number;
  startTime: number;
  endTime: number;
  description: string;
}

export interface ProcessedScene {
  id: number;
  startFrameUrl: string;
  endFrameUrl: string;
  description: string;
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING', // Reading file
  ANALYZING = 'ANALYZING', // Sending to AI
  EXTRACTING = 'EXTRACTING', // Grabbing frames
  DONE = 'DONE',
  ERROR = 'ERROR'
}

export interface VideoData {
  file: File | null;
  url: string | null;
}