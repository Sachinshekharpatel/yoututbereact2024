import { createSlice, configureStore } from "@reduxjs/toolkit";

let initialState = {
   searchVideos: [],
}

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    SearchVideosFunction: (state, action) => {
      state.searchVideos = action.payload

      // console.log(action.payload)
    },
    FilterVideosFunction: (state, action) => {
      state.searchVideos = action.payload

      // console.log(action.payload)
    }
  }
})


const store = configureStore({
  reducer: {
    video: videoSlice.reducer
  },
});
export const searchVideo = videoSlice.actions;
export default store;