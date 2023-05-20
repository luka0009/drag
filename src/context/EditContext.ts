import { createContext, Dispatch, SetStateAction, useState } from "react";

interface EditContextType {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export const EditContext = createContext<EditContextType>({
  edit: false,
  setEdit: () => {
    throw new Error("setEdit function not initialized");
  },
});
