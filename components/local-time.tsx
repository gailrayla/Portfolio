"use client";

import { useEffect, useState } from "react";

/** Live local time for the footer's location line. */
export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone,
    });
    const update = (): void => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return <span>{time || "—"}</span>;
}
