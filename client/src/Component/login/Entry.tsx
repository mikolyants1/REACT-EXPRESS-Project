import { EntryBlock, EntryBut, EntryInput, EntrySub,
 EntryTitle, InputBlock, LoginError, RegistLink } from "../../style/style.js";
import { useReducer, useState } from "react";
import { Navigate } from "react-router-dom";
import { bind, getCurrent, useAction, useAppSelector } from "../../store/store.js";
import { Error, Loader } from "../Loader.js";
import { EvtC, EvtK,Str,Type,data, query, stateUser} from "../../types/type.js";
import { useGetUsersQuery } from "../../store/endpoints.js";
import { Link } from "react-router-dom";

 type action = Record<string,Str<boolean>>

export default function Entry():JSX.Element{
  const {data,isError,isLoading} = useGetUsersQuery<query<data[]>>('');
  const current:number = useAppSelector(getCurrent);
  const [state,dispatch] = useReducer(
  (prev:stateUser,next:action)=>({...prev,...next}),
  {name:"",pass:"",auth:false});
  const [error,setError] = useState<boolean>(false);
  const { setId }:bind = useAction();

  const change=({target}:EvtC):void=>{
   dispatch({[target.name]:target.value});
  };
  const check=():void=>{
   if (typeof data !== "undefined"){
    const {name,pass}:stateUser = state;
    const user:Type<data> = data.find((i:data)=>(
      i.name == name && i.pass == pass
    ));
    if (user){
      dispatch({auth:true});
      setId(user.id);
     }else{
      setError(true);
      };
    };
  };
  const handler=(e:EvtK):void=>{
   if (e.key==='Enter') check();
  };
  
  if (state.auth){
    return <Navigate to={`/page/main/${current}`} />
  };
    return (
        <EntryBlock>
            {isLoading ? (
              <Loader back="white" />
            ) : isError ? (
             <Error back="white" />
            ) : (
         <>
          <EntryTitle>
             Entrance
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
          {error&&<LoginError>
            user not found
          </LoginError>}
          <EntryBut onClick={check}>
            login
          </EntryBut>
          <RegistLink>
            <Link to={`/reg`}>
              registration
            </Link>
          </RegistLink>
        </>
        )}
      </EntryBlock>
       );
};