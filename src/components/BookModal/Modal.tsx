import { BookModalProps } from "../../types";

export const Modal = ({ showModal, closeModal, volInfo } : BookModalProps) => {

  if (!volInfo) {
    return null; // Return null if volInfo is undefined
  }

    return (
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          {/* Render modal content */}
          <h2>{volInfo?.title}</h2>
          <p>{volInfo?.description}</p>
          {/* Render other details from volInfo as needed */}
        </div>
      </div>
    );
  };