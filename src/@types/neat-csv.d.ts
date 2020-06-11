declare namespace neatCsv {
  export interface Row {
    title: string;
    type: 'income' | 'outcome';
    category: string;
    value: number;
  }
}
