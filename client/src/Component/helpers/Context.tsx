import { createContext } from "react";
import { Context, UserContext } from "../../types/type";

 const AppTheme = createContext<Context>({
    val:'',
    user:0,
    translate:null,
    hide(){}
 });
 
 export const UserTheme = createContext<UserContext>({
    change(_){},
    click(_){},
 })

 export default AppTheme