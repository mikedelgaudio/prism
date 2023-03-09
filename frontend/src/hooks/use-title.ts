import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} - Prism Productivity Smart Cube`;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
