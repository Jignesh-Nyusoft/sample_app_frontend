import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash"

type SliceState = {
  isLoading: boolean;
  myProducts: any[] | null | any;
};
const myProductSlice = createSlice({
  name: "MyProducts",
  initialState: {
    isLoading: false,
  } as SliceState,
  reducers: {
    // setCategoryList(state, action: PayloadAction<any>) {
    //     state.categoryList = action.payload;
    //   },
  },
  extraReducers: (builder) => {
    // builder.addCase(getCategoryList.fulfilled, (state, action) => {
      
    //   if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
    //     let data = action.payload?.data?.data;
    //     state.categoryList = _.assign(data)
    //   }
    // });
    // builder.addCase(getSuitableList.fulfilled, (state, action) => {
      
    //   if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
    //     let data = action.payload?.data;
    //     state.suitableList = _.assign(data)
    //   }
    // });
  }
});

export const { } = myProductSlice.actions;
export default myProductSlice.reducer;
