
import { MainContent, Wrapper } from "../../../libs/style/style";
import i18n from "../../../libs/translate/Translate";
import { AppContext } from "../../../model/context/AppContext";
import { getCurrent, getLang, getTheme, useAppSelector } from "../../../model/store/store/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import NavBlock from "./navigate/NavBlock";

export default function Home():JSX.Element{
 const theme:string = useAppSelector(getTheme);
 const user:number = useAppSelector(getCurrent);
 const lang:string = useAppSelector(getLang);
 const [translate] = useTranslation<"translation",string>();
 const [show,setShow] = useState<boolean>(true);
 
 useEffect(():void => {
  i18n.changeLanguage(lang);
 },[lang]);
 
 const hide = () => setShow(false);

  return (
    <AppContext.Provider
     value={{theme,translate,user,hide}}>
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
    </AppContext.Provider>
  )
}