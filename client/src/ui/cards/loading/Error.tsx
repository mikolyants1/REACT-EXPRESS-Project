import { useState,useEffect, memo } from 'react';
import { Block } from '../../../libs/style/style';
import { ILoad } from '../../../libs/types';

function Error({back}:ILoad):JSX.Element{
const [err,setErr] = useState<string>('');
  useEffect(() => {
    setInterval(() => {
     setTimeout(() => setErr(''), 0);
     setTimeout(() => setErr('.'), 200);
     setTimeout(() => setErr('..'), 400);
     setTimeout(() => setErr('...'), 600);
    }, 800);
  },[]);

  return (
    <Block back={back}>
       error {err}
    </Block>
  );
}

export default memo(Error);