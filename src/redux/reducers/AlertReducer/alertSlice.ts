import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LABELS } from "../../../locales/common";

type SliceState = {
  isVisible: boolean;
  title?: string;
  description?: string;
  onCancel?: () => void;
  onDone?: () => void;
  isOutSideDisable?: boolean;
  doneButtonText?: string;
  cancelButtonText?: string;
};

const alertSlice = createSlice({
  name: "Dialog",
  initialState: {
    isVisible: false,
    title: "",
    description: "",
    onCancel: () => {},
    onDone: () => {},
    isOutSideDisable: false,
    doneButtonText: LABELS.COMMON_LABELS.okay,
    cancelButtonText: LABELS.COMMON_LABELS.cancel
  } as SliceState,
  reducers: {
    setDialogData(
      state,
      action: PayloadAction<{
        isVisible: boolean;
        title?: string;
        description?: string;
        onCancel?: () => void;
        onDone?: () => void;
        isOutSideDisable?: boolean;
        doneButtonText?: string;
        cancelButtonText?: string;
      }>
    ) {
      (state.isVisible = action.payload.isVisible),
        (state.title = action.payload.title),
        (state.description = action.payload.description),
        (state.onCancel = action.payload.onCancel),
        (state.onDone = action.payload.onDone);
      state.isOutSideDisable = action.payload.isOutSideDisable;
      state.doneButtonText = action.payload.doneButtonText;
      state.cancelButtonText = action.payload.cancelButtonText;
    },
  },
});

export const { setDialogData } = alertSlice.actions;
export default alertSlice.reducer;
