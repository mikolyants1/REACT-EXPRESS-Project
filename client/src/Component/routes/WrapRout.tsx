import { Dispatch, FC, SetStateAction } from "react"
import { getCurrent, getLang, getTheme,
 useAppSelector } from "../../store/store.js"
import { Outlet, useOutletContext } from "react-router-dom"
import {useTranslation} from 'react-i18next'

 const WrapRout:FC=():JSX.Element=>{
    const set:Dispatch<SetStateAction<boolean>> = useOutletContext();
    const theme:string = useAppSelector(getTheme);
    const current:number = useAppSelector(getCurrent);
    const lang:string = useAppSelector(getLang);
    const [translate] = useTranslation<"translation",string>();
    return (
      <Outlet
       context={{
        val:theme,
        user:current,
        lang:lang,
        translate:translate,
        show:set
       }}
      />
    );
  };

export default WrapRout