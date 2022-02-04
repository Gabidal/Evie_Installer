import { RESPONSE } from "./Utils";
import { join } from "path";

const shellContextMenu = require('shell-context-menu');


export async function Add_To_Context_Menu(Set_Description: any): Promise<RESPONSE> {

    const options = {
        name: 'Compile',
        command: join(process.cwd(), 'Evie.exe'),
        menu: 'Compile',
    };

    Set_Description("Adding Evie compiler to context menu...")
    await shellContextMenu.registerCommand(options);
    return RESPONSE.NULL;
}