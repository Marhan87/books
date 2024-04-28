import { InputFieldProps } from "../../types"
import styles from "./InputField.module.scss"


export const InputField = ({ onClick, onChange, searchPhrase, placeHolder }: InputFieldProps) => {

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        onClick();
      }
    };

    return(

    <div className={styles.inputContainer}>
      <input 
        className={styles.inputField} 
        type="text"
        id="searchInput"
        onChange={onChange}
        onKeyDown={handleKeyPress}
        value={searchPhrase}
        placeholder={placeHolder} />
      <button onClick={onClick} className={styles.searchButton}>Search</button>
    </div>
    )
}