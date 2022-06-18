import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IUser } from "@treat/lib-common";

type TReduxUser = { jwt: string } & Omit<IUser, "password">;

type InitState = {
  user: TReduxUser;
};

const initialState: InitState = {
  user: <TReduxUser>{},
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userSetJwt(state, { payload }: PayloadAction<string>) {
      state.user.jwt = payload;
    },
  },
});

export const { userSetJwt } = UserSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default UserSlice.reducer;
