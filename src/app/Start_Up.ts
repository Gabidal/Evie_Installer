var autostart = require('node-autostart')
import { RESPONSE } from "./Utils"

export async function Start_Up(): Promise<RESPONSE> {
    return await autostart.enableAutostart("Evie_Installer", "Evie_Installer.exe", process.cwd()).then(() => {
        return RESPONSE.NULL
    }).catch(() => {
        return RESPONSE.CANNOT_SET_STARTUP
    })
}