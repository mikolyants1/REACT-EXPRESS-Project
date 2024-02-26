import { HeaderMenu, MenuButton } from "../../../style/style.js";
import { useOutletContext } from "react-router-dom";
import { IOutlet } from "../../../types/type.js";
import { memo } from "react";

function ToogleMenu():JSX.Element{
 const {val,show,translate} = useOutletContext<IOutlet>();
 
    return (
        <HeaderMenu back={val}>
          <MenuButton
           onClick={()=>show(true)}>
            {translate("Menu")}
          </MenuButton>
        </HeaderMenu>
    );
};

export default memo(ToogleMenu)