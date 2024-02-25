import { bind } from "../../../../store/store/store";
import { themes } from "../../../../types/type";

export default (val:string,lang:string,actions:bind):themes[]=>{
    const {setTheme,setLang}:bind = actions;
    return [
        {
          set:setTheme,
          back:val,
          name:"theme"
        },
        { 
         set:setLang,
         back:lang,
         name:"language"
        }
    ]
}