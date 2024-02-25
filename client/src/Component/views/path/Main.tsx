import { useRef,useReducer, useCallback } from 'react'
import { Container, FootBlock,MainInput} from '../../../style/style.js'
import { useOutletContext, useParams } from 'react-router-dom'
import { useChanMessMutation,useSetMessMutation} from '../../../store/api/endpoints/DialogEndpoints.js'
import { EvtC, EvtK, ITime, act1, data,newMess, outlet, query, st1 } from '../../../types/type.js';
import { useGetUserQuery } from '../../../store/api/endpoints/UserEndpoints.js';
import { defaultState2, reduce } from '../../helpers/Reducer.js';
import Loader from '../../ui/blocks/load/Loader.js';
import Error from '../../ui/blocks/load/Error.js';
import Header from '../../ui/blocks/main/Header.js';
import MessageList from '../../ui/blocks/main/MessageList.js';
import getMessage from '../../helpers/functions/main/GetMessage.js';
import createTime from '../../helpers/functions/time/createTime.js';

export default function Main():JSX.Element {
 const id:number = Number(useParams().id);
 const [addMess] = useSetMessMutation<data[]>();
 const [chanMess] = useChanMessMutation<data[]>();
 const ref = useRef<HTMLInputElement>(null!);
 const {val,user,translate} = useOutletContext<outlet>();
 const [state,dispatch] = useReducer(reduce<st1,act1>,defaultState2)
 const result:query<data>[] = [
  useGetUserQuery<query<data>>(id),
  useGetUserQuery<query<data>>(user),
  ];
 
 const change = ({target}:EvtC):void =>{
   dispatch({text:target.value});
 };

 const press = (e:EvtK):void =>{
  if (e.key === 'Enter'&& typeof id !== 'undefined'){
    if (!state.status){
     const {date,month,day}:ITime = createTime();
     addMess({
      id1:id,id2:user,
      text:state.text,
      date,day,month,
      now:Date.now(),
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
     ref.current.value = "";
     ref.current.blur();
   };
 };
 
 const updateDioalog = useCallback((time:number):void=>{
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
