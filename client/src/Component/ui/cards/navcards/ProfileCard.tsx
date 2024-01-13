import { ContactBlock, ContactLogo, ContactName,
ContactText, avatar, styleObj } from "../../../../style/style";
import {memo,useContext} from 'react'
import { Context } from "../../../../types/type";
import { Link } from "react-router-dom";
import Theme from "../../../helpers/Context";

 interface props {
    key?:number,
    path:number,
    fill?:string,
    name:string,
    logo?:string,
    click:()=>void,
    children?:JSX.Element
 }

function ProfileCard({fill = "false",name,click,children,logo,path}:props):JSX.Element {
 const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)];
 const left:string = name == "Main" ? 'rgb(56, 231, 120)' : one;
 const right:string = name == "Main" ? 'rgb(177, 248, 177)' : two;
 const {val,hide} = useContext<Context>(Theme);
    return (
      <Link to={`/page/main/${path}`} onClick={hide}>
        <ContactBlock fill={fill} back={val} onClick={click}>
          <ContactLogo left={left} right={right}>
            {!logo ? <>&#9733;</> : logo}
          </ContactLogo>
          <ContactText>
            <ContactName>
               {name}
            </ContactName>
             {children}
          </ContactText>
        </ContactBlock>
      </Link>
    )
}

export default memo(ProfileCard);