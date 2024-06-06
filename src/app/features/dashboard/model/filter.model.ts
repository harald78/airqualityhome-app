export interface FilterItem {
  name: string;
  items: string[];
}

export interface FilterEvent {
  name: string;
  item: string;
  mode: 'add' | 'remove';
}
