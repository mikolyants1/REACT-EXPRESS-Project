import { Outlet } from "react-router-dom";
import NavBlock from "./nav/NavBlock.js";
import { Wrapper,MainContent } from "../../style/style.js";
import { getCurrent, getLang, getTheme,
useAppSelector } from "../../store/store/store.js";
import { useState, useEffect } from "react";
import i18n from "../../translate/Translate.js";
import {useTranslation} from 'react-i18next'
import Theme from "../helpers/Context.js";

export default function Page():JSX.Element{
 const val:string = useAppSelector(getTheme);
 const user:number = useAppSelector(getCurrent);
 const lang:string = useAppSelector(getLang);
 const [translate] = useTranslation<"translation",string>();
 const [show,setShow] = useState<boolean>(true);
 
 useEffect(():void=>{
  i18n.changeLanguage(lang);
 },[lang]);
 
 const hide = ():void => setShow(false);
  

  return (
    <Theme.Provider value={{
      val,user,translate,hide
    }}>
      <Wrapper back={val}>
        <MainContent>
          <NavBlock
            show={show}
           />
          <Outlet
            context={setShow}
           />
        </MainContent>
      </Wrapper>
    </Theme.Provider>
  )
}