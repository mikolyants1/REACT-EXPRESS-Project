import { Navigate, Params, useOutletContext,
 useParams } from "react-router-dom";
import {  HeaderBlock,SetContain, SetMain,
SetTitle} from "../../../style/style.js";
import { useCallback,useState} from "react";
import { bind, useAction } from "../../../store/store.js";
import {  EvtC, EvtK, data, outlet, query,
 union } from "../../../types/type.js";
import { Error, Loader } from "../../ui/Loader.js";
import { useChanUserMutation, useDelUserMutation,
 useGetUserQuery } from "../../../store/api/endpoints.js";
import UserSetBlock from "../../ui/inputs/User.js";
import ThemeSetBlock from "../../ui/inputs/Theme.js";
import ProfileLogoCard from "../../ui/cards/setcards/ProfileLogoCard.js";
import PassCard from "../../ui/cards/setcards/PassCard.js";
import AccButton from "../../ui/buttons/Account.js";

interface state{
  name:string,
  pass:string,
}

interface Props{
  children:JSX.Element
}

export default function Setting({children}:Props):JSX.Element{
 const {val,user,lang,translate} = useOutletContext<outlet>();
 const {id}:Readonly<Params<string>> = useParams();
 const [auth,setAuth] = useState<boolean>(false);
 const [state,setState] = useState<state>({name:'',pass:''});
const {data,isError,isLoading} = useGetUserQuery<query<data>>(user);
 const [chanData] = useChanUserMutation();
 const [delData] = useDelUserMutation();
 const {setLang,setTheme}:bind = useAction();

 const toogle=(set:union)=>(e:EvtC)=>{
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
 },[])
 const press=useCallback((e:EvtK):void=>{
   if (e.key==='Enter'){
    const {name,pass}:state = state;
    if (typeof data!=='undefined'){
    if (e.currentTarget.name=='name'&&name!==''){
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
  },[data]);
  
 if (auth) return <Navigate to='/' />
 if (isLoading) return <Loader back={val} />
 if (isError) return <Error back={val} />
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
         <PassCard
          name={translate("password")}
          value={data.pass}
         />
         <UserSetBlock
          set={change}
          val={data?.name}
          click={press}
          name='name'
          />
         <UserSetBlock
          set={change}
          val={data?.pass}
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
