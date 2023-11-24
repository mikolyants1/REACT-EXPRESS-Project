import { EntryBlock, EntryBut, EntryInput, EntrySub,
 EntryTitle, InputBlock } from "../style/style.js";
import { useState,useReducer, useEffect} from "react";
import axios, { AxiosResponse } from "axios";
import { Navigate } from "react-router-dom";
import { bind, useAction } from "../store/store.js";
import { Error, Loader } from "./Loader.js";
import { EvtC, EvtK, action1, data, state } from "../types/type.js";

export default function Entry():JSX.Element{
  const [text,setText] = useState<string>('');
  const [auth,setAuth] = useState<boolean>(false);
  const [reg,setReg] = useState<boolean>(false);
  const { setId }:bind = useAction();
  const [state,dispatch] = useReducer(
  (prev:state,next:action1)=>({...prev,...next}),
  {data:null,err:false,load:true}
  );
  const change=(e:EvtC):void=>{
    setText(e.target.value);
  };
  const check=():void=>{
    if (state.data.some(({phone}:data)=>phone==text)){
     setAuth(true);
     setId(text);
    }else{
     setReg(true)
    };
  };
  const handler=(e:EvtK):void=>{
   if (e.key==='Enter') check();
  };
  useEffect(():void=>{
   async function Prom():Promise<void>{
    return await axios.get('http://localhost:5000/user')
    .then(({data}:AxiosResponse<data[]>)=>dispatch({data:data}))
    .catch(()=>dispatch({err:true}))
    .finally(()=>dispatch({load:false}))
   };
   Prom();
  },[]);
  
  if (auth){
    return <Navigate to={`/page/main/${text}`} />
  };
  if (reg){
    return <Navigate to={`/reg/${text}`} />
  };
    return (
        <EntryBlock>
            {state.load ? (
              <Loader back="white" />
            ) : state.err ? (
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
          )};
        </EntryBlock>
       );
};