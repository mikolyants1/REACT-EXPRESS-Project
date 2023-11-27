import { HeaderMenu, MenuButton } from "../style/style.js";
import { useOutletContext } from "react-router-dom";
import { outlet } from "../types/type.js";

export default function ToogleMenu():JSX.Element{
 const {val,show,translate} = useOutletContext<outlet>();
    const press=():void=>{
      show(true);
    };
    return (
        <HeaderMenu back={val}>
          <MenuButton onClick={press}>
              {translate("Menu")}
          </MenuButton>
        </HeaderMenu>
    );
};