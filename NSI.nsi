Name "Installer"
OutFile "installer.exe"
InstallDir $APPDATA\$(^Name)
RequestExecutionLevel user

; !define MUI_FINISHPAGE_RUN "$INSTDIR\Evie_Installer.exe"
; !define MUI_FINISHPAGE_RUN_TEXT "Launch Evie Installer"

;Define the step pages for the installer
Page components
Page directory
Page instfiles

!include "MUI2.nsh"
!define MUI_ICON "resources\app\src\Logo.ico"
!define MUI_FINISHPAGE_NOAUTOCLOSE
!define MUI_FINISHPAGE_RUN
;!define MUI_FINISHPAGE_RUN_NOTCHECKED
!define MUI_FINISHPAGE_RUN_TEXT "Launch Evie Installer"
!define MUI_FINISHPAGE_RUN_FUNCTION "LaunchLink"
!define MUI_FINISHPAGE_SHOWREADME_NOTCHECKED
;!define MUI_FINISHPAGE_SHOWREADME $INSTDIR\readme.txt
!insertmacro MUI_PAGE_FINISH

;Define the unistaller pages.
UninstPage uninstConfirm
UninstPage instfiles

Section
    WriteRegStr HKEY_LOCAL_MACHINE "Software\Microsoft\Windows\CurrentVersion\Run" "Evie_Installer" "$INSTDIR\Evie_Installer.exe"
SectionEnd

Section "Installer (required)"
    SectionIn RO
    SetOutPath $INSTDIR
    File /r *.*

    
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "DisplayName" "$(^Name)"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "DisplayVersion" "$(^Version)"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "UninstallString" '"$INSTDIR\Uninstall_Evie_Installer.exe"'
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "InstallDate" "$(^InstallDate)"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "InstallLocation" "$INSTDIR"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "Publisher" "Gabriel Golzar"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "URLInfoAbout" "https://gabidal.github.io/Evie-Document/"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "Contact" "https://discord.gg/4nYwSWzuuS"
    WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "NoModify" 1
    WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer" "NoRepair" 1
    WriteUninstaller "Uninstall_Evie_Installer.exe"

SectionEnd

Section "Start Menu Shortcuts"

  CreateDirectory "$SMPROGRAMS\Evie_Installer"
  CreateShortcut "$SMPROGRAMS\Evie_Installer\Uninstall_Evie_Installer.lnk" "$INSTDIR\Uninstall_Evie_Installer.exe" "" "$INSTDIR\Uninstall_Evie_Installer.exe" 0
  CreateShortcut "$SMPROGRAMS\Startup\Evie_Installer.lnk" "$INSTDIR\Evie_Installer.exe" "" "$INSTDIR\Evie_Installer.exe" 0
  CreateShortcut "$SMPROGRAMS\Evie_Installer\Evie_Installer.lnk" "$INSTDIR\Evie_Installer.exe" "" "$INSTDIR\Evie_Installer.exe" 0
SectionEnd

Section "Uninstall"
  
  ; Remove registry keys
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Evie_Installer"

  ; Remove all program files
  Delete "$INSTDIR\*"

  ; Remove shortcuts, if any
  Delete "$SMPROGRAMS\Evie_Installer\*"

  ; Remove directories used
  RMDir /r "$SMPROGRAMS\Evie_Installer"
  RMDir /r "$INSTDIR"

SectionEnd

Function LaunchLink
  ; MessageBox MB_OK "Reached LaunchLink $\r$\n \
  ;                  SMPROGRAMS: $SMPROGRAMS  $\r$\n \
  ;                  Start Menu Folder: $STARTMENU_FOLDER $\r$\n \
  ;                  InstallDirectory: $INSTDIR "
  ExecShell "" "$SMPROGRAMS\Startup\Evie_Installer.lnk"
FunctionEnd