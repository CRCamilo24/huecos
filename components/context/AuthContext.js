import { createStore, createHook } from "react-sweet-state";
// import * as Google from "expo-google-app-auth";
import { firebaseApp } from "../../utils/firebase";
import * as firebase from "firebase";
// import { ResponseType } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

// const androidClientId =
//   "849721799436-786e0b6meh28ed1l25k355trmt4n8g0n.apps.googleusercontent.com";

// const config = {
//   // expoClientId:
//   //   "849721799436-j1lds7oij2cq3u1ivjbc1hquuadh7mie.apps.googleusercontent.com",
//   iosClientId: `<YOUR_IOS_CLIENT_ID>`,
//   // "849721799436-i9qhbfn3fd3v5pu3o54u7hk9gh4e3e98.apps.googleusercontent.com",
//   androidClientId:
//     "849721799436-786e0b6meh28ed1l25k355trmt4n8g0n.apps.googleusercontent.com", // con otro package name
//   // androidClientId:
//   //   "849721799436-lq6kceq8l9cliel4mrfb12q3h4oqqhak.apps.googleusercontent.com", // host.exponent

//   scopes: ["profile", "email"],
// };

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

// const config = {
//   // expoClientId:
//   //   "849721799436-j1lds7oij2cq3u1ivjbc1hquuadh7mie.apps.googleusercontent.com",
//   // iosClientId: `<YOUR_IOS_CLIENT_ID>`,
//   // "849721799436-i9qhbfn3fd3v5pu3o54u7hk9gh4e3e98.apps.googleusercontent.com",
//   androidClientId:
//     "849721799436-786e0b6meh28ed1l25k355trmt4n8g0n.apps.googleusercontent.com",
//   // androidClientId:
//   //   "849721799436-lq6kceq8l9cliel4mrfb12q3h4oqqhak.apps.googleusercontent.com",

//   scopes: ["profile", "email"],
// };
