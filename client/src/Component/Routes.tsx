import { Dispatch, FC, SetStateAction } from "react"
import { bind, getCurrent, getTheme, useAction, useAppSelector } from "../store/store"
import { Outlet, useOutletContext } from "react-router-dom"
import Main from "./Main.js"
import ToogleMenu from "./Toggle.js"
import Setting from "./Setting.js"

export const Rout=():JSX.Element=>{
    const set:Dispatch<SetStateAction<boolean>> = useOutletContext()
    const theme:string = useAppSelector(getTheme)
    const current:string = useAppSelector(getCurrent)
    const {setTheme}:bind = useAction()
    return (
      <Outlet
       context={{
        val:theme,
        set:setTheme,
        user:current,
        show:set
      }}
       />
    )
  }
export const MainPage:FC=():JSX.Element=>{
    return (
      <Main>
        <ToogleMenu />
      </Main>
    )
  }
export const SettPage:FC=():JSX.Element=>{
    return (
      <Setting>
        <ToogleMenu />
      </Setting>
    )
  }