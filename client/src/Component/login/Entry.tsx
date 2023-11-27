import { EntryBlock, EntryBut, EntryInput, EntrySub,
 EntryTitle, InputBlock } from "../../style/style.js";
import { useReducer } from "react";
import { Navigate } from "react-router-dom";
import { bind, useAction } from "../../store/store.js";
import { Error, Loader } from "../Loader.js";
import { EvtC, EvtK,Str,data, query} from "../../types/type.js";
import { useGetUsersQuery } from "../../store/Api.js";

 interface state {
  text:string,
  auth:boolean,
  reg:boolean
 }
 type action = Record<string,Str<boolean>>

export default function Entry():JSX.Element{
  const {data,isError,isLoading} = useGetUsersQuery<query<data[]>>('')
  const [state,dispatch] = useReducer(
  (prev:state,next:action)=>({...prev,...next}),
  {text:"",auth:false,reg:false});
  const { setId }:bind = useAction();

  const change=(e:EvtC):void=>{
   dispatch({text:e.target.value});
  };
  const check=():void=>{
   if (typeof data !== "undefined"){
    if (data.some(({phone}:data)=>phone==state.text)){
      dispatch({auth:true});
      setId(state.text);
     }else{
      dispatch({reg:true});
      };
    };
  };
  const handler=(e:EvtK):void=>{
   if (e.key==='Enter') check();
  };
  
  if (state.auth){
    return <Navigate to={`/page/main/${state.text}`} />
  };
  if (state.reg){
    return <Navigate to={`/reg/${state.text}`} />
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
             Phone
          </EntryTitle>
          <EntrySub>
             Enter your phone number
          </EntrySub>
          <InputBlock>
            <EntryInput
             onChange={change}
             onKeyUp={handler}
               />
            </InputBlock>
            <EntryBut onClick={check}>
              login
            </EntryBut>
          </>
          )}
        </EntryBlock>
       );
};