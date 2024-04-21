import { InputFieldProps } from "../../types"


export const InputField: React.FC<InputFieldProps> = ({ onChange, searchPhrase, placeHolder }) => {
    return(
        <input type="text"
        id="searchInput"
        onChange={onChange}
        value={searchPhrase}
        placeholder={placeHolder}></input>
    )
}