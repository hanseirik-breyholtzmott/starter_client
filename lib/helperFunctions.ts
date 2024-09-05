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

export const formatCurrency = (value: number): string => {
  const forrmattedNumber = value.toFixed(2);

  const parts = forrmattedNumber.split(".");
  const integerPartWithSpaces = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedString = `${integerPartWithSpaces}.${parts[1]} kr`;

  return formattedString;
};
