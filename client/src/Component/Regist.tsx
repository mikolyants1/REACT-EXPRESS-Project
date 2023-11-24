import { Navigate, Params, useParams } from "react-router-dom"
import {  useState } from "react"
import { EntryBlock,EntryTitle,EntryInput,EntrySub,
EntryBut,InputBlock } from '../style/style.js'
import { bind, useAction } from "../store/store.js"
import { useAddUserMutation } from "../store/Api.js"
import { EvtC, EvtK } from "../types/type.js"

export default function Regist():JSX.Element{
  const {id}:Readonly<Params<string>> = useParams();
  const [name,setName] = useState<string>('');
  const [auth,setAuth] = useState<boolean>(false);
  const {setId}:bind = useAction();
  const [addUser] = useAddUserMutation();

  const change=(e:EvtC):void=>{
    setName(e.target.value);
  };
  const check=():void=>{
    if (name&&typeof id!=='undefined'){
      setAuth(true);
      setId(id);
      addUser({name:name,phone:id});
    };
  };
  const handler=(e:EvtK):void=>{
   if (e.key==='Enter') check();
  };

  if (auth){
    return <Navigate to={`/page/main/${id}`} />
  };
    return (
        <EntryBlock> 
          <EntryTitle>
             Name
          </EntryTitle>
          <EntrySub>
            Enter your nickname
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
        </EntryBlock>
    );
};