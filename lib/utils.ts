export function formatToTimeAgo(date: Date): string {
  const minute = 1000 * 60;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / minute);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "minutes");
}
