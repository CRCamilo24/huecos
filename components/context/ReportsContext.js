import { createStore, createHook } from "react-sweet-state";
import { firebaseApp } from "../../utils/firebase";

const initialState = {
  collection: "",
  data: null,
  loading: true,
  error: false,
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
        setState({ loading: false, error });
        console.log("error:-ReportsContext", error);
      }
    },
};

const Store = createStore({
  initialState,
  actions,
});

export const ReportsContext = createHook(Store);
