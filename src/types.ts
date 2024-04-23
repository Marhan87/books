import { ReactNode } from "react";

export interface Book {
    id: string;
    volumeInfo?: {
      title?: string;
      description?: string;
      imageLinks?: {
        smallThumbnail?: string,
        largeThumbnail?: string
      }
      authors?: [string]
    };
  }

  export interface BookCardProps {
    onCardClick: () => void;
    volInfo?: Book["volumeInfo"];
}
export interface BookModalProps {
  showModal: boolean;
  closeModal: () => void;
  volInfo?: Book["volumeInfo"];
}

 export interface InputFieldProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  searchPhrase: string;
  placeHolder: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}