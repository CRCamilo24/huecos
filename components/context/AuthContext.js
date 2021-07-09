import { createStore, createHook } from "react-sweet-state";
import * as Google from "expo-google-app-auth";
import { firebaseApp } from "../../utils/firebase";
import * as firebase from "firebase";

const config = {
  // expoClientId: `849721799436-j1lds7oij2cq3u1ivjbc1hquuadh7mie.apps.googleusercontent.com`,
  // expoClientId: `419454009226-t6cls7pag073dqib4lh0ep64dcujrpk2.apps.googleusercontent.com`,
  // iosClientId: `<YOUR_IOS_CLIENT_ID>`,
  androidClientId:
    "849721799436-i9qhbfn3fd3v5pu3o54u7hk9gh4e3e98.apps.googleusercontent.com",
  scopes: ["profile", "email"],
};

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

  signInWithGoogle:
    (authUser) =>
    async ({ setState }) => {
      try {
        const { type, accessToken, user, idToken } = await Google.logInAsync(
          config
        );

        if (type === "success") {
          const credential = await firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          const userInfo = await firebaseApp
            .auth()
            .signInWithCredential(credential);
          setAuthUser({
            authUser: userInfo.user,
            loading: false,
          });
        }
      } catch (error) {
        console.log("error-AuthContext:", error);
      }
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
