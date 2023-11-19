import { Outlet } from "react-router-dom";
import NavBlock from "./NavBlock.js";
import { Wrapper,MainContent } from "../style/style.js";
import { bind, getCurrent, getTheme, useAction,
useAppSelector } from "../store/store.js";
import { useState,createContext } from "react";
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'

export interface Context{
  val:string,
  set:ActionCreatorWithPayload<string,`messanger/setTheme`>|string,
  user:string,
  hide:()=>void
}
export const Theme = createContext<Context>(
{val:'',set:'',user:'',hide:()=>{}})

export default function Page():JSX.Element{
 const theme:string = useAppSelector(getTheme)
 const current:string = useAppSelector(getCurrent)
 const [show,setShow] = useState<boolean>(true)
 const {setTheme}:bind = useAction()
 const hideMenu=():void=>{
   setShow(false)
  }
 const context:Context = {
  val:theme,
  set:setTheme,
  user:current,
  hide:hideMenu
   }
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