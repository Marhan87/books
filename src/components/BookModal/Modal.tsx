import { BookModalProps } from "../../types";
import styles from "./Modal.module.scss";

export const Modal = ({ closeModal, volInfo } : BookModalProps) => {

  if (!volInfo) {
    return null; // Return null if volInfo is undefined
  }

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          <img src={volInfo.imageLinks?.thumbnail} />
          <h2>{volInfo?.title}</h2>
          {volInfo.authors?.map((author: string) => (
                <span className={styles.author} key={author}>{author}</span>
            ))}
          <p>{volInfo?.description}</p>
          {/* Render other details from volInfo as needed */}
        </div>
      </div>
    );
  };