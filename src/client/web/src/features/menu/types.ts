export type ItemTagResponse = {
  id: number;
  value: string;
  color: string;
};

export type MenuItemResponse = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  displayOrder: number;
  imageUrl: string | null;
  tags: ItemTagResponse[];
};

export type MenuCategoryResponse = {
  id: number;
  slug: string;
  displayName: string;
  description: string;
  displayOrder: number;
  items: MenuItemResponse[];
};

export type MenuPageData = {
  categories: MenuCategoryResponse[];
  updatedLabel: string;
};
