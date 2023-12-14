import { memo, useContext } from "react"
import { Link } from "react-router-dom"
import { ContactBlock, ContactLogo, ContactName,
 ContactText, ContactTime, avatar, styleObj } from "../../../../style/style"
import { Theme } from "../../../wrap/Page"
import { Context } from "../../../../types/type"
import { Error } from "../../Loader"

interface props {
  navigate:()=>void,
  name:string,
  fill:boolean
}

function UpdateCard({name,navigate,fill}:props):JSX.Element{
const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)];
const {hide,translate,val} = useContext<Context>(Theme);
 if (!translate) return <Error back={val} />
    return (
      <Link to={`/page/set/Profile`} onClick={hide}>
        <ContactBlock fill={`${fill}`} back={val}
         onClick={navigate}>
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
      </Link>
    )
}

export default memo(UpdateCard)