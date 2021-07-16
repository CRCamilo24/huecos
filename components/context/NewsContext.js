import { createStore, createHook } from "react-sweet-state";
import { firebaseApp } from "../../utils/firebase";

const initialState = {
  news: null,
  loading: true,
};

const actions = {
  getNews:
    ({ collection }) =>
    async ({ setState }) => {
      const orderNews = [];
      await firebaseApp
        .firestore()
        .collection(collection)
        .orderBy("date", "desc")
        .get()
        .then((item) => {
          item.forEach((doc) => {
            const dataNew = doc.data();
            const newResumeData = {
              titleNews: dataNew.title,
              newsResume: dataNew.resume,
              url: dataNew.imageURL,
              date: dataNew,
              link: dataNew.link,
              linkTitle: dataNew.linkTitle,
            };
            orderNews.push(newResumeData);
          });
          setState({
            news: orderNews,
            loading: false,
          });
        })
        .catch((error) => {
          console.log("error:-NewsContext:", error);
          setState({
            news: null,
            loading: true,
          });
          alert("Ocurrió un error, por favor inténtelo luego de unos minutos");
        });
    },
};

const Store = createStore({
  initialState,
  actions,
});

export const NewsContext = createHook(Store);
