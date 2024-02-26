import { ContactBlock, ContactLogo, ContactName,
ContactText} from "../../../../style/style";
import {memo,useContext} from 'react'
import { IContext, IStyleObj } from "../../../../types/type";
import { Link } from "react-router-dom";
import Theme from "../../../helpers/Context";
import CreateLogo from "../../../helpers/functions/CreateLogo";

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
 const {one,two}:IStyleObj = CreateLogo();
 const {val,hide} = useContext<IContext>(Theme);
 const left:string = name == "Main" ? 'rgb(56, 231, 120)' : one;
 const right:string = name == "Main" ? 'rgb(177, 248, 177)' : two;
 
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