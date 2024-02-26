import { bind } from "../../../../store/store/store";
import { IThemes } from "../../../../types/type";

export default (val:string,lang:string,actions:bind):IThemes[]=>{
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