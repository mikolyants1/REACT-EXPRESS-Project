import { memo, useContext } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { ContactBlock, ContactLogo, ContactName,
ContactText, ContactTime} from "@/style/style"
import { IContext, IStyleObj } from "@/types/type"
import Theme from "@/Component/helpers/Context"
import Error from "../../blocks/load/Error"
import CreateLogo from "@/Component/helpers/functions/CreateLogo"

interface IProps {
  navigate:()=>void,
  name:string,
  fill:boolean
}

function UpdateCard({name,navigate,fill}:IProps):JSX.Element{
const {one,two}:IStyleObj = CreateLogo();
const {hide,translate,val} = useContext<IContext>(Theme);
const nav:NavigateFunction = useNavigate();

const linkNavigate = ():void => {
   hide();
   navigate();
   nav("set",{state:"Profile"});
 }

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
}

export default memo(UpdateCard)