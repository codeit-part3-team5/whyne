export function timeForToday(dateString: string): string {
  const today = new Date();
  const timeValue = new Date(dateString);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) return `${betweenTime}분 전`;

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 7) return `${betweenTimeDay}일 전`;
  if (betweenTimeDay < 365) {
    return timeValue.toLocaleDateString("ko", {
      month: "long",
      day: "numeric",
    });
  }

  return timeValue.toLocaleDateString("ko", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
