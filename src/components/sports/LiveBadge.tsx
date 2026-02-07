export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-spng-alert px-2.5 py-0.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
      EN VIVO
    </span>
  );
}
