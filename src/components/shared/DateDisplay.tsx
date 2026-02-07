import { formatDate, formatRelativeTime } from "@/lib/format";

interface DateDisplayProps {
  date: string;
  relative?: boolean;
  className?: string;
}

export function DateDisplay({ date, relative = false, className = "" }: DateDisplayProps) {
  return (
    <time dateTime={date} className={className}>
      {relative ? formatRelativeTime(date) : formatDate(date)}
    </time>
  );
}
