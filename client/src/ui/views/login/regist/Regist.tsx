import { useNavigate,NavigateFunction } from "react-router-dom"
import { useState } from "react"
import { EntryBlock,EntryTitle,EntryBut,LoginError } from '../../../../libs/style/style.js'
import { useAddUserMutation } from "../../../../model/store/api/user/userEndpoints.js"
import { TSub, ISubProps, IData, IHas, IStateUser } from "../../../../libs/types/type.js"
import {useForm,FormProvider} from 'react-hook-form';
import LoginCard from "../cards/LoginCard.js"
import GetSuccess from "../../../../api/auth/GetSuccess.js"

interface err{
   show:boolean,
   mess:string
}
interface Datas {
  data:Omit<IData,"pass">,
  isError:boolean;
  isLoading:boolean
}

export default function Regist():JSX.Element{
  const methods = useForm<IStateUser>({
    defaultValues:{name:"",pass:""}
  });
  const {handleSubmit,reset} = methods;
  const navigate:NavigateFunction = useNavigate();
  const [error,setError] = useState<err>({show:false,mess:""});
  const [addUser] = useAddUserMutation<Datas>();

  const check:TSub<IStateUser> = async (date):Promise<void>=>{
    const body:ISubProps = {...date,regist:true};
    const already:IHas = await GetSuccess(body);
    if (date.name && date.pass){
     if (already.has){
      setError({show:true,mess:"user is already exists"});
      reset();
      return;
     }
      addUser(date);
      navigate('/');
    } else {
      setError({show:true,mess:"no correct"});
      reset();
    }
  }

    return (
      <FormProvider {...methods}>
        <EntryBlock> 
          <EntryTitle>
             Registration
          </EntryTitle>
          <LoginCard />
          {error.show&&
          <LoginError>
             {error.mess}
          </LoginError>}
          <EntryBut
           onClick={handleSubmit(check)}>
             regist
          </EntryBut>
        </EntryBlock>
      </FormProvider>
    );
}