import { EntryBlock, EntryBut,EntryTitle, LoginError, RegistLink } from "../../../style/style.js";
import { useState } from "react";
import { useNavigate,NavigateFunction } from "react-router-dom";
import { bind, getCurrent, useAction, useAppSelector } from "../../../store/store.js";
import { Sub, SubProps, has, stateUser} from "../../../types/type.js";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LoginCard from "../../ui/cards/logincards/LoginCard.js";
import GetSuccess from "../../helpers/functions/GetSuccess.js";

export default function Entry():JSX.Element{
  const current:number = useAppSelector(getCurrent);
  const navigate:NavigateFunction = useNavigate();
  const methods = useForm<stateUser>({
    defaultValues:{name:"",pass:""}
  });
  const [error,setError] = useState<boolean>(false);
  const { setId,setPass,setAuthToken }:bind = useAction();
  const {handleSubmit,reset} = methods;
  const check:Sub<stateUser> = async (date):Promise<void>=>{
    const body:SubProps = {...date,regist:false};
    const user:has = await GetSuccess(body);
    if (user.has){
      setId(user.id);
      setPass(date.pass);
      setAuthToken(user.auth);
      navigate(`/page/main/${current}`);
     }else{
      setError(true);
      reset();
      };
  };
    return (
      <FormProvider {...methods}>
        <EntryBlock>
         <>
          <EntryTitle>
             Entrance
          </EntryTitle>
          <LoginCard />
          {error&&
          <LoginError>
            user not found
          </LoginError>}
          <EntryBut
           onClick={handleSubmit(check)}>
            login
          </EntryBut>
          <RegistLink>
            <Link to="/reg">
              registration
            </Link>
          </RegistLink>
        </>
      </EntryBlock>
    </FormProvider>
       );
};
