import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  // Ensure the amount is a number
  const numericAmount =
    typeof amount === "number" ? amount : parseFloat(amount);

  // Check if the amount is a valid number
  if (isNaN(numericAmount)) {
    console.error("Invalid number for formatting currency");
    return "Invalid";
  }

  // Format the number as currency with two decimal places
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GMD", // You can change this to your desired currency code
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);

  return formattedAmount;
}
