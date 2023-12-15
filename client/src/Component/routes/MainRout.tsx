import { FC } from "react";
import Main from "../views/path/Main";
import ToogleMenu from "../ui/buttons/Toggle.js"

const MainRout:FC=():JSX.Element=>{
    return (
      <Main>
        <ToogleMenu />
      </Main>
    );
  };

export default MainRout