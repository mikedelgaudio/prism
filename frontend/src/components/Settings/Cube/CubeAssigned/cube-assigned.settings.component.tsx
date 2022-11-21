import { observer } from "mobx-react";

const CubeAssigned = observer(() => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col leading-3">
        <h3 className="font-bold text-xl">Assign Tasks to Sides</h3>
        <p>Modify or assign tasks to your Prism</p>
      </div>

      <ol className="flex flex-col">
        <li className="flex gap-4 p-6 justify-between items-center bg-slate-100 rounded-xl">
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center justify-center">
              <small className="text-sm">Side</small>
              <span className="text-2xl font-bold">1</span>
            </div>
            <h4 className="font-bold text-xl">
              Study for Chemical Engineering
            </h4>
          </div>

          {/* <div className="flex items-center justify-center">
            <div className="xl:w-96">
              <select
                className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div> */}
        </li>
      </ol>
    </div>
  );
});

export { CubeAssigned };
