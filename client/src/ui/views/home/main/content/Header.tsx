import { memo } from "react"
import { useOutletContext } from "react-router-dom"
import { IContext, IStyleObj } from "../../../../../libs/types/type.js"
import { HeaderBlock, Logo, Name, Span } from "../../../../../libs/style/style.js";
import { createLogo } from "../../../../../model/functions/create/CreateLogo";
import Error from "../../../../../ui/cards/loading/Error";
import ToggleMenu from "../../../../../ui/cards/menu/ToggleMenu";

interface IProps {
    name:string,
    isMine:boolean
}

function Header({name,isMine}:IProps):JSX.Element {
  const {one,two}:IStyleObj = createLogo();
  const {theme,translate} = useOutletContext<IContext>();
  const color1:string = isMine ? 'rgb(56, 231, 120)' : one;
  const color2:string = isMine ? 'rgb(177, 248, 177)' : two;

  if (!translate) return <Error back={theme} />;
  return (
    <HeaderBlock back={theme}>
      <Logo start={color1} two={color2}>
        {!isMine&&<>{name.slice(0,1).toUpperCase()}</>} 	
        {isMine&&<Span>&#9733;</Span>}
      </Logo>
      <Name>
       {translate(isMine ? 'Main' : name)}
      </Name>
      <ToggleMenu />
    </HeaderBlock>
  );
}

export default memo(Header)