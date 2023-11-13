import { Navigate, Params, useOutletContext, useParams } from "react-router-dom";
import {  HeaderBlock, LogoText, ProfileBlock, ProfileBut, ProfileChan,
ProfileDel, ProfileDis, ProfileInput, ProfileLogo, ProfileName,ProfilePhone,
ProfileText, SetContain, SetMain, SetTitle, ThemeBlock, ThemeInput,
ThemeText, avatar, styleObj } from "../style/style.js";
import { NamedExoticComponent, memo, useCallback, useState} from "react";
import { useChanUserMutation, useDelUserMutation,
 useGetUserQuery } from "../store/Api.js";
import { bind, useAction } from "../store/store.js";
import {  EvtC, EvtK, data, outlet } from "./Main.js";
import { Loader, Error } from "./Loader.js";

interface state{
  name:string,
  phone:string
}

export interface query{
  data:data,
  isError:boolean,
  isLoading:boolean
}
interface Props{
  children:JSX.Element
}

export default function Setting({children}:Props):JSX.Element{
 const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)]
 const color:string[] = ['white','black']
 const {val,user,set} = useOutletContext<outlet>()
 const {id}:Readonly<Params<string>> = useParams()
 const [auth,setAuth] = useState<boolean>(false)
 const [state,setState] = useState<state>({name:'',phone:''})
const {data,isError,isLoading} = useGetUserQuery<query>(user)
 const [chanData] = useChanUserMutation()
 const [delData] = useDelUserMutation()
 const {setId}:bind = useAction()

 const toogle=(e:EvtC):void=>{
   set(e.target.value)
 }
 const change=useCallback((e:EvtC):void=>{
  setState((prev:state)=>({
   ...prev,[e.target.name]:e.target.value
    }))
 },[data])
 const press=useCallback((e:EvtK):void=>{
   if (e.key==='Enter'){
    const {name,phone}:state = state
    if (typeof data!=='undefined'){
    if (e.currentTarget.name=='name'&&name!==''){
          chanData({
            id:data.id,
            name:name,
            phone:data.phone
          })
     }
    if (e.currentTarget.name=='phone'&&phone!==''){
        chanData({
          id:data.id,
          name:data.name,
          phone:phone
        })
       setId(phone)
      }
    }
  }
  },[data])
  
 if (auth){
  return <Navigate to='/' />
 }
 if (isLoading) return <Loader back={val} />
 if (isError) return <Error back={val} />
    return (
      <SetContain val={val}>
        <HeaderBlock back={val}>
          <SetTitle>
            {id}
          </SetTitle>
          {children}
        </HeaderBlock>
        <SetMain> 
        {id=='Profile'? (
        <>
         <ProfileBlock>
           <ProfileLogo start={one} two={two}>
            <LogoText>
              {data?.name.slice(0,1).toUpperCase()}
            </LogoText>
           </ProfileLogo>
           <ProfileText>
             <ProfileDis>
                 name
             </ProfileDis>
             <ProfileName>
               {data?.name}
             </ProfileName>
           </ProfileText>
         </ProfileBlock>  
         <ProfilePhone>
           <ProfileText>
             <ProfileDis>
                 phone
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
              Exit
            </ProfileDel>
            <ProfileDel
             onClick={()=>delData(data?.id)}>
              Delete account
            </ProfileDel>
          </ProfileChan>
        </ProfilePhone>
      </>
      ):(
      <>
        <ProfilePhone>
          <ProfileName>
            Theme
          </ProfileName>
           {color.map((i:string):JSX.Element=>(
              <ThemeBlock>
                <ThemeInput
                 key={`${i}s`}
                 onChange={toogle}
                 checked={val==i}
                 value={i}
                 type="radio"
                 name="theme" 
                  />
                <ThemeText>
                  {i}
                </ThemeText>
              </ThemeBlock>
              ))}
            </ProfilePhone>
          </>
          )}
        </SetMain>
      </SetContain>
    )
}
interface props{
  set:(e:EvtC)=>void,
  name:string,
  val:string|undefined,
  click:(e:EvtK)=>void
}

const SetUser:NamedExoticComponent<props> = memo(
  ({name,set,val,click}:props):JSX.Element=>{
 const [show,setShow] = useState<boolean>(false)
    return (
       <ProfilePhone>
         <ProfileChan>
           <ProfileBut
            onClick={()=>setShow(true)}>
              change {name}
           </ProfileBut>
          {show&&(
           <ProfileBut
            onClick={()=>setShow(false)}>
              close
           </ProfileBut>
           )}
         </ProfileChan>
         {show&&(
         <ProfileInput
          name={name}
          onChange={set}
          defaultValue={val}
          onKeyUp={click}
          />
         )}
       </ProfilePhone>
    )
})