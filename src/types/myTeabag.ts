export interface MyTeabagItem {
  spaceId: number;
  name: string;
  tastingTypeCode: string;
  lat: number;
  lng: number;
  thumbnailImageUrl: string;
  address: string;
  distanceMeters: number | null;
}

export interface CursorInfo {
  nextCursor: string | null;
  hasNext: boolean;
}

export interface MyTeabagResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    items: MyTeabagItem[];
    cursorInfo: CursorInfo;
  };
}

export interface MyTeabagDeleteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    saved: boolean;
  };
}
