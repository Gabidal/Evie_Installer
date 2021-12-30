export enum RESPONSE{
    NULL,
    NEED_UPDATE_LAUNCHER,
    NEED_UPDATE_EVIE,
    NEED_INSTALL_GIT,
    NEED_INSTALL_WINGET,
    CANNOT_SET_STARTUP,
}

export async function Get_Launcher_Release(){
    const response = await fetch('https://api.github.com/repos/Gabidal/Evie_Installer/releases/latest');
    return await response.json();
}
export async function Get_Compiler_Release(){
    const response = await fetch('https://api.github.com/repos/Gabidal/Evie/releases/latest');
    return await response.json();
}

export function Sleep(time: number){
    return new Promise(resolve => setTimeout(resolve, time));
}