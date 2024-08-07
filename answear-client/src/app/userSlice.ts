import { createSlice } from "@reduxjs/toolkit";
import { IUser, UserState } from "interfaces/user";
import { jwtParser } from "utils/jwtParser.ts";

const initialState: UserState = {
    user: jwtParser(localStorage.getItem("authToken")) as IUser,
    token: localStorage.getItem("authToken") || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action: { payload: { user: IUser; token: string } }) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("authToken");
        },
    },
});

export const getUser = (state: { user: UserState }) => state.user.user;
export const getToken = (state: { user: UserState }) => state.user.token;
export const { setCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;
