import { FC } from "react";
import Setting from "../views/path/Setting";
import ToogleMenu from "../ui/buttons/Toggle.js"
 
const SettRout:FC=():JSX.Element=>{
    return (
      <Setting>
        <ToogleMenu />
      </Setting>
    );
  };

  export default SettRout