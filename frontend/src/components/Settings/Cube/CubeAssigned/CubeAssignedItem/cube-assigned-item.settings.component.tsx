import { observer } from "mobx-react";
import { useState } from "react";

const CubeAssignedItem = observer(() => {
  const [editing, setEditing] = useState(false);

  const editBtn = (
    <button
      className="p-3 rounded-xl hover:bg-slate-200 transition-colors"
      onClick={() => setEditing(prev => (prev = !prev))}
      aria-label="Edit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[20px]"
        aria-hidden={true}
        viewBox="0 0 512 512"
      >
        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
    </button>
  );

  const saveBtn = (
    <button
      className="p-3 rounded-xl hover:bg-slate-200 transition-colors"
      onClick={() => setEditing(prev => (prev = !prev))}
      aria-label="Save"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[20px]"
        aria-hidden={true}
        viewBox="0 0 512 512"
      >
        <path d="m421.7 220.3-11.3 11.3-22.6 22.6-205 205c-6.6 6.6-14.8 11.5-23.8 14.1L30.8 511c-8.4 2.5-17.5.2-23.7-6.1s-8.6-15.2-6.1-23.7l37.7-128.1c2.6-9 7.5-17.2 14.1-23.8l205-205 22.6-22.6 11.3-11.3 33.9 33.9 62.1 62.1 33.9 33.9zM96 353.9l-9.3 9.3c-.9.9-1.6 2.1-2 3.4l-25.3 86 86-25.3c1.3-.4 2.5-1.1 3.4-2l9.3-9.3H112c-8.8 0-16-7.2-16-16v-46.1zM453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-14.5 14.5-22.6 22.6-11.3 11.3-33.9-33.9-62.1-62.1-34-33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 65.5-25 90.5 0z" />
      </svg>
    </button>
  );

  const selectField = (
    <div className="flex flex-col gap-2 leading-3 xl:w-96">
      <label className="required sr-only" htmlFor="email">
        Assigned Task
      </label>
      <select
        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
      >
        <option selected>Study for Chemical Engineering</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  );

  return (
    <li className="flex gap-4 p-6 justify-between items-center bg-slate-100 rounded-xl">
      <div className="flex gap-6 items-center">
        <div className="flex flex-col items-center justify-center">
          <small className="text-sm">Side</small>
          <span className="text-2xl font-bold">1</span>
        </div>

        {editing ? (
          selectField
        ) : (
          <h4 className="font-bold text-xl">Study for Chemical Engineering</h4>
        )}
      </div>

      <div className="flex items-center justify-center gap-6">
        {editing ? editBtn : saveBtn}
      </div>
    </li>
  );
});

export { CubeAssignedItem };
