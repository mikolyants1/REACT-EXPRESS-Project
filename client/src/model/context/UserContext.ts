import { IUserContext } from "../../libs/types/type";
import { createContext } from "react";

export const UserContext = createContext<IUserContext>({} as IUserContext)
