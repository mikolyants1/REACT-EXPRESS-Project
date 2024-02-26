import { createContext } from "react";
import { IContext, IUserContext } from "../../types/type";

 const AppTheme = createContext<IContext>({} as IContext);
 
 export const UserTheme = createContext<IUserContext>({} as IUserContext)

 export default AppTheme