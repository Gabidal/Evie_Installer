import { access, accessSync, constants, fstat, promises as fs } from "original-fs";
import { exec } from "child_process";
import { Get_Launcher_Release, RESPONSE } from "./Utils";



const Launcher_Version_File_Name = "./Launcher_Version.txt";

export async function Update_Launcher(): Promise<RESPONSE> {

    const exists = await fs.access(Launcher_Version_File_Name, constants.F_OK).then(() => true).catch(() => false)
    
    //this means that the launcher version existsm and that we can fetch a new one from github.
    if (exists){
        const version = new Date((await fs.readFile(Launcher_Version_File_Name)).toString('utf8'))
        //now check if the version got from the latest release is greater than this launchers version.
        //this launcher version is got from the Launcher_Version.txt file.
        //read the version string from the file.
        const Latest_Release = await Get_Launcher_Release()
        const Release_Version = new Date(Latest_Release.published_at)

        if (Release_Version > version){
            return RESPONSE.NEED_UPDATE_LAUNCHER
        }
    }
    else{
        //if the launcher version file does not exist.
        //this means that this is the first time that the launcher is being run.
        //so we need to create the launcher version file.
        await fs.writeFile(Launcher_Version_File_Name, new Date().toString())
    }

    return RESPONSE.NULL
}

export async function Start_Launcher_Update(){
    const Latest_Release = await Get_Launcher_Release()
    const Release_Version = new Date(Latest_Release.published_at)
    //we need to update the launcher.
    //we need to delete the Launcher_Version.txt file and then create a new one with the new version.
    await fs.unlink(Launcher_Version_File_Name)
    await fs.writeFile(Launcher_Version_File_Name, Release_Version.toString())
    //now we need to download the new launcher.
    await Download_Launcher(Latest_Release)
} 

async function Download_Launcher(Release: any){
    const Download_Link = Release.assets[0].browser_download_url
    const Download_Response = await fetch(Download_Link)
    //Start the downloaded executable. and at the same time stop this launcher.
    const Buffer = await Download_Response.arrayBuffer()
    await fs.writeFile('./Evie_Installer_New.exe', new Uint8Array(Buffer))
    //now startup the executable.
    await fs.chmod('./Evie_Installer_New.exe', 0o755)
    exec('./Evie_Installer_New.exe --Remove_Old_Launcher')
}

export async function Remove_Old_Launcher(){
    //remove the old launcher.
    await fs.unlink('./Evie_Installer.exe')
    //rename the new launcher to the old launcher.
    await fs.rename('./Evie_Installer_New.exe', './Evie_Installer.exe')
    //releanch this launcher so that it doesnt have the _new postfix init.
    await fs.chmod('./Evie_Installer.exe', 0o755)
    exec('./Evie_Installer.exe')
}