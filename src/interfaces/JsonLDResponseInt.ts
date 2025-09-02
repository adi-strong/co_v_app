interface DataViewType {
  '@id': string;
  first: string;
  last: string;
}

export interface JsonLDResponseInt<T = object, V = DataViewType> {
  totalItems: number;
  view?: V | null;
  member: T[];
}
