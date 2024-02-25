import { memo } from "react"
import LoginInput from "../../inputs/Login";
import { InputProps } from "../../../../types/type";
import CreateFields from "../../../helpers/functions/login/CreateFields";

function LoginCard():JSX.Element{
  const fileds:InputProps[] = CreateFields();
  return (
    <>
     {fileds.map((i:InputProps):JSX.Element=>(
       <LoginInput
        key={i.title}
        Name={i.Name}
        title={i.title}
       />
      ))}
    </>
    )
}

export default memo(LoginCard)