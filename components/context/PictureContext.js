import { createStore, createHook } from "react-sweet-state";

const initialState = {
  image: null,
  photo: null,
  loading: true,
};

const actions = {
  setPhoto:
    (photo) =>
    ({ setState }) => {
      setState({
        photo,
        loading: false,
      });
    },
  setImage:
    (image) =>
    ({ setState }) => {
      setState({
        image,
        loading: false,
      });
    },
};

const Store = createStore({
  initialState,
  actions,
});

export const PictureContext = createHook(Store);
