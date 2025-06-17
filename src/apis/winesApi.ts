import { WineDetailData } from "@/types/Wine";

import { axiosClient } from "./axios/axiosConfig";

export const getWineDetail = async (wineId: string): Promise<WineDetailData> => {
  const res = await axiosClient.get(`/wines/${wineId}`);
  return res.data;
};
