import { observer } from "mobx-react";
import { FormEvent, useState } from "react";
import { errorToMsg } from "../../../services/errors.service";
import { TOAST_SERVICE } from "../../../services/toast.service";
import { Card } from "../../Shared";

const OnboardingCube = observer(() => {
  const [prismId, setPrismId] = useState("");
  const [loading, setLoading] = useState(false);

  // const mutation = useMutation((newPrismId: string) => {});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.warn("Submit");
    } catch (e: any) {
      const TOAST_ID = "FAILED_TO_REGISTER_NEW_PRISM";
      TOAST_SERVICE.error(TOAST_ID, errorToMsg(e), true);
    }
    setPrismId("");
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  };

  return (
    <Card className="gap-6">
      <form className="flex flex-col gap-8 pt-3" onSubmit={handleSubmit}>
        <div className="border-b-2 pb-3 border-slate-500">
          <h2 className="font-bold text-3xl">Register your Prism</h2>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 leading-3">
            <label className="required" htmlFor="serial">
              Serial number
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="serial"
              type={"text"}
              required={true}
              placeholder="XXXX-XXXX-XXXX"
              onChange={e => setPrismId(e.target.value)}
            />
          </div>
        </div>
        <button
          className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          Register
        </button>
      </form>
    </Card>
  );
});

export { OnboardingCube };
