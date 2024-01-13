import { useState,useEffect, memo } from 'react';
import { Block } from '../../../../style/style';
import { load } from '../../../../types/type';

function Error({back}:load):JSX.Element{
const [err,setErr] = useState<string>('');
 useEffect(():void=>{
  setInterval(():void => {
   setTimeout(():void=>setErr(''),0);
   setTimeout(():void=>setErr('.'),200);
   setTimeout(():void=>setErr('..'),400);
   setTimeout(():void=>setErr('...'),600);
   }, 800);
  },[]);
    return (
         <Block back={back}>
             error {err}
         </Block>
       );
};

export default memo(Error)