import { useNavigate,NavigateFunction } from "react-router-dom"
import {  useState } from "react"
import { EntryBlock,EntryTitle,EntryBut,LoginError } from '../../../style/style.js'
import { bind, getCurrent, useAction, useAppSelector } from "../../../store/store.js"
import { useAddUserMutation, useGetUsersQuery } from "../../../store/api/endpoints.js"
import {  Type, data, query, stateUser } from "../../../types/type.js"
import { Loader ,Error } from "../../ui/Loader.js"
 import {useForm,FormProvider,SubmitHandler} from 'react-hook-form';
import LoginCard from "../../ui/cards/logincards/LoginCard.js"

interface err{
   show:boolean,
   mess:string
}
export default function Regist():JSX.Element{
  const {data,isError,isLoading} = useGetUsersQuery<query<data[]>>('')
  const current:number = useAppSelector(getCurrent);
  const methods = useForm<stateUser>();
  const {handleSubmit} = methods;
  const navigate:NavigateFunction = useNavigate();
  const [error,setError] = useState<err>({show:false,mess:""});
  const {setId}:bind = useAction();
  const [addUser] = useAddUserMutation();

  const check:SubmitHandler<stateUser>=(date):any=>{
    const {name,pass}:stateUser = date;
    const already:Type<data> = data.find((i:data)=>(
      i.name == name && i.pass == pass
    ));
   if (name&&pass){
    if (already){
     setError({show:true,mess:"user is already exists"});
      return;
    }
    const sortId:number = [...data].sort(
    (x:data,y:data)=>y.id-x.id)[0].id;
    const userId:number = data.length !== 0 ? sortId : 0;
      setId(userId+1);
      addUser(date);
      navigate(`/page/main/${current}`);
    } else {
      setError({show:true,mess:"no correct"});
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