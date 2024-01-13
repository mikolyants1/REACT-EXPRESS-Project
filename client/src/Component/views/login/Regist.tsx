import { useNavigate,NavigateFunction } from "react-router-dom"
import { useState } from "react"
import { EntryBlock,EntryTitle,EntryBut,LoginError } from '../../../style/style.js'
import { useAddUserMutation } from "../../../store/api/endpoints/UserEndpoints.js"
import { Sub, SubProps, data, has, stateUser } from "../../../types/type.js"
import {useForm,FormProvider} from 'react-hook-form';
import LoginCard from "../../ui/cards/logincards/LoginCard.js"
import GetSuccess from "../../helpers/functions/GetSuccess.js"

interface err{
   show:boolean,
   mess:string
}
interface Datas {
  data:Omit<data,"pass">,
  isError:boolean;
  isLoading:boolean
}
export default function Regist():JSX.Element{
  const methods = useForm<stateUser>({
    defaultValues:{name:"",pass:""}
  });
  const {handleSubmit,reset} = methods;
  const navigate:NavigateFunction = useNavigate();
  const [error,setError] = useState<err>({show:false,mess:""});
  const [addUser] = useAddUserMutation<Datas>();

  const check:Sub<stateUser> = async (date):Promise<void>=>{
    const body:SubProps = {...date,regist:true};
    const already:has = await GetSuccess(body);
    if (date.name&&date.pass){
     if (already.has){
      setError({show:true,mess:"user is already exists"});
       reset();
       return;
     };
      addUser(date);
      navigate('/');
    } else {
      setError({show:true,mess:"no correct"});
      reset();
    };
  };

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
};