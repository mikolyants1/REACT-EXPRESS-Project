import { useRef,useReducer, useCallback } from 'react'
import { Container, FootBlock,MainInput} from '../../../style/style.js'
import { useOutletContext, useParams } from 'react-router-dom'
import { useChanMessMutation,useSetMessMutation
} from '../../../store/api/endpoints/DialogEndpoints.js'
import { EvtC, EvtK, Type, act1, data, mess, message,
newMess, outlet, query, st1 } from '../../../types/type.js';
import { useGetUserQuery } from '../../../store/api/endpoints/UserEndpoints.js';
import { defaultState2, reduce } from '../../helpers/Reducer.js';
import Loader from '../../ui/blocks/load/Loader.js';
import Error from '../../ui/blocks/load/Error.js';
import Header from '../../ui/blocks/main/Header.js';
import MessageList from '../../ui/blocks/main/MessageList.js';

export default function Main():JSX.Element {
 const id:number = Number(useParams().id);
 const [addMess] = useSetMessMutation();
 const [chanMess] = useChanMessMutation();
 const ref = useRef<HTMLInputElement>(null!);
 const {val,user,translate} = useOutletContext<outlet>();
 const [state,dispatch] = useReducer(reduce<st1,act1>,defaultState2)
 const result:query<data>[] = [
  useGetUserQuery<query<data>>(id),
  useGetUserQuery<query<data>>(user),
  ];
 const getMessage=(d1:data,d2:data):newMess[]=>{
  const user1:Type<message> = d1.message.find((i:message)=>i.id==d2.id);
  const user2:Type<message> = d2.message.find((i:message)=>i.id==d1.id);
  const newUser1:Type<newMess[]> = user1?.mess.map((i:mess)=>({id:d2.id,...i}));
  const newUser2:Type<newMess[]> = user2?.mess.map((i:mess)=>({id:d1.id,...i}));
  const item1:newMess[] = typeof newUser1!=='undefined' ? newUser1 : [];
  const item2:newMess[] = typeof newUser2!=='undefined' ? newUser2 : [];
  const arr:newMess[] = d2.id==d1.id ? [...item1] : [...item1,...item2];
  return arr.sort((x:newMess,y:newMess)=>x.now-y.now);
  }
 
 const change=({target}:EvtC):void=>{
   dispatch({text:target.value});
 };
 const press=(e:EvtK):void=>{
  if (e.key==='Enter'&&typeof id!=='undefined'){
    if (!state.status){
     const date:Date = new Date();
     const our:number = date.getHours();
     const min:number = date.getMinutes();
     const Our:string = our<10 ? `0${our}` : `${our}`;
     const Min:string = min<10 ? `0${min}` : `${min}`;
     addMess({
      id1:id,
      id2:user,
      text:state.text,
      date:`${Our}:${Min}`,
      now:Date.now(),
      day:date.getDate(),
      month:date.toLocaleString('en-EN',{month:'long'})
     });
    } else {
      chanMess({
        id1:id,
        id2:user,
        text:state.text,
        now:state.now,
       });
      dispatch({status:false});
    };
     ref.current.value='';
     ref.current.blur();
   };
 };
 
 const updateDioalog=useCallback((time:number):void=>{
    dispatch({status:true,now:time});
    ref.current.focus();
 },[]);
 
 if (result.some(({isLoading})=>isLoading)){
   return <Loader back={val} />;
 };

 if (result.some(({isError})=>isError)){
   return <Error back={val} />;
 };

 const [{data:d1},{data:d2}]:query<data>[] = result;
 if (!d1||!d2) return <Error back={val} />;
 const mess:newMess[] = getMessage(d1,d2);
   return (
        <Container back={val}>
          <Header
           name={d1.name}
           isMine={d1.id == d2.id}
           />
          <MessageList
           update={updateDioalog}
           mess={mess}
           id={id}
           />
          <FootBlock>
            <MainInput 
             back={val}
             placeholder={translate('your message')}
             onChange={change}
             onKeyUp={press}
             ref={ref}
             />
          </FootBlock>
        </Container>
  );
};
