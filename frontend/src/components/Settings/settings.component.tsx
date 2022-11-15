import { observer } from "mobx-react";
import { Helmet } from "react-helmet";
import { Account } from "./Account/account.settings.component";
import { Cube } from "./Cube/cube.settings.component";

const Settings = observer(() => {
  return (
    <>
      <Helmet>
        <title>Settings - Prism</title>
      </Helmet>
      <div id="home" className="relative py-6 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col gap-6 border-b-2 pb-6 border-slate-500 md:gap-0 md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
                Settings
              </h1>
              <p className="pl-1">Tailor the experience the way you like it</p>
            </div>
          </div>

          <div className="flex flex-col pt-6 gap-6">
            <Account />
            <Cube />
          </div>
        </div>
      </div>
    </>
  );
});

export { Settings };
