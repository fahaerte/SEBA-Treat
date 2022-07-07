import {
  // Action,
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
  // ThunkAction,
} from "@reduxjs/toolkit";
// import userReducer from "../redux/userSlice";
import { UserApi } from "../store/api";
import { stripeApi } from "../store/api";

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

export const store = configureStore({
  reducer: {
    [stripeApi.reducerPath]: stripeApi.reducer,
    // [mealApi.reducerPath]: mealApi.reducer,
    //      [UserApi.reducerPath]: UserApi.reducer,
    //   UserApi.middleware
  },
  middleware: (gDM) => gDM().concat(rtkQueryErrorLogger, stripeApi.middleware),
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
