const LoadingGraph = () => {
  return (
    <div className="relative isolate space-y-5 overflow-hidden rounded-2xl p-4 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-gradient-to-r before:from-transparent before:via-slate-200/20 before:to-transparent">
      <div className="h-24 rounded-lg bg-slate-200/10"></div>
      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-slate-200/10"></div>
        <div className="h-3 w-4/5 rounded-lg bg-slate-200/20"></div>
        <div className="h-3 w-2/5 rounded-lg bg-slate-200/20"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { LoadingGraph };
