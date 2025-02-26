import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

type SliceState = {
  isLoading: boolean;
  isSkeleton: boolean;
  skeletonName: string[];
};
const loaderSlice = createSlice({
  name: "Loader",
  initialState: {
    isLoading: false,
    isSkeleton: false,
    skeletonName: []
  } as SliceState,
  reducers: {
    setLoader(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSkeleton(state, action: PayloadAction<boolean>) {
      state.isSkeleton = action.payload;
    },
    setSkeletonName(state, action: PayloadAction<string>) {
      let newNames = state.skeletonName
      newNames.push(action.payload)
      state.skeletonName = newNames;
      console.log("skeletons ",state.skeletonName)
    },
    removeSkeletonName(state, action: PayloadAction<string>) {
      state.skeletonName = _.remove(state.skeletonName, function(name) { return name !== action.payload });
      console.log("skeletons in remove",state.skeletonName, action.payload)
    }
  },
});

export const { setLoader, setSkeleton, setSkeletonName, removeSkeletonName } = loaderSlice.actions;
export default loaderSlice.reducer;
