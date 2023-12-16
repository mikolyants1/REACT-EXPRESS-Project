import { createContext } from "react";
import { Context } from "../../types/type";

 const Theme = createContext<Context>({
    val:'',
    user:0,
    translate:null,
    hide:()=>{}
 });
    
 export default Theme