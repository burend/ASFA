@echo off
cd ../Javascripts/Source
@del /Q ..\check.js >nul 2>&1
@del /Q ..\compiled.js >nul 2>&1
@del /Q ..\merged.js >nul 2>&1
@del /Q "..\..\Mods\details.js" >nul 2>&1

setlocal enableextensions enabledelayedexpansion
for /d %%G in ("..\..\Mods\*") DO (
	Pushd %%G
	Echo Compiling Mod %%~nxG
	set currv="..\..\Mods\%%~nxG"
	@del /Q "!currv!\Javascripts\merged.js" >nul 2>&1
	@del /Q "!currv!\Javascripts\compiled.js" >nul 2>&1
	@echo off
	@type "!currv!\Javascripts\details.js" >> "!currv!\..\details.js"
	>"!currv!\Javascripts\merged.js" (for /r "." %%F in ("!currv!\Javascripts\Source\*.js") do type "%%F")
	@echo on
	java -jar ..\..\Development\compiler.jar --compilation_level WHITESPACE_ONLY --js "!currv!\Javascripts\merged.js" --js_output_file "!currv!\Javascripts\compiled.js"
	@echo off
	@del /Q "!currv!\Javascripts\merged.js"
	Popd
)

@echo Compiling Main Game
>..\merged.js (for /r "." %%F in (*.js) do type "%%F")

@echo on
java -jar ..\..\Development\compiler.jar --compilation_level WHITESPACE_ONLY --js ..\merged.js --js_output_file ..\compiled.js
@echo[
@IF %ERRORLEVEL% NEQ 0 goto Failed
@echo Compiled, updating Android
@echo off
@del /Q ..\merged.js >nul 2>&1
copy ..\..\*.html ..\..\..\Android\app\src\main\assets\www /Y >nul
xcopy ..\*.js ..\..\..\Android\app\src\main\assets\www\Javascripts /Y /C /E /D /i /EXCLUDE:..\..\Development\exclude.txt>nul
xcopy ..\..\UI ..\..\..\Android\app\src\main\assets\www\UI /Y /C /E /D /i >nul
xcopy ..\..\Help ..\..\..\Android\app\src\main\assets\www\Help\*.html /Y /C /E /D /i >nul
xcopy ..\..\Credits ..\..\..\Android\app\src\main\assets\www\Credits /Y /C /E /D /i >nul
xcopy ..\..\Sound ..\..\..\Android\app\src\main\assets\www\Sound /Y /C /E /D /i >nul
rem xcopy ..\..\Mods ..\..\..\Android\app\src\main\assets\www\Mods /Y /C /E /D /i >nul
@echo on
@goto End
:Failed
@echo Compile Failed!
@del /Q ..\merged.js >nul 2>&1
:End
@echo off
@cd ..\..\Development
@echo[
pause
