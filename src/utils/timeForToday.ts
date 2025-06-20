export function timeForToday(dateString: string): string {
  const today = new Date();
  const timeValue = new Date(dateString);
  if (isNaN(timeValue.getTime())) {
    console.warn(`timeForToday: invalid date ${dateString}`);
    return "";
  }

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) return `${betweenTime}분 전`;

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 30) return `${betweenTimeDay}일 전`;

  const betweenTimeMonth = Math.floor(betweenTimeDay / 30);
  if (betweenTimeMonth < 12) return `${betweenTimeMonth}달 전`;

  const betweenTimeYear = Math.floor(betweenTimeDay / 365);
  return `${betweenTimeYear}년 전`;
}
