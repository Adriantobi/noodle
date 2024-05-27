export interface spaceInterface {
  id: number;
  title: string;
  link: string;
  category?: categoryInterface;
  categoryName?: string;
  author?: creatorInterface;
  authorId?: number;
}

export interface creatorInterface {
  id: number;
  name: string;
  spaces?: spaceInterface[];
  instagram?: string;
  youtube?: string;
  website?: string;
  twitter?: string;
}

export interface categoryInterface {
  id: number;
  name: string;
  icon: string;
  spaces?: spaceInterface[];
}
