import { memo } from "react"
import { useOutletContext } from "react-router-dom"
import { IContext, IStyleObj } from "@/types/type.js"
import { HeaderBlock, Logo, Name, Span } from "@/style/style.js";
import ToogleMenu from "../../buttons/Toggle.js"
import Error from "../load/Error.js";
import CreateLogo from "@/Component/helpers/functions/CreateLogo.js";

interface props {
    name:string,
    isMine:boolean
}

function Header({name,isMine}:props):JSX.Element {
  const {one,two}:IStyleObj = CreateLogo();
  const {val,translate} = useOutletContext<IContext>();
  const color1:string = isMine ? 'rgb(56, 231, 120)' : one;
  const color2:string = isMine ? 'rgb(177, 248, 177)' : two;
  if (!translate) return <Error back={val} />;
  return (
    <HeaderBlock back={val}>
      <Logo start={color1} two={color2}>
        {!isMine&&<>{name.slice(0,1).toUpperCase()}</>} 	
        {isMine&&<Span>&#9733;</Span>}
      </Logo>
      <Name>
       {translate(isMine ? 'Main' : name)}
      </Name>
      <ToogleMenu />
    </HeaderBlock>
  );
}

export default memo(Header)