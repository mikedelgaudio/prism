const EmptyCard = () => {
  return (
    <div className="flex flex-col bg-white text-base p-9 rounded-xl shadow-lg">
      <div>
        <small>Day in Review</small>
        <h2 className="font-bold text-2xl">Saturday, November 5, 2022</h2>
        <p className="text-gray-700 font-semibold text-xl">No data</p>
      </div>

      <div className="py-4 flex items-center justify-center">
        <button className="rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-base lg:text-xl font-semibold leading-7 text-white disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:text-white transition-all  duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
          Upload your daily productivity
        </button>
      </div>
    </div>
  );
};

export { EmptyCard };
