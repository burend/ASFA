#!/bin/bash
rm ../Javascripts/check.js &> /dev/null
rm ../Javascripts/compiled.js &> /dev/null
rm ../Javascripts/merged.js &> /dev/null

case $1 in
	mods)
		echo "Compiling With Mods"
		find ../Javascripts/Source/Mods -name *.js -exec cat {} \; > ../Javascripts/merged.js
		find ../Javascripts/Source -path ../Javascripts/Source/Mods -prune -o -name *.js -exec cat {} \; >> ../Javascripts/merged.js
		;;
	*)
		echo "Compiling Without Mods"
		find ../Javascripts/Source -path ../Javascripts/Source/Mods -prune -o -name *.js -exec cat {} \; > ../Javascripts/merged.js
		;;
esac

#find ../Javascripts/Source -name *.js -exec cat {} \; > ../Javascripts/merged.js
#for f in `ls ../Javascripts/Source -R`; do cat "$f"; done > ../merged.js
java -jar ./compiler.jar --compilation_level WHITESPACE_ONLY --js ../Javascripts/merged.js --js_output_file ../Javascripts/compiled.js

if [ $? -eq 0 ]
	then echo 'Compiled';
	else
		echo 'Compile Failed'
fi
rm ../Javascripts/merged.js > /dev/null
