import {RESPONSE} from './Utils';
import { exec } from "child_process";

export async function Get_Git(): Promise<RESPONSE> {
    //this function checks if this PC has git installed or not.
    //if it has git installed, then it will return RESPONSE.NULL
    //if it doesn't have git installed, then it will return RESPONSE.NEED_INSTALL_GIT
    try{
        await exec('git --version')
        return RESPONSE.NULL
    }catch(e){
        return RESPONSE.NEED_INSTALL_GIT
    }
}

export async function Start_Installing_Git() {
    //check if this PC is running in Windows or Unix.
    //if it is running in Windows, then we need to install git from the winget.
    //if it is running in Unix, then we need to install git from the sudo apt install.
    //if it is running in Mac, then we dont do anything.
    if (process.platform === 'win32'){
        await exec("winget install --id Git.Git -e --source winget")
    }else if (process.platform === 'linux'){
        await exec('sudo apt install git')
    }
}