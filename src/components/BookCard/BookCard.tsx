import { BookCardProps } from "../../types"

export const BookCard = ({ volInfo }: BookCardProps) => {
   return(
    <>
        <li>
            {volInfo.title}
        </li>
        <li>
        {volInfo.imageLinks && volInfo.imageLinks.smallThumbnail ? (
            <img src={volInfo.imageLinks.smallThumbnail} alt={volInfo.title} />
        ) : null} 
        </li>
        <li>
            {volInfo.authors.map((author: string) =>(
                <span>{author} </span>
            ))}
        </li>
        <li>
            <p>{volInfo.description}</p>
        </li>
    </>
   )
}