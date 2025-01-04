export function formatToTimeAgo(date: Date): string {
  const hours = 60 * 60;
  const days = 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / (60 * 1000));
  const formatter = new Intl.RelativeTimeFormat("ko");

  let unit: "days" | "hours" | "minutes" = "minutes";
  let res = diff;

  if (diff / days > 1) {
    unit = "days";
    res = Math.floor(diff / days);
  } else if (diff / hours > 1) {
    unit = "hours";
    res = Math.floor(diff / hours);
  }

  return formatter.format(res, unit);
}

export const PER_PAGE = 60;
