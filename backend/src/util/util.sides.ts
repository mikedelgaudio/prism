const convertSideName = (sideName: string): string => {
  switch (sideName) {
    case "side1":
    case "side2":
    case "side3":
    case "side4":
    case "side5":
      return sideName;
    default:
      return "N/A";
  }
};

export { convertSideName };
