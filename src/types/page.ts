export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort?: Sort;
};

export type Page<T> = {
  content: T[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  totalElements?: number;
  totalPages?: number;

  pageable?: Pageable;
  sort?: Sort;
};
