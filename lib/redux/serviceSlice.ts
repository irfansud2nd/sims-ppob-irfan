import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Service = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

type State = {
  services: Service[];
};

const initialState: State = {
  services: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
  },
});

export const { setService } = serviceSlice.actions;
export default serviceSlice.reducer;
