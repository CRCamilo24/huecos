import { createStore, createHook } from "react-sweet-state";
import { firebaseApp } from "../../utils/firebase";

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

  // signInWithEmailAndPassword:
  //   ({ email, password }) =>
  //   async () => {
  //     await firebaseApp.auth().signInWithEmailAndPassword(email, password);
  //   },
};

const Store = createStore({
  initialState,
  actions,
});

export const useAuthContext = createHook(Store);
