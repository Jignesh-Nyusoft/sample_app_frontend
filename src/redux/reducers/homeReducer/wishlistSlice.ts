import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS_CODES } from "../../../utils/CommonConstants";
import _ from "lodash"
import { getCategoryList, getSuitableList } from "../../actions/homeActions";

type SliceState = {
  isLoading: boolean;
  wishListItems: null | any;
};
const wishlistSlice = createSlice({
  name: "WishList",
  initialState: {
    isLoading: false,
    wishListItems: []
  } as SliceState,
  reducers: {
    setWishList(state, action: PayloadAction<any>) {
        state.wishListItems = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      
      if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
        let data = action.payload?.data;
        state.wishListItems = _.assign(data)
      }
    });
  }
});

export const { setWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
