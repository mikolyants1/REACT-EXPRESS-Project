import { ProfileBut, ProfileChan, ProfileInput, ProfilePhone } from "../style/style"
import { EvtC, EvtK, Type } from "./Main"
import {memo,NamedExoticComponent,useState} from 'react'

interface props {
    set:(e:EvtC)=>void,
    name:string,
    val?:Type<string>,
    click:(e:EvtK)=>void
  }
  
 export const SetUser:NamedExoticComponent<props> = memo(
 ({name,set,val,click}:props):JSX.Element=>{
   const [show,setShow] = useState<boolean>(false)
      return (
         <ProfilePhone>
           <ProfileChan>
             <ProfileBut onClick={()=>setShow(true)}>
                change {name}
             </ProfileBut>
            {show&&(
             <ProfileBut onClick={()=>setShow(false)}>
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
  