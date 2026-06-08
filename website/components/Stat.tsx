export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-ink-500">{label}</div>
    </div>
  );
}
