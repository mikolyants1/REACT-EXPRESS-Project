import { ContactBlock, ContactLogo, ContactName,
ContactText} from "../../../../../../../libs/style/style";
import {memo,useContext} from 'react'
import { IContext, IStyleObj } from "../../../../../../../libs/types";
import { Link } from "react-router-dom";
import { createLogo } from "../../../../../../../model/functions/create/CreateLogo";
import { AppContext } from "../../../../../../../model/context/AppContext";

 interface IProps {
    key?:number,
    path:number,
    fill?:string,
    name:string,
    logo?:string,
    click:()=>void,
    children?:JSX.Element
 }

function ProfileCard({fill = "false",name,click,children,logo,path}:IProps):JSX.Element {
 const {one,two}:IStyleObj = createLogo();
 const {theme,hide} = useContext<IContext>(AppContext);
 const left:string = name == "Main" ? 'rgb(56, 231, 120)' : one;
 const right:string = name == "Main" ? 'rgb(177, 248, 177)' : two;
 
   return (
      <Link to={`/home/main/${path}`} onClick={hide}>
        <ContactBlock fill={fill} back={theme} onClick={click}>
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
    );
}

export default memo(ProfileCard);