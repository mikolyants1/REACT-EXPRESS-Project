import { HeaderMenu, MenuButton } from "../../../libs/style/style";
import { IOutlet } from "../../../libs/types";
import { memo } from "react";
import { useOutletContext } from "react-router-dom";

function ToggleMenu():JSX.Element{
    const {theme,show,translate} = useOutletContext<IOutlet>();
    
    return (
      <HeaderMenu back={theme}>
        <MenuButton
         onClick={()=>show(true)}>
          {translate("Menu")}
        </MenuButton>
      </HeaderMenu>
    );
}
   
export default memo(ToggleMenu);