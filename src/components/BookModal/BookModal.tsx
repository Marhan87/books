import { BookModalProps } from "../../types";

export const BookModal = ({ volInfo }: BookModalProps) => {
    console.log(volInfo);
    return (
        <h1>{volInfo.title}</h1>
    );
}
