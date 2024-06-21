import { memo } from "react"
import { InputProps } from "../../../../libs/types";
import { createLoginField } from "../../../../model/functions/create/CreateLoginFields";
import LoginInput from "./inputs/LoginInput";

function LoginCard():JSX.Element{
  const fileds:InputProps[] = createLoginField();
  return (
    <>
     {fileds.map((i:InputProps):JSX.Element=>(
       <LoginInput
        key={i.title}
        {...i}
       />
      ))}
    </>
    )
}

export default memo(LoginCard)