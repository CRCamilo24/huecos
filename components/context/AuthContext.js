import { createStore, createHook } from "react-sweet-state";

const initialState = {
  authUser: null,
  loading: true,
};

const actions = {
  setAuthUser:
    (authUser) =>
    ({ setState }) => {
      setState({
        authUser,
        loading: false,
      });
    },
};

const Store = createStore({
  initialState,
  actions,
});

export const useAuthContext = createHook(Store);
