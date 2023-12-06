import { ProfileName, ProfilePass,ThemeBlock,
 ThemeInput, ThemeText } from "../../../style/style.js"
import { Context, EvtC} from "../../../types/type.js"
import { useContext} from 'react'
import { Theme } from "../../wrap/Page.js";
  
  interface themeProp{
    change:(e:EvtC)=>void,
    back:string,
    arr:string[],
    name:string
  };
  
const ThemeSetBlock=({arr,change,back,name}:themeProp):JSX.Element=>{
    const {translate} = useContext<Context>(Theme);
    const first:string = name.slice(0,1).toUpperCase();
    const second:string = name.slice(1);
    const Name:string = [first,second].join('');
    return (
        <ProfilePass>
          <ProfileName>
            {translate&&translate(Name)}
          </ProfileName>
          {arr.map((i:string):JSX.Element=>(
            <ThemeBlock>
              <ThemeInput
               onChange={change}
               key={i}
               value={i}
               checked={back==i}
               type="radio"
               name={name} 
                />
              <ThemeText>
                 {i}
             </ThemeText>
           </ThemeBlock>
            ))}
        </ProfilePass>
    );
  };
  
  export default ThemeSetBlock