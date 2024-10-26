import bill from "./../assets/bill.png";
import transport from "./../assets/train.png";
import entertainment from "./../assets/cinema.png";
import grocery from "./../assets/grocery.png";
import meal from "./../assets/dinner.png";
import medicine from "./../assets/medicine.png";
import personalized from "./../assets/personalized.png";
import tourism from "./../assets/tourism.png";
import fashion from "./../assets/fashion.png";
import subscription from "./../assets/subscription-model.png";
import defaultImage from "./../assets/default-image.png";
import furniture from "./../assets/sofa.png";
import charity from "./../assets/generous.png";
import savings from "./../assets/piggy-bank.png";
import presents from "./../assets/gift-box.png";
import electronics from "./../assets/recycling.png";
import apartment from "./../assets/apartment.png";

export interface CategoryItem {
  key: number;
  text: string;
  value: string;
}

export const findCategoryByText = (text: string): CategoryItem | undefined => {
  return categoryList.find((item) => item.text === text);
};

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

export const findPaidByByText = (text: string): PaidByItem | undefined => {
  return paidByList.find((item) => item.text === text);
};

export const paidByList: PaidByItem[] = [
  { key: 1, text: "Shalika", value: "Shalika" },
  { key: 2, text: "Malith", value: "Malith" },
  { key: 3, text: "Savings", value: "Savings" },
  { key: 4, text: "Shalika Personal", value: "S Personal" },
  { key: 5, text: "Malith Personal", value: "M Personal" },
];

export const categoryIconsMap: Map<string, string> = new Map([
  ["Meals", meal],
  ["Groceries", grocery],
  ["Medicine", medicine],
  ["Bills", bill],
  ["Entertainment", entertainment],
  ["Transport", transport],
  ["Tours", tourism],
  ["Personal Care", personalized],
  ["Clothes", fashion],
  ["Subscriptions", subscription],
  ["Electronics", electronics],
  ["Furniture", furniture],
  ["Presents", presents],
  ["Charity", charity],
  ["Apartment", apartment],
  ["Savings", savings],
  ["", defaultImage],
]);
