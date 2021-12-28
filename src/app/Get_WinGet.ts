import {RESPONSE} from './Utils';
import { exec } from "child_process";


export async function Get_WinGet(): Promise<RESPONSE>{
    //this function checks if this PC has WinGet installed or not.
    //if it has WinGet installed, then it will return RESPONSE.NULL
    //if it doesn't have WinGet installed, then it will return RESPONSE.NEED_INSTALL_WINGET
    try{
        if (process.platform === 'win32'){
            await exec('winget --version')
            return RESPONSE.NULL
        }else{
            return RESPONSE.NULL
        }
    }catch(e){
        return RESPONSE.NEED_INSTALL_WINGET
    }
}

export async function Start_Installing_WinGet() {
    //check if this PC is running in Windows or Unix.
    //if it is running in Windows, then we need to install WinGet from the winget.
    await exec("winget install --id WinGet -e --source winget")
}