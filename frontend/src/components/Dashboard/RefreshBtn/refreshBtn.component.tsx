import { observer } from "mobx-react";
import { useQuery } from "react-query";
import { API_URL, getRequest } from "../../../services/api.service";

const RefreshBtn = observer(() => {
  const query = useQuery(
    "calculateProfileOnClick",
    async () => {
      await getRequest(`${API_URL}/dashboards/calculate`);
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleClick = () => {
    query.refetch();
  };

  return (
    <button
      className="flex items-center justify-center rounded-xl border border-slate-900 py-1 px-2 text-base lg:text-xl font-semibold leading-7 transition-all duration-200 hover:bg-transparent hover:bg-slate-900 hover:text-white focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-white"
      disabled={query.isFetching}
      onClick={handleClick}
    >
      {query.isFetching ? "Loading..." : "Check for new data"}
    </button>
  );
});

export { RefreshBtn };
