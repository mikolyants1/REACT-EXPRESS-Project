import { memo, useContext } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { ContactBlock, ContactLogo, ContactName,
ContactText, ContactTime,styleObj } from "../../../../style/style"
import { Context } from "../../../../types/type"
import Theme from "../../../helpers/Context"
import Error from "../../blocks/load/Error"
import CreateLogo from "../../../helpers/functions/CreateLogo"

interface props {
  navigate:()=>void,
  name:string,
  fill:boolean
}

function UpdateCard({name,navigate,fill}:props):JSX.Element{
const {one,two}:styleObj = CreateLogo();
const {hide,translate,val} = useContext<Context>(Theme);
const nav:NavigateFunction = useNavigate();

const linkNavigate = ():void => {
   hide();
   navigate();
   nav("set",{state:"Profile"});
 };
 if (!translate) return <Error back={val} />;
    return (
        <ContactBlock fill={`${fill}`}
         back={val} onClick={linkNavigate}>
          <ContactLogo left={one} right={two}>
            {name.slice(0,1).toUpperCase()}
          </ContactLogo>
          <ContactText>
            <ContactName>
                {name}
            </ContactName>
            <ContactTime online="undefined">
               {translate("update")}
            </ContactTime>
          </ContactText>
        </ContactBlock>
    );
};

export default memo(UpdateCard)