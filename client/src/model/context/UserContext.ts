import { IUserContext } from "../../libs/types";
import { createContext } from "react";

export const UserContext = createContext<IUserContext>({} as IUserContext)
