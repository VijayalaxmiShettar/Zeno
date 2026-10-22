export type Status = "AVAILABLE" | "TRANSACTION_STARTED" | "SWAP1_INPROGRESS" | "SWAP2_INPROGRESS" | "OFFLINE"

export type TxnStatus = "TRANSACTION_STARTED" | "SWAP1_INPROGRESS" | "SWAP2_INPROGRESS" | "SWAP_FAILED" | "TRANSACTION_COMPLETED"

export interface ITransaction {
    txnId: number,
    userId: number,
    status: TxnStatus,
    events: any[]
}

export interface Station {
  stationId: number;
  location: string;
  status: Status;
  totalBatteries: number;
  chargedBatteries: number;
  currentTxn: null | ITransaction
}

export type SwapEvent =
  | { type: "TRANSACTION_STARTED"; stationId: number, txnId: number, userId: number, batteryData?: any }
  | { type: "SWAP1_INPROGRESS";  stationId: number, txnId: number, userId: number, batteryData?: any }
  | { type: "SWAP2_INPROGRESS";  stationId: number, txnId: number, userId: number, batteryData?: any }
//   | { type: "SWAP_FAILED"; stationId: number, txnData: any }
  | { type: "TRANSACTION_COMPLETED"; stationId: number, txnId: number, userId: number, batteryData?: any };