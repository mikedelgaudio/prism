import { observer } from "mobx-react-lite";
import { useState } from "react";

const CubeTaskItem = observer(() => {
  const [editing, setEditing] = useState(false);

  // ! Disable Delete when Assigned to Side of Cube
  // ! Add task should create a new entry but not push to DB until saving

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

  const taskEditField = (
    <div className="flex flex-col gap-2 leading-3">
      <label className="required" htmlFor="email">
        Task Name
      </label>
      <input
        className="border border-slate-400 p-2 rounded-md"
        id="email"
        type={"email"}
        required={true}
        placeholder="Study for Chemical Engineering"
      />
    </div>
  );

  const taskLabel = (
    <h4 className="font-bold text-lg">Study for Chemical Engineering</h4>
  );

  return (
    <li
      className="flex gap-4 p-6 justify-between items-center bg-slate-100 rounded-xl"
      aria-expanded={false}
    >
      {editing ? taskEditField : taskLabel}

      <div className="flex gap-1">
        <button
          aria-label="Reset Prism Side 1"
          className="p-3 rounded-xl hover:bg-slate-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[20px]"
            aria-hidden={true}
            viewBox="0 0 448 512"
          >
            <path d="M160 400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16v208zm80 0c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16v208zm80 0c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16v208zm-2.5-375.06L354.2 80H424c13.3 0 24 10.75 24 24 0 13.3-10.7 24-24 24h-8v304c0 44.2-35.8 80-80 80H112c-44.18 0-80-35.8-80-80V128h-8c-13.25 0-24-10.7-24-24 0-13.25 10.75-24 24-24h69.82l36.68-55.06C140.9 9.357 158.4 0 177.1 0h93.8c18.7 0 36.2 9.358 46.6 24.94zM151.5 80h145l-19-28.44c-1.5-2.22-4-3.56-6.6-3.56h-93.8c-2.6 0-6 1.34-6.6 3.56L151.5 80zM80 432c0 17.7 14.33 32 32 32h224c17.7 0 32-14.3 32-32V128H80v304z" />
          </svg>
        </button>

        {editing ? editBtn : saveBtn}
      </div>
    </li>
  );
});

export { CubeTaskItem };
