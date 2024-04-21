export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      description: string;
      imageLinks?: {
        smallThumbnail?: string,
        largeThumbnail?: string
      }
      authors: [string]
    };
  }

  export interface BookCardProps {
    volInfo: Book["volumeInfo"];
}

 export interface InputFieldProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  searchPhrase: string;
  placeHolder: string;
}