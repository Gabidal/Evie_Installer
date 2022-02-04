import {RESPONSE} from './Utils';
import { exec } from "child_process";

export async function Get_Git(Set_Description: any): Promise<RESPONSE> {
    //this function checks if this PC has git installed or not.
    //if it has git installed, then it will return RESPONSE.NULL
    //if it doesn't have git installed, then it will return RESPONSE.NEED_INSTALL_GIT
    try{
        await exec('git --version')
        return RESPONSE.NULL
    }catch(e){
        Set_Description("Git is not installed.")
        return RESPONSE.NEED_INSTALL_GIT
    }
}

export async function Start_Installing_Git(Set_Description: any) {
    //check if this PC is running in Windows or Unix.
    //if it is running in Windows, then we need to install git from the winget.
    //if it is running in Unix, then we need to install git from the sudo apt install.
    //if it is running in Mac, then we dont do anything.
    if (process.platform === 'win32'){
        Set_Description("Installing Git for Windows...")
        await exec("winget install --id Git.Git -e --source winget")
    }else if (process.platform === 'linux'){
        Set_Description("Installing Git for Linux...")
        await exec('sudo apt install git')
    }
}