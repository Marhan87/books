import { BookCardProps } from "../../types";


export const BookCard = ( {volInfo, onCardClick} : BookCardProps ) => {
    if (!volInfo) {
        return null;
    }
    return (
        <>
            <li>{volInfo.title}</li>
            <li>
                {volInfo.imageLinks && volInfo.imageLinks.smallThumbnail ? (
                    <img src={volInfo.imageLinks.smallThumbnail} alt={volInfo.title} />
                ) : null}
            </li>
            <li>
                {volInfo.authors.map((author: string) => (
                    <span key={author}>{author} </span>
                ))}
            </li>
            <li>
                <p>{volInfo.description}</p>
            </li>
            <button onClick={onCardClick}>Open Modal</button>
        </>
    );
};
