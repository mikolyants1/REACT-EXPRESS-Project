import { Dispatch, FC, SetStateAction } from "react"
import { getCurrent, getLang, getTheme,
 useAppSelector } from "../../model/store/store/store.js"
import { Outlet, useOutletContext } from "react-router-dom"
import {useTranslation} from 'react-i18next'

 export const HomeRout:FC = ():JSX.Element => {
    const show:Dispatch<SetStateAction<boolean>> = useOutletContext();
    const theme:string = useAppSelector(getTheme);
    const user:number = useAppSelector(getCurrent);
    const lang:string = useAppSelector(getLang);
    const [translate] = useTranslation<"translation",string>();
    return (
      <Outlet
       context={{
        theme,
        user,
        lang,
        translate,
        show
       }}
      />
    );
  }