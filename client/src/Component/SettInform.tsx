import { ProfileBut, ProfileChan, ProfileInput, ProfileName, ProfilePhone,
 ThemeBlock, ThemeInput, ThemeText } from "../style/style"
import { EvtC, EvtK, Type } from "../types/type.js"
import { memo,NamedExoticComponent,useState} from 'react'

interface props {
    set:(e:EvtC)=>void,
    name:string,
    val?:Type<string>,
    click:(e:EvtK)=>void
  };
  
 export const SetUser:NamedExoticComponent<props> = memo(
 ({name,set,val,click}:props):JSX.Element=>{
   const [show,setShow] = useState<boolean>(false);
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
      );
  });
  
  interface themeProp{
    change:(e:EvtC)=>void,
    back:string,
    arr:string[]
  };
  
  export const SetTheme=({arr,change,back}:themeProp):JSX.Element=>{
    return (
        <ProfilePhone>
          <ProfileName>
            Theme
          </ProfileName>
          {arr.map((i:string):JSX.Element=>(
            <ThemeBlock>
              <ThemeInput
               onChange={change}
               key={i}
               value={i}
               checked={back==i}
               type="radio"
               name="theme" 
                />
              <ThemeText>
                 {i}
             </ThemeText>
           </ThemeBlock>
            ))}
        </ProfilePhone>
    );
  };