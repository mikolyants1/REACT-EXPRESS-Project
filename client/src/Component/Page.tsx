import { Outlet } from "react-router-dom";
import NavBlock from "./NavBlock.js";
import { Wrapper,MainContent } from "../style/style.js";
import { bind, useAction,useAppSelector } from "../store/store.js";
import { useState,createContext } from "react";
import { Redux } from "../store/slice.js";
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'

export interface state{
  mess:Redux
}
export interface Context{
  val:string,
  set:ActionCreatorWithPayload<string,`messanger/setTheme`>|string,
  user:string
}
export const Theme = createContext<Context>({val:'',set:'',user:''})

export default function Page():JSX.Element{
 const theme = useAppSelector(({mess}:state)=>mess.theme)
 const current = useAppSelector(({mess}:state)=>mess.current)
 const [show,setShow] = useState<boolean>(true)
 const {setTheme}:bind = useAction()
 const context:Context = {val:theme,set:setTheme,user:current}
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