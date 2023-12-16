import { Outlet } from "react-router-dom";
import NavBlock from "./nav/NavBlock.js";
import { Wrapper,MainContent } from "../../style/style.js";
import { getCurrent, getLang, getTheme,
useAppSelector } from "../../store/store.js";
import { useState, useEffect } from "react";
import { Context } from "../../types/type.js";
import i18n from "../../translate/Translate.js";
import {useTranslation} from 'react-i18next'
import Theme from "../helpers/Context.js";

export default function Page():JSX.Element{
 const theme:string = useAppSelector(getTheme);
 const current:number = useAppSelector(getCurrent);
 const lang:string = useAppSelector(getLang);
 const [translate] = useTranslation<"translation",string>();
 const [show,setShow] = useState<boolean>(true);
 useEffect(():void=>{
  i18n.changeLanguage(lang);
 },[lang]);
 
 const hideMenu=():void=>{
   setShow(false);
  };

 const context:Context = {
  val:theme,
  user:current,
  translate:translate,
  hide:hideMenu
   };

    return (
      <Theme.Provider value={context}>
        <Wrapper back={theme}>
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