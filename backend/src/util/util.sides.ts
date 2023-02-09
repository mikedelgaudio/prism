// ! For demo purposes only
const convertSideNameTemp = (sideName: string): string => {
  switch (sideName) {
    case "Write Code":
      return "side1";
    case "Meetings":
      return "side2";
    case "Write Learn Guide":
      return "side3";
    default:
      return "N/A";
  }
};

export { convertSideNameTemp };
