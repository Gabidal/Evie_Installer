import { access, accessSync, constants, fstat, promises as fs } from "original-fs";
import { exec } from "child_process";
import { Get_Launcher_Release, Get_Compiler_Release, RESPONSE } from "./Utils";



const Compiler_Version_File_Name = "./Compiler_Version.txt";

export async function Update_Compiler(Set_Description: any): Promise<RESPONSE> {

    const exists = await fs.access(Compiler_Version_File_Name, constants.F_OK).then(() => true).catch(() => false)

    //this means that the Compiler version existsm and that we can fetch a new one from github.
    if (exists){
        const version = new Date((await fs.readFile(Compiler_Version_File_Name)).toString('utf8'))
        //now check if the version got from the latest release is greater than this Compiler version.
        //this Compiler version is got from the Compiler_Version.txt file.
        //read the version string from the file.
        const Latest_Release = await Get_Compiler_Release()
        const Release_Version = new Date(Latest_Release.published_at)

        if (Release_Version > version){
            Set_Description("An update is available.")
            return RESPONSE.NEED_UPDATE_EVIE
        }
    }
    else{
        //if the launcher version file does not exist.
        //this means that this is the first time that the launcher is being run.
        //so we need to create the launcher version file.
        await fs.writeFile(Compiler_Version_File_Name, new Date().toString())
    }

    return RESPONSE.NULL
}

export async function Start_Compiler_Update(Set_Description: any){
    Set_Description("Fetching Latest Compiler...")
    const Latest_Release = await Get_Compiler_Release()
    const Release_Version = new Date(Latest_Release.published_at)
    //we need to update the Compiler.
    //we need to delete the Compiler_Version.txt file and then create a new one with the new version.
    await fs.unlink(Compiler_Version_File_Name)
    await fs.writeFile(Compiler_Version_File_Name, Release_Version.toString())
    //now we need to download the new Compiler.
    await Download_Compiler(Latest_Release, Set_Description)
} 

async function Download_Compiler(Release: any, Set_Description: any){
    const Download_Link = Release.assets[0].browser_download_url
    Set_Description("Downloading Compiler...")
    const Download_Response = await fetch(Download_Link)
    //Start the downloaded executable. and at the same time stop this Compiler.
    const Buffer = await Download_Response.arrayBuffer()
    try{
        Set_Description("Installing Compiler...")
        await fs.writeFile('./Evie.exe', new Uint8Array(Buffer))
        await fs.chmod('./Evie.exe', 0o755)
    }catch(e){
        alert("The compiler is currently being used by another process. Please close it and try again.")
        console.log(e)
    }
}