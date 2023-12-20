import { useNavigate,NavigateFunction } from "react-router-dom"
import {  useState } from "react"
import { EntryBlock,EntryTitle,EntryBut,LoginError } from '../../../style/style.js'
import { bind, getCurrent, useAction, useAppSelector } from "../../../store/store.js"
import { useAddUserMutation, useGetUsersQuery } from "../../../store/api/endpoints/UserEndpoints.js"
import { data,query, stateUser } from "../../../types/type.js"
import {useForm,FormProvider,SubmitHandler} from 'react-hook-form';
import LoginCard from "../../ui/cards/logincards/LoginCard.js"
import Loader from "../../ui/blocks/Loader.js"
import Error from "../../ui/blocks/Error.js"
import GetSuccess from "../../helpers/GetSuccess.js"

interface err{
   show:boolean,
   mess:string
}
export default function Regist():JSX.Element{
  const {data,isError,isLoading} = useGetUsersQuery<query<data[]>>('')
  const current:number = useAppSelector(getCurrent);
  const methods = useForm<stateUser>({
    defaultValues:{name:"",pass:""}
  });
  const {handleSubmit,reset} = methods;
  const navigate:NavigateFunction = useNavigate();
  const [error,setError] = useState<err>({show:false,mess:""});
  const {setId,setPass}:bind = useAction();
  const [addUser] = useAddUserMutation();

  const check:SubmitHandler<stateUser>=async (date):Promise<void>=>{
    const {name,pass}:stateUser = date;
    const already = await GetSuccess(name,pass);
   if (name&&pass){
    if (already.has){
     setError({show:true,mess:"user is already exists"});
      reset();
      return;
    }
    if (typeof data == "undefined") return;
    const sortId:data[] = [...data]
    .sort((x:data,y:data)=>y.id-x.id);
    const userId:number = data.length !== 0 ? sortId[0].id : 0;
      setId(userId+1);
      setPass(pass);
      addUser(date);
      navigate(`/page/main/${current}`);
    } else {
      setError({show:true,mess:"no correct"});
      reset();
    };
  };

  if (isLoading) return <Loader back="white" />;
  if (isError) return <Error back="white" />
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
          <EntryBut onClick={handleSubmit(check)}>
             regist
          </EntryBut>
        </EntryBlock>
      </FormProvider>
    );
};