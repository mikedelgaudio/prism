import { makeAutoObservable } from "mobx";

export interface IRawUploadedSide {
  trackingStartTime: number;
  trackingEndTime: number;
}
export interface IRawUploadedDay {
  uploadDate: number;
  side1: IRawUploadedSide[];
  side2: IRawUploadedSide[];
  side3: IRawUploadedSide[];
  side4: IRawUploadedSide[];
  side5: IRawUploadedSide[];
  lastUploadDate: number;
}

interface IDayChartBreakdown {
  side1: number[];
  side2: number[];
  side3: number[];
  side4: number[];
  side5: number[];
}

// Ideal data format

export class DashboardStore {
  // Such as translate date to "1/4/23"
  private readonly DATE_FORMAT = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
  });

  public dayView = true;

  public raw_data: IRawUploadedDay[] = [
    {
      uploadDate: 1672885784803,
      side1: [
        {
          trackingStartTime: 1672885784803,
          trackingEndTime: 1672887451432,
        },
        {
          trackingStartTime: 1672885784803,
          trackingEndTime: 1672887451432,
        },
        {
          trackingStartTime: 1672885784803,
          trackingEndTime: 1672887451432,
        },
      ],
      side2: [],
      side3: [],
      side4: [],
      side5: [],
      lastUploadDate: 1670378682337,
    },
  ];

  public dayChartBreakdown: IDayChartBreakdown = {
    side1: new Array(24).fill(0),
    side2: new Array(24).fill(0),
    side3: new Array(24).fill(0),
    side4: new Array(24).fill(0),
    side5: new Array(24).fill(0),
  };

  constructor() {
    makeAutoObservable(this);
  }

  get rawData(): IRawUploadedDay[] {
    return this.raw_data;
  }

  changeView() {
    this.dayView = !this.dayView;
  }

  distributeTimeLoad(sideSlot: number[]) {
    const MINUTES_IN_HOUR = 60;
    for (let i = 0; i < sideSlot.length; i++) {
      const slot = sideSlot[i];
      if (sideSlot[i] > MINUTES_IN_HOUR) {
        const remainder =
          slot >= MINUTES_IN_HOUR
            ? Math.abs(slot - MINUTES_IN_HOUR)
            : slot % MINUTES_IN_HOUR;

        sideSlot[i] = 60;

        if (i + 1 < 24) sideSlot[i + 1] += remainder;
      }
    }
  }
}
