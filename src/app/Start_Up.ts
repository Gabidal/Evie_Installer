var autostart = require('node-autostart')
import { RESPONSE } from "./Utils"

// export async function Start_Up(): Promise<RESPONSE> {
//     return await autostart.enableAutostart("Evie_Installer", process.cwd(), "Evie_Installer.exe").then(() => {
//         return RESPONSE.NULL
//     }).catch(() => {
//         return RESPONSE.CANNOT_SET_STARTUP
//     })
// }