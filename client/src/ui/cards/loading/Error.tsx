import { useState,useEffect, memo } from 'react';
import { Block } from '../../../libs/style/style';
import { ILoad } from '../../../libs/types/type';

function Error({back}:ILoad):JSX.Element{
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
}

export default memo(Error);