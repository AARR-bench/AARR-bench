export function Stat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="text-center sm:text-left">
      <div
        className={`font-mono text-3xl font-bold sm:text-4xl ${
          accent ? "text-gradient" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}
