@echo off
cd ../Javascripts/Source
@del /Q ..\check.js >nul 2>&1
@del /Q ..\merged.js >nul 2>&1

setlocal enableextensions enabledelayedexpansion
for /d %%G in ("..\..\Mods\*") DO (
	Pushd %%G
	Echo Checking Mod %%~nxG
	set currv="..\..\Mods\%%~nxG"
	@echo on
	java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js "!currv!\Javascripts\Source\*.js" --js_output_file ..\check.js
   @echo off
   @del /Q ..\check.js >nul 2>&1
	Popd
)

@rem Syntax check of place code
@echo on
java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js Places\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

@rem Check People code
@echo on
java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js People\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

@rem Check Visions code
@echo on
java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js ..\Visions\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1
@echo on
java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js ..\Visions\Explicit\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

@rem Syntax check of non-place code
@echo on
java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js *.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

pause