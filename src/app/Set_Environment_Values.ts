import { Get_Launcher_Release, Get_Compiler_Release, RESPONSE } from "./Utils";
import { join } from "path";

export async function Check_For_Environment_Values(): Promise<RESPONSE>{

    //first check whatn OS we are on.
    if (process.platform == "win32"){
        //check if PATH exists if not then we create a new PATH variable.
        if (!process.env.PATH){
            process.env.PATH = ""
        }

        //now check if Evie.exe as a path variable exists on the PATH veriable.
        //if it does not exist then we need to place Evie.exe in the PATH variable.
        if (!process.env.PATH!.split(';').some(i => i.endsWith(process.cwd()))){
            //we need to add the path to the PATH variable.
            process.env.PATH = process.env.PATH + ";" + process.cwd()
        }
        if (!process.env["Repo-Dir"]){
            process.env["Repo-Dir"] = join(process.cwd(), ".Repos")
        }
        
    }

    return RESPONSE.NULL
}
