import { memo, useContext } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { SetBlock, SetLogo, SetText, ThemeLogo } from "../../../../style/style"
import { Context } from "../../../../types/type"
import Theme from "../../../helpers/Context"
import Error from "../../blocks/load/Error"

interface props {
    path:string,
    navigate:()=>void,
    fill?:boolean,
    children:JSX.Element,
    text:string
}

function LinkCard({navigate,path,fill = false,children,text}:props):JSX.Element{
 const {val,hide,translate} = useContext<Context>(Theme);
 const nav:NavigateFunction = useNavigate();

 const linkNavigate = ():void => {
   hide();
   navigate();
   path !== "set"
   ? nav(`/page/${path}`)
   : nav("set",{state:"Theme"});
 };

 if (!translate) return <Error back={val} />;
    return (
        <SetBlock onClick={linkNavigate}
         fill={`${fill}`} back={val}>
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
};

export default memo(LinkCard)