import { useEffect, useState } from "react";

// Evergreen countdown that resets every day (counts down to the next local midnight)
export function useDailyCountdown() {
  const getRemaining = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(24, 0, 0, 0); // next midnight
    let diff = Math.max(0, end - now);
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);
    return { hours, minutes, seconds };
  };

  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const pad = (n) => String(n).padStart(2, "0");

export function CountdownUnits({ compact = false }) {
  const { hours, minutes, seconds } = useDailyCountdown();
  const units = [
    { label: "Hrs", value: pad(hours) },
    { label: "Min", value: pad(minutes) },
    { label: "Sec", value: pad(seconds) },
  ];
  return (
    <div className="flex items-center gap-2" data-testid="countdown-timer">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2">
          <div
            className={`flex flex-col items-center justify-center rounded-md bg-[#D4AF37] text-[#0A192F] font-display font-bold tabular-nums ${
              compact ? "px-2 py-0.5 min-w-[34px]" : "px-3 py-1.5 min-w-[52px]"
            }`}
          >
            <span className={compact ? "text-sm leading-none" : "text-xl leading-none"}>
              {u.value}
            </span>
            {!compact && (
              <span className="text-[9px] uppercase tracking-wider opacity-70">{u.label}</span>
            )}
          </div>
          {i < units.length - 1 && (
            <span className={`text-[#D4AF37] font-bold ${compact ? "text-sm" : "text-xl"}`}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
