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

// function to determing the status of the item base on interger value
export function DetermingOrderStatus({ status }) {
  if (status === 1) {
    return "Processing";
  } else if (status === 2) {
    return "Out for Delivery";
  } else if (status === 3) {
    return "Order Delivered";
  } else if (status === 4) {
    return "Order Cancelled";
  } else {
    return "Processing";
  }
}

/**
 * Converts a given date string to a readable date string.
 *
 * @param {string} dateString - The date string in the format "YYYY-MM-DDTHH:mm:ss.sssZ"
 * @returns {string} - The readable date string in the format "Month Day, Year Hour:Minute:Second Time Zone"
 */
export function convertToReadableDate(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",

    timeZoneName: "short",
  };

  const readableDate = date.toLocaleString("en-US", options);

  return readableDate;
}

// Example usage:
