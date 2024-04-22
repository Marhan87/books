import { useState } from "react";
import { BookCardProps } from "../../types";
import { BookModal } from "../BookModal/BookModal";

export const BookCard = ({ volInfo }: BookCardProps) => {
    const [showModal, setShowModal] = useState(false);

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
            <button onClick={() => setShowModal(!showModal)}>Visa info</button>

            {showModal ? <BookModal volInfo={volInfo} /> : null }
        </>
    );
};
