import { memo, useContext } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { SetBlock, SetLogo, SetText, ThemeLogo } from "../../../../../../../libs/style/style"
import { IContext } from "../../../../../../../libs/types"
import { AppContext } from "../../../../../../../model/context/AppContext"
import Error from "../../../../../../../ui/cards/loading/Error"

interface IProps {
    path:string,
    navigate:()=>void,
    fill?:boolean,
    children:JSX.Element,
    text:string
}

function LinkCard({navigate,path,fill = false,children,text}:IProps):JSX.Element{
 const {theme,hide,translate} = useContext<IContext>(AppContext);
 const nav:NavigateFunction = useNavigate();

 const linkNavigate = ():void => {
   hide();
   navigate();
   path !== "setting"
   ? nav(`/home/${path}`)
   : nav("setting",{state:"Theme"});
 };

 if (!translate) return <Error back={theme} />;
    return (
        <SetBlock onClick={linkNavigate}
         fill={`${fill}`} back={theme}>
          {path == "set" ? ( 
            <ThemeLogo>
             {children}
            </ThemeLogo>
          ) : (
            <SetLogo>
              {children}
            </SetLogo>
          )}
          <SetText>
            {translate(text)}  
          </SetText>
        </SetBlock>
    );
}

export default memo(LinkCard)