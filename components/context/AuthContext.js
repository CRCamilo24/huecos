import { createStore, createHook } from "react-sweet-state";
import { firebaseApp } from "../../utils/firebase";
import * as firebase from "firebase";
import * as GoogleAuth from "expo-google-app-auth";
import * as AppAuth from "expo-app-auth";

// const androidClientId =
//   "849721799436-786e0b6meh28ed1l25k355trmt4n8g0n.apps.googleusercontent.com";

const config = {
  behavior: "web",
  expoClientId:
    "849721799436-5k6jqs7h1bkptqujjaiqango8ntri8j9.apps.googleusercontent.com",
  // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  androidClientId:
    "849721799436-786e0b6meh28ed1l25k355trmt4n8g0n.apps.googleusercontent.com",
  // webClientId:
  //   "849721799436-5k6jqs7h1bkptqujjaiqango8ntri8j9.apps.googleusercontent.com",
  // clientId:
  //   "419454009226-t6cls7pag073dqib4lh0ep64dcujrpk2.apps.googleusercontent.com",

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
    () =>
    async ({ setState }) => {
      try {
        // const result = await GoogleAuth.logInAsync(config);
        // if (result.type === "success") {
        //   console.log("success", result);
        //   // Get credentials
        //   const credential = await firebase.auth.GoogleAuthProvider.credential(
        //     data.idToken,
        //     data.accessToken
        //   );
        //   // Use credentials to login to firebase
        //   await firebaseApp.auth().signInWithCredential(credential);
        // }
        const logInResult = await AppAuth.authAsync({
          issuer: "https://accounts.google.com",
          scopes: ["profile", "email", "openid"],
          // redirectUrl,
          clientId:
            "849721799436-786e0b6meh28ed1l25k355trmt4n8g0n.apps.googleusercontent.com",
          // additionalParameters: extras,
        })
          .then((element) => console.log("element:", element))
          .catch((error) => console.log("error:", error));
        console.log("logInResult:", logInResult);
      } catch (error) {
        alert("login: Error:" + error);
      }
    },
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
