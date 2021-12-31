import axios, {AxiosResponse} from "axios";
import {BillingSummaryDTO} from "./types";

const baseUrl = 'http://185.185.126.15:8000/api';

export async function getBillingSummary(): Promise<AxiosResponse<BillingSummaryDTO[]>> {
  return await axios.get<BillingSummaryDTO[]>(
      `${baseUrl}/management/billing/summary`
  );
}


