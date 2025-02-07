export const dateHelper = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  //Get the time difference in milliseconds
  const timeDiff = now.getTime() - date.getTime();

  //Convert time difference from milliseconds to days
  const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  //Check if the date is today
  if (now.toDateString() === date.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  //Check if the date is within the last week
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  //Otherwise, return the month and day number
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

export const covertToPercentage = (value: number): string => {
  const percentage = Math.ceil(value * 100);

  return `${percentage} %`;
};

export const formatCurrency = (
  value: number,
  toFixed: number = 2,
  showDecimal: boolean = true
): string => {
  // Format the number with the specified decimal points
  const formattedNumber = showDecimal
    ? value.toFixed(toFixed)
    : Math.round(value).toString();

  // Split the number into integer and decimal parts
  const parts = formattedNumber.split(".");
  const integerPartWithSpaces = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Construct the formatted string
  const formattedString =
    showDecimal && parts[1]
      ? `${integerPartWithSpaces}.${parts[1]} kr`
      : `${integerPartWithSpaces} kr`;

  return formattedString;
};

export const formatValue = (
  value: number,
  toFixed: number = 0,
  showDecimal: boolean = true,
  unit: string = ""
): string => {
  // Format the number with the specified decimal points
  const formattedNumber = showDecimal
    ? value.toFixed(toFixed)
    : Math.round(value).toString();

  // Split the number into integer and decimal parts
  const parts = formattedNumber.split(".");
  const integerPartWithSpaces = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Construct the formatted string
  const formattedString =
    showDecimal && parts[1]
      ? `${integerPartWithSpaces}.${parts[1]}${unit ? ` ${unit}` : ""}`
      : `${integerPartWithSpaces}${unit ? ` ${unit}` : ""}`;

  return formattedString;
};

export const formatNumber = (value: number): string => {
  // Convert the number to string and use regex to add spaces as thousand separators
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const handleCopy = (text: string) => {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      return true; // Return success
    })
    .catch((err) => {
      return false; // Return failure
    });
};

export const calculateDaysRemaining = (date: string | Date): string => {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const differenceInTime = targetDate.getTime() - currentDate.getTime();

  // Check if current date is past the target date
  if (differenceInTime < 0) {
    return "Lukket";
  }

  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  // If less than 1 day remaining, show hours and minutes
  if (differenceInDays <= 1) {
    const hours = Math.floor(differenceInTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (differenceInTime % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (hours <= 0 && minutes <= 0) {
      return "Lukket";
    }

    if (hours > 0) {
      return `${hours} time${hours !== 1 ? "r" : ""} og ${minutes} min`;
    }
    return `${minutes} min`;
  }

  return differenceInDays.toString();
};

export const formatStringWithSpacing = (
  value: string,
  spacingPattern: number[]
): string => {
  let result = "";
  let currentIndex = 0;

  // Iterate through the spacing pattern
  for (const spacing of spacingPattern) {
    // Add the next chunk of characters based on the spacing value
    result += value.slice(currentIndex, currentIndex + spacing);
    currentIndex += spacing;

    // Add space if we're not at the end of the string
    if (currentIndex < value.length) {
      result += " ";
    }
  }

  // Add any remaining characters
  if (currentIndex < value.length) {
    result += value.slice(currentIndex);
  }

  return result;
};
