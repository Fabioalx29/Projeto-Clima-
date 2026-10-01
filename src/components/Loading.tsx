const Bone = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-3xl ${className}`} style={{ background: 'var(--card-strong)' }} />
);

export default function Loading() {
  return (
    <div className="space-y-6" role="status" aria-label="Carregando previsão">
      <Bone className="h-56" />
      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => <Bone key={i} className="h-32" />)}
      </div>
      <Bone className="h-40" />
      <Bone className="h-72" />
    </div>
  );
}
