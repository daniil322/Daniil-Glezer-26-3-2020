import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { AppState } from "../common/types";

interface Props {
  state: AppState;
}

const ErrorModal = ({ state }: Props) => {
  const isModalOpen = state === AppState.Error ? true : false;

  return (
    <Snackbar
      autoHideDuration={1200}
      open={isModalOpen}
      message={AppState.Error}
    />
  );
};

export default ErrorModal;
