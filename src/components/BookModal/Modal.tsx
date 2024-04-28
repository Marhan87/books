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
          {volInfo.imageLinks?.thumbnail ? <img alt={volInfo.title} src={volInfo.imageLinks?.thumbnail} /> 
          : <img src="./src/assets/placeholder.png" width="150" alt="placeholder image" />}
          <h2>{volInfo?.title}</h2>
          {volInfo.authors?.map((author: string) => (
                <span className={styles.author} key={author}>{author}</span>
            ))}
          <p>{volInfo?.description}</p>
        </div>
      </div>
    );
  };