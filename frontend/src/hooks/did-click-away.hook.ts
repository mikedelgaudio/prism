import { Dispatch, SetStateAction, useEffect } from "react";

const didClickAway = (
  ref: any,
  editing: boolean,
  setEditing: Dispatch<SetStateAction<boolean>>,
) => {
  useEffect(() => {
    // Save if clicks out of personCard
    function handleClickOutside(event: any) {
      if (editing && ref.current && !ref.current.contains(event.target)) {
        setEditing(false);
      }
    }

    // Bind the event listener
    if (editing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, editing]);
};

export { didClickAway };
