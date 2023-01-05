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

// export interface IUploadedDay {
//   date: 1672885784803,

// }

export class DashboardStore {
  // Such as translate date to "1/4/23"
  private readonly DATE_FORMAT = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
  });

  public dayView = true;

  public data: IRawUploadedDay[] = [
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

  constructor() {
    makeAutoObservable(this);
  }

  changeView() {
    this.dayView = !this.dayView;
  }

  collectToday() {
    // If uploadDate is within today track as today

    // ! Does this logic belong in backend?
    this.data.forEach(day => {
      const uploadDate = this.DATE_FORMAT?.format(day?.uploadDate);
      const lastUploadDate = this.DATE_FORMAT?.format(day?.lastUploadDate);

      if (uploadDate === lastUploadDate) {
        // Then it is the same day so add up
      }
    });
  }
}

// DATA FLOW
// CUBE TRACKS EACH SIDE
//
