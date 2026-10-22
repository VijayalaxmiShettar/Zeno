import type { Station } from "../types/types";

export const stations: Station[] = [
  {
    stationId: 101,
    location: "100 Feet Road, Indiranagar",
    status: "AVAILABLE",
    totalBatteries: 12,
    chargedBatteries: 9,
    currentTxn: null,
  },
  {
    stationId: 102,
    location: "Forum Mall, Koramangala",
    status: "OFFLINE",
    totalBatteries: 12,
    chargedBatteries: 0,
    currentTxn: null,
  },
  {
    stationId: 103,
    location: "ITPL Main Road, Whitefield",
    status: "AVAILABLE",
    totalBatteries: 16,
    chargedBatteries: 13,
    currentTxn: null,
  },
  {
    stationId: 104,
    location: "27th Main Road, HSR Layout",
    status: "AVAILABLE",
    totalBatteries: 12,
    chargedBatteries: 7,
    currentTxn: null,
  },
  {
    stationId: 105,
    location: "Church Street, MG Road",
    status: "AVAILABLE",
    totalBatteries: 10,
    chargedBatteries: 6,
    currentTxn: null,
  },
  {
    stationId: 106,
    location: "JP Nagar 6th Phase",
    status: "AVAILABLE",
    totalBatteries: 12,
    chargedBatteries: 10,
    currentTxn: null,
  },
];