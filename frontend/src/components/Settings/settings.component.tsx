import { observer } from "mobx-react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useTitle } from "../../hooks/use-title";
import { Loading } from "../Shared";
import { Account } from "./Account/account.settings.component";
import { Cube } from "./Cube/cube.settings.component";
import { OnboardingCube } from "./OnboardingCube";
import { SettingsContext } from "./settings.context";

const Settings = observer(() => {
  useTitle("Settings");

  const { settingsStore } = useContext(SettingsContext);

  const { data, status, refetch } = useQuery(
    "loadProfileSettings",
    async () => {
      await settingsStore.getProfile();
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const renderCards = (
    <>
      {settingsStore?.profile?.prismId ? <Cube /> : <OnboardingCube />}
      <Account />
    </>
  );

  return (
    <div className="relative py-6 bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col gap-6 border-b-2 pb-6 border-slate-500 md:gap-0 md:flex-row md:justify-between md:items-center">
          <div className="leading-3">
            <small className="font-bold pl-1 uppercase tracking-widest">
              SETTINGS
            </small>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
              Customization
            </h1>
          </div>
        </div>

        <div className="flex flex-col pt-6 gap-6">
          {status === "success" ? renderCards : <Loading />}
        </div>
      </div>
    </div>
  );
});

export { Settings };
