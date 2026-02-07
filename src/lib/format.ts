const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = MONTHS_ES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = MONTHS_ES[date.getMonth()].slice(0, 3);
  return `${day} ${month}`;
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Ahora";
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  return formatDateShort(dateString);
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min de lectura`;
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export function getCurrentDateFormatted(): string {
  const now = new Date();
  const dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  const dayName = dayNames[now.getDay()];
  const day = now.getDate();
  const month = MONTHS_ES[now.getMonth()];
  const year = now.getFullYear();
  return `${dayName}, ${day} de ${month} de ${year}`;
}
