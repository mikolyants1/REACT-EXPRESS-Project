import { memo } from "react"
import LoginInput from "../../inputs/Login";
import { InputProps } from "../../../../types/type";

function LoginCard():JSX.Element{
  const props:InputProps[] = [
   {Name:'name',title:'username'},
   {Name:'pass',title:"password"}
  ]
  return (
    <>
     {props.map(({Name,title}:InputProps):JSX.Element=>(
       <LoginInput
        Name={Name}
        title={title}
       />
      ))}
    </>
    )
}

export default memo(LoginCard)