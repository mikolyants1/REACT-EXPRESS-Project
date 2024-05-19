import { useState,useEffect, memo } from 'react';
import { Block, Spin } from '../../../libs/style/style';
import { ILoad } from '../../../libs/types/type';

function Loader({back}:ILoad):JSX.Element{
 const [spin,setSpin] = useState<number>(0);
  useEffect(():void=>{
   setInterval(():void=>{
    setSpin((x:number)=>x==360?0:x+10);
    }, 50);
  },[]);

  return (
    <Block back={back}>
      <Spin
       back={back} 
       spin={spin}
       />
    </Block>
  );
}

export default memo(Loader);