import { Dispatch, FC, SetStateAction } from "react"
import { getCurrent, getLang, getTheme,
 useAppSelector } from "../store/store"
import { Outlet, useOutletContext } from "react-router-dom"
import ToogleMenu from "./Toggle.js"
import {useTranslation} from 'react-i18next'
import Main from "./wrap/path/Main.js"
import Setting from "./wrap/path/Setting.js"

export const Rout:FC=():JSX.Element=>{
    const set:Dispatch<SetStateAction<boolean>> = useOutletContext();
    const theme:string = useAppSelector(getTheme);
    const current:string = useAppSelector(getCurrent);
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
export const MainPage:FC=():JSX.Element=>{
    return (
      <Main>
        <ToogleMenu />
      </Main>
    );
  };
export const SettPage:FC=():JSX.Element=>{
    return (
      <Setting>
        <ToogleMenu />
      </Setting>
    );
  };