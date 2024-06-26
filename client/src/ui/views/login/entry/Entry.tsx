import { EntryBlock, EntryBut,EntryTitle, LoginError, RegistLink } from "../../../../libs/style/style.js";
import { useState } from "react";
import { useNavigate,NavigateFunction } from "react-router-dom";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { IBind, getCurrent, useAction, useAppSelector } from "../../../../model/store/store/store";
import { IHas, IStateUser, ISubProps, TSub } from "../../../../libs/types/index.js";
import GetSuccess from "../../../../api/auth/GetSuccess";
import LoginCard from "../cards/LoginCard";


export default function Entry():JSX.Element{
  const current:number = useAppSelector(getCurrent);
  const navigate:NavigateFunction = useNavigate();
  const form = useForm<IStateUser>({
    defaultValues:{name:"",pass:""}
  });
  const [error,setError] = useState<boolean>(false);
  const { setId,setPass,setAuthToken }:IBind = useAction();

  const check:TSub<IStateUser> = async (date):Promise<void>=>{
    const body:ISubProps = {...date,regist:false};
    const user:IHas = await GetSuccess(body);
    if (user.has){
      setId(user.id);
      setPass(date.pass);
      setAuthToken(user.auth);
      navigate(`/home/main/${current}`);
    } else {
      setError(true);
      form.reset();
    }
  }
  
    return (
      <FormProvider {...form}>
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
           onClick={form.handleSubmit(check)}>
            login
          </EntryBut>
          <RegistLink>
            <Link to="/regist">
              registration
            </Link>
          </RegistLink>
        </>
      </EntryBlock>
    </FormProvider>
    );
}
