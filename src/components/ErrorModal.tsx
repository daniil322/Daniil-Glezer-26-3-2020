import React from "react";
import Modal from "@material-ui/core/Modal";
import { AppState } from "../common/types";

interface Props {
  state: AppState;
}

const ErrorModal = ({ state }: Props) => {
  return (
    <Modal
      open={state === AppState.Error}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="error-modal">{state}</div>
    </Modal>
  );
};

export default ErrorModal;
