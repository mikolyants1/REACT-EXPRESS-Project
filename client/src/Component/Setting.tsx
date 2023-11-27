import { Navigate, Params, useOutletContext,
 useParams } from "react-router-dom";
import {  HeaderBlock, LogoText, ProfileBlock,
 ProfileChan,ProfileDel, ProfileDis, ProfileLogo,
 ProfileName,ProfilePhone,ProfileText, SetContain, SetMain,
 SetTitle, avatar, styleObj } from "../style/style.js";
import { useCallback,useState} from "react";
import { useChanUserMutation, useDelUserMutation,
 useGetUserQuery } from "../store/Api.js";
import { bind, useAction } from "../store/store.js";
import {  EvtC, EvtK, data, outlet, query, union } from "../types/type.js";
import { Loader, Error } from "./Loader.js";
import { SetTheme, SetUser } from "./SettInform.js";

interface state{
  name:string,
  phone:string,
}

interface Props{
  children:JSX.Element
}

export default function Setting({children}:Props):JSX.Element{
 const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)];
 const color:string[] = ['white','black'];
 const langaues:string[] = ["en","ru"];
 const {val,user,lang,translate} = useOutletContext<outlet>();
 const {id}:Readonly<Params<string>> = useParams();
 const [auth,setAuth] = useState<boolean>(false);
 const [state,setState] = useState<state>({name:'',phone:''});
const {data,isError,isLoading} = useGetUserQuery<query<data>>(user);
 const [chanData] = useChanUserMutation();
 const [delData] = useDelUserMutation();
 const {setId,setLang,setTheme}:bind = useAction();

 const toogle=(set:union)=>(e:EvtC)=>{
   set(e.target.value);
 };
 const change=useCallback((e:EvtC):void=>{
  setState((prev:state)=>({
   ...prev,[e.target.name]:e.target.value
    }));
 },[data]);
 const press=useCallback((e:EvtK):void=>{
   if (e.key==='Enter'){
    const {name,phone}:state = state;
    if (typeof data!=='undefined'){
    if (e.currentTarget.name=='name'&&name!==''){
        chanData({
          id:data.id,
          name:name,
          phone:data.phone,
        });
     };
    if (e.currentTarget.name=='phone'&&phone!==''){
        chanData({
          id:data.id,
          name:data.name,
          phone:phone,
        });
       setId(phone);
      };
    };
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
         <ProfileBlock>
           <ProfileLogo two={two} start={one}>
            <LogoText>
              {data?.name.slice(0,1).toUpperCase()}
            </LogoText>
          </ProfileLogo>
          <ProfileText>
            <ProfileDis>
            {translate("name")}
            </ProfileDis>
            <ProfileName>
             {data?.name}
            </ProfileName>
          </ProfileText>
        </ProfileBlock>  
        <ProfilePhone>
          <ProfileText>
            <ProfileDis>
              {translate("phone")}
            </ProfileDis>
            <ProfileName>
             {data?.phone}
            </ProfileName>
          </ProfileText>
        </ProfilePhone>
         <SetUser
          set={change}
          val={data?.name}
          click={press}
          name='name'
          />
         <SetUser
          set={change}
          val={data?.phone}
          click={press}
          name='phone'
          />
        <ProfilePhone>
          <ProfileChan>
            <ProfileDel 
             onClick={()=>setAuth(true)}>
              {translate('Exit')}
            </ProfileDel>
            <ProfileDel
             onClick={()=>delData(data?.id)}>
              {translate('Delete account')}
            </ProfileDel>
          </ProfileChan>
        </ProfilePhone>
      </>
       ):(
        <>
         <SetTheme
          arr={color}
          change={toogle(setTheme)}
          back={val}
          name="theme"
          />  
         <SetTheme
          arr={langaues}
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
