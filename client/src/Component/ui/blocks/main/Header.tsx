import { memo } from "react"
import { useOutletContext } from "react-router-dom"
import { Context } from "../../../../types/type.js"
import { HeaderBlock, Logo, Name, Span,
avatar, styleObj } from "../../../../style/style.js";
import ToogleMenu from "../../buttons/Toggle.js"
import Error from "../load/Error.js";

interface props {
    name:string,
    isMine:boolean
}

function Header({name,isMine}:props):JSX.Element {
  const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)];
  const {val,translate} = useOutletContext<Context>();
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
};

export default memo(Header)