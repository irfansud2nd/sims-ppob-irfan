import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  balance: number;
  balanceLoading: boolean;
};

const initialState: State = {
  balance: 0,
  balanceLoading: true,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    addBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    reduceBalance: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },
    setBalanceLoading: (state, action: PayloadAction<boolean>) => {
      state.balanceLoading = action.payload;
    },
  },
});

export const { setBalance, addBalance, reduceBalance, setBalanceLoading } =
  balanceSlice.actions;
export default balanceSlice.reducer;
