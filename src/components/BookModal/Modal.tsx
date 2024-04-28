import { BookModalProps } from "../../types";
import styles from "./Modal.module.scss";

export const Modal = ({ closeModal, volInfo } : BookModalProps) => {

  if (!volInfo) {
    return null;
  }

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          <img alt={volInfo.title} src={volInfo.imageLinks?.thumbnail} />
          <h2>{volInfo?.title}</h2>
          {volInfo.authors?.map((author: string) => (
                <span className={styles.author} key={author}>{author}</span>
            ))}
          <p>{volInfo?.description}</p>
        </div>
      </div>
    );
  };