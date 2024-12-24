import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};

type State = {
  user: User | undefined;
  userLoading: boolean;
};

const initialState: State = {
  user: undefined,
  userLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
      if (action.payload) state.userLoading = false;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
