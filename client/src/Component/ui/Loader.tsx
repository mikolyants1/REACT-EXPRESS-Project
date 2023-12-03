import { Block ,Spin } from '../../style/style.js';
import { useState,useEffect } from 'react';

interface load{
  back:string
};

export function Loader({back}:load):JSX.Element{
 const [spin,setSpin]=useState<number>(0);
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
     };

export function Error({back}:load):JSX.Element{
const [err,setErr]=useState<string>('');
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