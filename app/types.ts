export interface ImageRequestI {
  id: string;
  album: string;
  originalName: string;
  url: string;
  lastChange: string;
  history: HistoryI[];
}

export interface HistoryI {
  status: string;
  timeStamp: Date | string | number;
}

export interface SavedImageI {
  id: number;
  album: string;
  originalName: string;
  url: string;
  description: string;
  extension: string;
  tags: string[];
  localization: string | null;
}

export interface RegisterUsetDataI {
  name: string;
  email: string;
  password: string;
}
