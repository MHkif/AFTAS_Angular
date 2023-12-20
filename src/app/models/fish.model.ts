export interface Fish {
  name: string;
  averageWeight: number;
  level: {};
}

export interface PageFish {
  content: Array<Fish>;
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: boolean;
  empty: boolean;
}
