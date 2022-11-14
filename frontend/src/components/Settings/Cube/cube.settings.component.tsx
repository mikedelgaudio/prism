import { observer } from "mobx-react";
import { Card } from "../../Shared";

const Cube = observer(() => {
  return (
    <Card className="gap-6">
      <div>
        <h2 className="font-bold text-3xl">Modify cube</h2>
        <p>Update what each side of the cube tracks</p>
      </div>

      <ul className="flex flex-col gap-2">
        <li className="flex justify-between items-center p-6 bg-slate-100 rounded-xl ">
          <div className="flex gap-6 items-center text-lg ">
            <span className="font-bold text-2xl">1</span> Study for Chemical
            Engineering{" "}
          </div>
          <button className="p-3 rounded-xl hover:bg-slate-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[10px] md:w-[20px]"
              aria-hidden={true}
              viewBox="0 0 512 512"
            >
              <path d="m421.7 220.3-11.3 11.3-22.6 22.6-205 205c-6.6 6.6-14.8 11.5-23.8 14.1L30.8 511c-8.4 2.5-17.5.2-23.7-6.1s-8.6-15.2-6.1-23.7l37.7-128.1c2.6-9 7.5-17.2 14.1-23.8l205-205 22.6-22.6 11.3-11.3 33.9 33.9 62.1 62.1 33.9 33.9zM96 353.9l-9.3 9.3c-.9.9-1.6 2.1-2 3.4l-25.3 86 86-25.3c1.3-.4 2.5-1.1 3.4-2l9.3-9.3H112c-8.8 0-16-7.2-16-16v-46.1zM453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-14.5 14.5-22.6 22.6-11.3 11.3-33.9-33.9-62.1-62.1-34-33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 65.5-25 90.5 0z" />
            </svg>
          </button>
        </li>
      </ul>
    </Card>
  );
});

export { Cube };
