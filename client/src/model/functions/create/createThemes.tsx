import { IBind } from "../../../model/store/store/store";
import { IThemes } from "../../../libs/types";

export const createThemes = (val:string,lang:string,actions:IBind):IThemes[]=>{
    const {setTheme,setLang}:IBind = actions;
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