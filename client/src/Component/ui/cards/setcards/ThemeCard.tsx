import {memo} from 'react'
import ThemeSetBlock from '../../inputs/Theme'
import { Context, EvtC, union } from '../../../../types/type'
import { bind, getLang, useAction, useAppSelector } from '../../../../store/store';
import { useOutletContext } from 'react-router-dom';

function ThemeCard():JSX.Element {
  const {val} = useOutletContext<Context>();
  const {setLang,setTheme}:bind = useAction();
  const lang:string = useAppSelector(getLang);
  const toogle=(set:union)=>(e:EvtC):void=>{
    set(e.target.value);
  };
  return (
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
  )
}

export default memo(ThemeCard)