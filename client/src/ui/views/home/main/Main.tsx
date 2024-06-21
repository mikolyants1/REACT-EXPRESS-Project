import { useRef,useReducer, useCallback } from 'react'
import { Container, FootBlock,MainInput} from '../../../../libs/style/style.js'
import { useOutletContext, useParams } from 'react-router-dom'
import { TEvtC, TEvtK, ITime, IData,INewMess, IOutlet, IQuery, IHomeState, THomeAction } from '../../../../libs/types/index.js';
import { useGetUserQuery } from '../../../../model/store/api/endpoints/userEndpoints.js';
import { useChanMessMutation, useSetMessMutation } from '../../../../model/store/api/endpoints/dialogEndpoints.js';
import { HomeReducer } from '../../../../model/reducers/home';
import createTime from '../../../../model/functions/time/createTime';
import Loader from '../../../../ui/cards/loading/Loader';
import Error from '../../../../ui/cards/loading/Error';
import { HomeDefState } from '../../../../libs/defaultStates/HomeDefState';
import getMessage from '../../../../model/functions/get/GetMessage';
import Header from './content/Header';
import MessageList from './content/MessageList';

export default function Main():JSX.Element {
 const id:number = Number(useParams().id);
 const [addMess] = useSetMessMutation<IData[]>();
 const [chanMess] = useChanMessMutation<IData[]>();
 const ref = useRef<HTMLInputElement>(null!);
 const {theme,user,translate} = useOutletContext<IOutlet>();
 const [state,dispatch] = useReducer(HomeReducer<IHomeState,THomeAction>,HomeDefState);

 const result:IQuery<IData>[] = [
   useGetUserQuery<IQuery<IData>>(id),
   useGetUserQuery<IQuery<IData>>(user),
 ];
 
 const change = ({target}:TEvtC):void =>{
   dispatch({text:target.value});
 };

 const press = (e:TEvtK):void =>{
  if (e.key === 'Enter' && typeof id !== 'undefined'){
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
    }
     ref.current.value = "";
     ref.current.blur();
   }
 };
 
 const updateDioalog = useCallback((time:number):void=>{
  dispatch({status:true,now:time});
  ref.current.focus();
 },[]);
 
 if (result.some(({isLoading})=>isLoading)){
   return <Loader back={theme} />;
 }

 if (result.some(({isError})=>isError)){
   return <Error back={theme} />;
 }

 const [{data:d1},{data:d2}]:IQuery<IData>[] = result;
 if (!d1||!d2) return <Error back={theme} />;
 const mess:INewMess[] = getMessage(d1,d2);

  return (
    <Container back={theme}>
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
         back={theme}
         placeholder={translate('your message')}
         onChange={change}
         onKeyUp={press}
         ref={ref}
         />
      </FootBlock>
    </Container>
  );
}
