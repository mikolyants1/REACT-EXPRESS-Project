import { memo, useContext } from "react"
import { Link } from "react-router-dom"
import { SetBlock, SetLogo, SetText, ThemeLogo } from "../../../../style/style"
import { Context } from "../../../../types/type"
import { Theme } from "../../../views/Page"
import { Error } from "../../Loader"

interface props {
    path:string,
    navigate:()=>void,
    fill?:boolean,
    children:JSX.Element,
    text:string
}

function LinkCard({navigate,path,fill = false,children,text}:props):JSX.Element{
 const {val,hide,translate} = useContext<Context>(Theme);
 if (!translate) return <Error back={val} />
    return (
      <Link to={`/page/${path}`} onClick={hide}>
        <SetBlock fill={`${fill}`} back={val}
         onClick={navigate}>
        {path == "set/Theme" ? ( 
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
      </Link>
    )
};

export default memo(LinkCard)