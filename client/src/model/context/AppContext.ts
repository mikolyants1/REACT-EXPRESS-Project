import { IContext } from "../../libs/types/type";
import { createContext } from "react";

export const AppContext = createContext<IContext>({} as IContext);
 