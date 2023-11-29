import { Navigate } from "react-router-dom"
import {  useState } from "react"
import { EntryBlock,EntryTitle,EntryInput,EntrySub,
EntryBut,InputBlock,LoginError } from '../../style/style.js'
import { bind, getCurrent, useAction, useAppSelector } from "../../store/store.js"
import { useAddUserMutation, useGetUsersQuery } from "../../store/endpoints.js"
import { EvtC, EvtK, Type, data, query, stateUser } from "../../types/type.js"
import { Loader ,Error } from "../Loader.js"
 
type state = Omit<stateUser,"auth">
interface err{
   show:boolean,
   mess:string
}
export default function Regist():JSX.Element{
  const {data,isError,isLoading} = useGetUsersQuery<query<data[]>>('')
  const current:number = useAppSelector(getCurrent);
  const [user,setUser] = useState<state>({name:"",pass:""});
  const [auth,setAuth] = useState<boolean>(false);
  const [error,setError] = useState<err>({show:false,mess:""});
  const {setId}:bind = useAction();
  const [addUser] = useAddUserMutation();

  const change=({target}:EvtC):void=>{
    setUser((prv:state)=>({
      ...prv,[target.name]:target.value
    }))
  };
  const check=():void=>{
    const {name,pass}:state = user;
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
      setAuth(true);
      setId(userId+1);
      addUser(user);
    } else {
      setError({show:true,mess:"no correct"});
    };
  };
  const handler=(e:EvtK):void=>{
   if (e.key==='Enter') check();
  };

  if (auth){
    return <Navigate to={`/page/main/${current}`} />
  };
  if (isLoading) return <Loader back="white" />;
  if (isError) return <Error back="white" />
    return (
        <EntryBlock> 
          <EntryTitle>
             Registration
          </EntryTitle>
          <EntrySub>
             Enter your username
          </EntrySub>
          <InputBlock>
            <EntryInput
             onChange={change}
             onKeyUp={handler}
             name="name"
               />
          </InputBlock>
          <EntrySub>
             Enter your password
          </EntrySub>
          <InputBlock>
            <EntryInput
             onChange={change}
             onKeyUp={handler}
             name="pass"
               />
          </InputBlock>
          {error.show&&
          <LoginError>
             {error.mess}
          </LoginError>}
          <EntryBut onClick={check}>
             regist
          </EntryBut>
        </EntryBlock>
    );
};