import { InputFieldProps } from "../../types"
import styles from "./InputField.module.scss"


export const InputField = ({ onClick, onChange, searchPhrase, placeHolder }: InputFieldProps) => {
    return(

    <div className={styles.inputContainer}>
      <input 
        className={styles.inputField} 
        type="text"
        id="searchInput"
        onChange={onChange}
        value={searchPhrase}
        placeholder={placeHolder} />
      <button onClick={onClick} className={styles.searchButton}>Search</button>
    </div>
    )
}