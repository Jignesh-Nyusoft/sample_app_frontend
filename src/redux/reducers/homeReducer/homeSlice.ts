import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginWithOTP, logOut } from "../../actions/authActions";
import { STATUS_CODES } from "../../../utils/CommonConstants";
import { getProfileData } from "../../actions/profileActions";
import _ from "lodash"
import { MyProfileData } from "../../types/profileTypes";
import { Category, SuitableItem } from "../../types/homeTypes";
import { getAttributeList, getCategoryList, getSuitableList } from "../../actions/homeActions";

type SliceState = {
  isLoading: boolean;
  suitableList: SuitableItem[] | null | any;
  categoryList: Category[] | null | any;
  emptyFilterData: any;
  recentSearches: any[];
  attributeListBasic: any
};
const homeSlice = createSlice({
  name: "Home",
  initialState: {
    isLoading: false,
    categoryList: [],
    suitableList: null,
    emptyFilterData: null,
    recentSearches: [],
    attributeListBasic: null
  } as SliceState,
  reducers: {
    setCategoryList(state, action: PayloadAction<any>) {
        state.categoryList = action.payload;
      },
    setSuitableList(state, action: PayloadAction<any>) {
        state.suitableList = action.payload;
    },
    setEmptyFilterData(state, action: PayloadAction<any>) {
      state.emptyFilterData = action.payload;
  },
    addRecentSearch(state, action: PayloadAction<string>) {
      console.log("recent searches,", state.recentSearches)
      if (!state.recentSearches.includes(action.payload)) {
        if (state.recentSearches?.length < 5) {
          let newNames = state.recentSearches
          newNames.push(action.payload)
          state.recentSearches = newNames;
        } else {
          
          let newNames = state.recentSearches
          newNames.shift();
          console.log("recent searches in else", newNames)
          newNames.push(action.payload)
          state.recentSearches = newNames;
        }
    }
  },
  removeRecentSearch(state, action: PayloadAction<any>) {
    state.recentSearches = _.remove(state.recentSearches, function(name) { return name !== action.payload });
},
clearRecentSearch(state, action: PayloadAction<any>) {
  state.recentSearches = []
},
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      
      if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
        let data = action.payload?.data?.data;
        state.categoryList = _.assign(data)
      }
    });
    builder.addCase(getSuitableList.fulfilled, (state, action) => {
      
      if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
        let data = action.payload?.data;
        state.suitableList = _.assign(data)
      }
    });
    builder.addCase(getAttributeList.fulfilled, (state, action) => {
      
      if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
        let data = action.payload?.data;
        state.attributeListBasic = _.assign(data)
      }
    });
  }
});

export const { setCategoryList, setSuitableList, setEmptyFilterData, addRecentSearch, removeRecentSearch, clearRecentSearch} = homeSlice.actions;
export default homeSlice.reducer;
