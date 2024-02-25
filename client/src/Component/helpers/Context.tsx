import { createContext } from "react";
import { Context, UserContext } from "../../types/type";

 const AppTheme = createContext<Context>({} as Context);
 
 export const UserTheme = createContext<UserContext>({} as UserContext)

 export default AppTheme