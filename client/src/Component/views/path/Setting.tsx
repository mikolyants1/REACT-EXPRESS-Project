import { Location, Navigate, useLocation, useOutletContext,} from "react-router-dom";
import {  HeaderBlock,SetContain, SetMain,
SetTitle} from "../../../style/style.js";
import { useCallback,useState} from "react";
import { bind, getPass,useAction, useAppSelector } from "../../../store/store.js";
import {  EvtC, EvtK, data, outlet, query,
 union } from "../../../types/type.js";
import { useChanUserMutation, useDelUserMutation,
 useGetUserQuery } from "../../../store/api/endpoints/UserEndpoints.js";
import UserSetBlock from "../../ui/inputs/User.js";
import ThemeSetBlock from "../../ui/inputs/Theme.js";
import ProfileLogoCard from "../../ui/cards/setcards/ProfileLogoCard.js";
import AccButton from "../../ui/buttons/Account.js";
import Loader from "../../ui/blocks/load/Loader.js";
import Error from "../../ui/blocks/load/Error.js";

interface state{
  name:string,
  pass:string,
}

interface Props{
  children:JSX.Element
}

export default function Setting({children}:Props):JSX.Element{
 const {val,user,lang,translate} = useOutletContext<outlet>();
 const {data,isError,isLoading} = useGetUserQuery<query<data>>(user);
 const [state,setState] = useState<state>({name:'',pass:''});
 const {state:id}:Location<string> = useLocation();
 const [auth,setAuth] = useState<boolean>(false);
 const password:string = useAppSelector(getPass);
 const [chanData] = useChanUserMutation();
 const [delData] = useDelUserMutation();
 const {setLang,setTheme}:bind = useAction();
 const toogle=(set:union)=>(e:EvtC):void=>{
   set(e.target.value);
 };
 const change=useCallback((e:EvtC):void=>{
  setState((prv:state)=>({
   ...prv,[e.target.name]:e.target.value
    }));
 },[data]);

 const deleteUser=useCallback(():void=>{
  delData(data?.id);
  setAuth(true);
 },[]);

 const exit=useCallback(():void=>{
   setAuth(true);
 },[]);

 const press=useCallback((e:EvtK):void=>{
   if (e.key==='Enter'){
    const {name,pass}:state = state;
    if (typeof data!=='undefined'){
    if (e.currentTarget.name=='name'&&name!==''){
      console.log("work")
        chanData({
          id:data.id,
          name:name,
          pass:data.pass
        });
     };
    if (e.currentTarget.name=='pass'&&pass!==''){
        chanData({
          id:data.id,
          name:data.name,
          pass:pass
        });
      };
    };
    setAuth(true);
  };
  },[state]);
  
 if (auth) return <Navigate to='/' />;
 if (isLoading) return <Loader back={val} />;
 if (isError) return <Error back={val} />;
    return (
      <SetContain val={val}>
        <HeaderBlock back={val}>
          <SetTitle>
            {translate&&translate(`${id}`)}
          </SetTitle>
          {children}
        </HeaderBlock>
        <SetMain> 
        {id=='Profile'? (
        <>
         <ProfileLogoCard
          name={data.name}
          logoText={translate("name")}
         />
         <UserSetBlock
          set={change}
          val={data?.name}
          click={press}
          name='name'
          />
         <UserSetBlock
          set={change}
          val={password}
          click={press}
          name='pass'
          />
         <AccButton
          exit={exit}
          del={deleteUser}
          exitText={translate("Exit")}
          delText={translate("Delete account")}
          />
      </>
       ):(
        <>
         <ThemeSetBlock
          idx={0}
          change={toogle(setTheme)}
          back={val}
          name="theme"
          />  
         <ThemeSetBlock
          idx={1}
          change={toogle(setLang)}
          back={lang}
          name="language"
          />  
        </>  
         )}
       </SetMain>
     </SetContain>
  );
};
