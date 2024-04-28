import { BookCardProps } from "../../types";
import styles from "./BookCard.module.scss";


export const BookCard = ( {volInfo, onCardClick} : BookCardProps ) => {
    if (!volInfo) {
        return null;
    }
    return (
        <div onClick={onCardClick} className={styles.bookCard}>
            <div className={styles.imageHolder}>
                {volInfo.imageLinks && volInfo.imageLinks.thumbnail ? (
                    <img src={volInfo.imageLinks.thumbnail} alt={volInfo.title} />
                ) : <img src="./src/assets/placeholder.png" width="150" alt="placeholder image" />}
            </div>
            <h5>{volInfo.title}</h5>

            <span>{ volInfo.authors[0]} {volInfo.authors.length > 1 ? "m.fl." : "" }</span>
        </div>
    );
};
