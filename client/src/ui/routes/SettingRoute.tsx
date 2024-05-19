import { FC } from "react";
import ToggleMenu from "../cards/menu/ToggleMenu";
import Setting from "../views/home/setting/Setting";

export const SettingRoute:FC = ():JSX.Element => {
    return (
      <Setting>
        <ToggleMenu />
      </Setting>
    );
}
