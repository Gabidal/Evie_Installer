import React from 'react';

import Button from '@mui/material/Button';
import {Start_Launcher_Update, Update_Launcher} from "./Update_Launcher"
import { Start_Compiler_Update, Update_Compiler } from './Update_Compiler';
import { RESPONSE, Sleep } from './Utils';
import { createTheme, CssBaseline, LinearProgress, ThemeProvider, Typography } from '@mui/material';
import { Get_Git, Start_Installing_Git } from './Get_Git';
import { Get_WinGet, Start_Installing_WinGet} from './Get_WinGet';
import { ipcRenderer } from 'electron';
import { Check_For_Environment_Values } from './Set_Environment_Values';
//import { Start_Up } from './Start_Up';
import { Add_To_Context_Menu } from './Add_To_Context_Menu';

const processes = [
  {name: "Updating the launcher", func: Update_Launcher },
  {name: "Updating the compiler", func: Update_Compiler },
  {name: "Checking for WinGet", func:  Get_WinGet},
  {name: "Checking for github", func: Get_Git },
  {name: "Setting environment variables", func: Check_For_Environment_Values },
  //{name: "Setting launcher as startup", func: Start_Up},
  {name: "Setting compiler to context menu", func: Add_To_Context_Menu},
  {name: "Done!", func: () => RESPONSE.NULL },
]

async function Factory(Set_Phase: any, Set_Description: any, Update_Progress: any) {
  var Index = 1
  for (const i of processes) {
    const Response = await i.func(Set_Description)
    Set_Phase(i.name)
    Update_Progress(Index)
    console.log(i.name, Response)
    await Sleep(500)
    Index++
    if (i.name == "Done!"){
      Set_Description("")
    }
    if (Response == RESPONSE.NEED_UPDATE_LAUNCHER){
      Set_Description("An update was found for this launcher, an update is required to continue")
      await Start_Launcher_Update(Set_Description)
    }
    if (Response == RESPONSE.NEED_UPDATE_EVIE){
      Set_Description("An update was found for Evie, an update is required to continue")
      await Start_Compiler_Update(Set_Description)
    }
    if (Response == RESPONSE.NEED_INSTALL_WINGET){
      Set_Description("Winget was not found, initiating installation")
      await Start_Installing_WinGet(Set_Description)
    }
    if (Response == RESPONSE.NEED_INSTALL_GIT){
      Set_Description("Git was not found, initiating installation")
      await Start_Installing_Git(Set_Description)
    }
    if (Response == RESPONSE.CANNOT_SET_STARTUP){
      Set_Description("Cannot set this launcher as startup, please do so manually")
    }
  }

  setTimeout(() => {
    ipcRenderer.send("Close");
  }, 1000);

}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function Main() {
  const [ Phase, Set_Phase ] = React.useState(' ');
  const [ Description, Set_Description] = React.useState(' ');
  const [ Progress, Update_Progress] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      Set_Phase("Waiting for internet connection...")
      setTimeout(() => {
        Factory(Set_Phase, Set_Description, Update_Progress)
      }, 1000);
    }, 6000);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <div style={{
        padding: "2em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}> */}
        <Typography variant='h6'>{Phase}</Typography>
        <LinearProgress variant="determinate" value={(Progress) / processes.length * 100} style={{width: "100%"}}/>
        <Typography variant='body2'>{Description}</Typography>
      
    </ThemeProvider>
  )
}