export interface CategoryItem {
  key: number;
  text: string;
  value: string;
}

export const categoryList: CategoryItem[] = [
  { key: 1, text: "Meals", value: "Meals" },
  { key: 2, text: "Groceries", value: "Groceries" },
  { key: 3, text: "Medicine", value: "Medicine" },
  { key: 4, text: "Subscriptions", value: "Subscriptions" },
  { key: 5, text: "Electronics", value: "Electronics" },
  { key: 6, text: "Personal Care", value: "Personal Care" },
  { key: 7, text: "Bills", value: "Bills" },
  { key: 8, text: "Entertainment", value: "Entertainment" },
  { key: 9, text: "Transport", value: "Transport" },
  { key: 10, text: "Tours", value: "Tours" },
  { key: 11, text: "Furniture", value: "Furniture" },
  { key: 12, text: "Clothes", value: "Clothes" },
  { key: 13, text: "Presents", value: "Presents" },
  { key: 14, text: "Charity", value: "Charity" },
  { key: 15, text: "Apartment", value: "Apartment" },
  { key: 16, text: "Settlements", value: "Settlements" },
  { key: 17, text: "Savings", value: "Savings" },
];

export interface PaidByItem {
  key: number;
  text: string;
  value: string;
}

export const paidByList: PaidByItem[] = [
  { key: 1, text: "Shalika", value: "Shalika" },
  { key: 2, text: "Malith", value: "Malith" },
  { key: 3, text: "Savings", value: "Savings" },
  { key: 4, text: "Shalika Personal", value: "S Personal" },
  { key: 5, text: "Malith Personal", value: "M Personal" },
];
