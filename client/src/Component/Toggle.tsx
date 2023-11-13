import { HeaderMenu, MenuButton } from "../style/style.js";
import { useOutletContext } from "react-router-dom";
import { outlet } from "./Main.js";


export default function ToogleMenu():JSX.Element{
 const {val,show} = useOutletContext<outlet>()
    const press=():void=>{
      show((prev:boolean)=>!prev)
    }
    return (
        <HeaderMenu back={val}>
          <MenuButton onClick={press}>
              Menu
          </MenuButton>
        </HeaderMenu>
    )
}