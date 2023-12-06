import { Navigate, Params, useOutletContext,
 useParams } from "react-router-dom";
import {  HeaderBlock, LogoText, ProfileBlock,
 ProfileChan,ProfileDel, ProfileDis, ProfileLogo,
 ProfileName,ProfilePass,ProfileText, SetContain, SetMain,
 SetTitle, avatar, styleObj } from "../../../style/style.js";
import { useCallback,useState} from "react";
import { bind, useAction } from "../../../store/store.js";
import {  EvtC, EvtK, data, outlet, query,
 union } from "../../../types/type.js";
import { SetTheme, SetUser } from "./children/SettInform.js";
import { Error, Loader } from "../../ui/Loader.js";
import { useChanUserMutation, useDelUserMutation,
 useGetUserQuery } from "../../../store/api/endpoints.js";

interface state{
  name:string,
  pass:string,
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
 const [state,setState] = useState<state>({name:'',pass:''});
const {data,isError,isLoading} = useGetUserQuery<query<data>>(user);
 const [chanData] = useChanUserMutation();
 const [delData] = useDelUserMutation();
 const {setLang,setTheme}:bind = useAction();

 const toogle=(set:union)=>(e:EvtC)=>{
   set(e.target.value);
 };
 const change=useCallback((e:EvtC):void=>{
  setState((prev:state)=>({
   ...prev,[e.target.name]:e.target.value
    }));
 },[data]);
 const deleteUser=():void=>{
  delData(data?.id);
  setAuth(true);
 };
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
        <ProfilePass>
          <ProfileText>
            <ProfileDis>
              {translate("password")}
            </ProfileDis>
            <ProfileName>
             {data?.pass}
            </ProfileName>
          </ProfileText>
        </ProfilePass>
         <SetUser
          set={change}
          val={data?.name}
          click={press}
          name='name'
          />
         <SetUser
          set={change}
          val={data?.pass}
          click={press}
          name='pass'
          />
        <ProfilePass>
          <ProfileChan>
            <ProfileDel onClick={()=>setAuth(true)}>
              {translate('Exit')}
            </ProfileDel>
            <ProfileDel onClick={deleteUser}>
              {translate('Delete account')}
            </ProfileDel>
          </ProfileChan>
        </ProfilePass>
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
