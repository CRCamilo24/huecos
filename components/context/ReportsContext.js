import { createStore, createHook } from "react-sweet-state";
import { firebaseApp } from "../../utils/firebase";

const initialState = {
  idUser: null,
  collection: "",
  data: null,
  loading: true,
  error: false,
};

const actions = {
  getReports:
    ({ idUser, collection }) =>
    async ({ setState }) => {
      try {
        const data = [];
        await firebaseApp
          .firestore()
          .collection(collection)
          .where("createBy", "==", `${idUser}`)
          .get()
          .then((item) => {
            item.docs.forEach((doc) => {
              data.push({ ...doc.data(), id_doc: doc.id });
            });
          });
        setState({ data, loading: false, error: null });
        // console.log("data:-ReportsContext", data);
      } catch (error) {
        setState({ loading: false, error });
        console.log("error:-ReportsContext", error);
        console.log("collection:-ReportsContext", collection);
      }
    },
};

const Store = createStore({
  initialState,
  actions,
});

export const ReportsContext = createHook(Store);
