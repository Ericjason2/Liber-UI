export function updateUrlQueryParams(
  entries: Record<string, string | number | undefined | null>
): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(entries)) {
    if (val === undefined || val === null) continue;
    const str = String(val).trim();
    if (
      !str ||
      str === "all" ||
      str === "All" ||
      (key === "page" && str === "1")
    ) {
      continue;
    }
    params.set(key, str);
  }
  const qs = params.toString();
  const hash = window.location.hash || "";
  const nextUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}${hash}`;
  window.history.replaceState(null, "", nextUrl);
}
