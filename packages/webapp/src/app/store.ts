import {
  Action,
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
  ThunkAction,
} from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.log(
        `error[${action.payload.status as string}]:`,
        action.payload.data.message
      );
      // toast.warn({ title: 'error!', message: action.payload.data.message })
    }

    return next(action);
  };

/*store.subscribe(
  throttle(() => {
    saveState({
      user: store.getState().user,
      ui: store.getState().ui,
    });
  }, 1000)
);*/

export const store = configureStore({
  // preloadedState: persistedState,
  reducer: {
    user: userReducer,
  },
  middleware: (gDM) => gDM().concat(rtkQueryErrorLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
