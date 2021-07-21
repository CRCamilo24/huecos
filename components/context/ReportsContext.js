import { createStore, createHook } from "react-sweet-state";
import { firebaseApp } from "../../utils/firebase";
import * as firebase from "firebase";
const initialState = {
  collection: "",
  data: null,
  loading: true,
  error: false,
  update: false,
};

const actions = {
  getReports:
    ({ collection }) =>
    async ({ setState }) => {
      try {
        const data = [];
        await firebaseApp
          .firestore()
          .collection(collection)
          // .where("createBy", "==", `${idUser}`)
          .get()
          .then((item) => {
            item.docs.forEach((doc) => {
              data.push({ ...doc.data(), id_doc: doc.id });
            });
          })
          .catch((error) => {
            console.log("error:", error);
            setState({ data: null, error: true });
            alert(
              "Ocurrió un error, por favor inténtelo luego de unos minutos"
            );
          });
        setState({ data, loading: false, error: null });

        // console.log("data:-ReportsContext", data);
      } catch (error) {
        setState({ data: null, loading: false, error: true });
        console.log("error:-ReportsContext", error);
      }
    },

  updateCollection:
    ({ collection, idDoc, body }) =>
    async ({ setState }) => {
      setState({ loading: true });
      firebaseApp
        .firestore()
        .collection(collection)
        .doc(idDoc)
        .set(body)
        .then(() => {
          setState({
            loading: false,
            update: true,
          });
          alert("¡Reporte actualizado!");
        })
        .catch(() => {
          setState({
            update: false,
            error: true,
            loading: false,
          });
          alert("Ocurrió un error, por favor inténtelo luego de unos minutos");
        });
    },

  // export const updateCollection = (
  //   collectionName = "1",
  //   doc = "1",
  //   body = { name: "" }
  // ) => {
  //   return firebase
  //     .firestore()
  //     .collection(collectionName)
  //     .doc(doc)
  //     .set(body)
  //     .then(() => {
  //       return true;
  //     })
  //     .catch(() => {
  //       return false;
  //     });
  // };

  // export const updateCollectionArray = (
  //   collectionName = "1",
  //   doc = "1",
  //   arr = "",
  //   body = {},
  //   operacion = "suma"
  // ) => {
  //   let issuma = operacion == "suma";

  //   return firebase
  //     .firestore()
  //     .collection(collectionName)
  //     .doc(doc)
  //     .update({
  //       [arr]: issuma
  //         ? firebase.firestore.FieldValue.arrayUnion(body)
  //         : firebase.firestore.FieldValue.arrayRemove(body),
  //     })
  //     .then(() => {
  //       return true;
  //     })
  //     .catch(() => {
  //       return false;
  //     });
  // };
};

const Store = createStore({
  initialState,
  actions,
});

export const ReportsContext = createHook(Store);
