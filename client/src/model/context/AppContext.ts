import { IContext } from "../../libs/types";
import { createContext } from "react";

export const AppContext = createContext<IContext>({} as IContext);
 