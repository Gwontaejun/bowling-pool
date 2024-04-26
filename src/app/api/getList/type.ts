export interface ChiltenResDataType {
  id: number;
  title: string;
  keyword: string;
  preview: string;
  hit: number;
  regDate: string;
  filePath: string;
}

export interface SearchDataType {
  id?: number;
  platform: number;
  link: string;
  title: string;
  image: string;
  date?: number;
}
