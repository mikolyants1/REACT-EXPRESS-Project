import { memo, useContext } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { ContactBlock, ContactLogo, ContactName,
ContactText, ContactTime} from "../../../../../../../libs/style/style"
import { IContext, IStyleObj } from "../../../../../../../libs/types"
import { AppContext } from "../../../../../../..//model/context/AppContext"
import { createLogo } from "../.../../../../../../../../model/functions/create/CreateLogo"
import Error from "../../../../../../../ui/cards/loading/Error"

interface IProps {
  navigate:()=>void,
  name:string,
  fill:boolean
}

function UpdateCard({name,navigate,fill}:IProps):JSX.Element{
const {one,two}:IStyleObj = createLogo();
const {hide,translate,theme} = useContext<IContext>(AppContext);
const nav:NavigateFunction = useNavigate();

const linkNavigate = ():void => {
   hide();
   navigate();
   nav("setting",{state:"Profile"});
 };
 
 if (!translate) return <Error back={theme} />;

    return (
        <ContactBlock fill={`${fill}`}
         back={theme} onClick={linkNavigate}>
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
}

export default memo(UpdateCard)