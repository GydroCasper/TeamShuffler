export const getNextFriday = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const daysTillNextFriday = (5 - currentDay + 7) % 7 || 7;
  today.setDate(today.getDate() + daysTillNextFriday);
  return today;
};
