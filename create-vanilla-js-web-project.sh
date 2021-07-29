#!/usr/bin/bash
# creates a vanilla js web project with the name specified by the parameter when the script is executed
mkdir $1
cd $1
touch app.js
touch index.html
mkdir scss
mkdir css
cd scss
touch styles.scss
touch mixins.scss
touch reset.scss
touch variables.scss
cd ..
echo "<!DOCTYPE html>" >> index.html
echo "<html lang="en">" >> index.html
echo "<head>" >> index.html
echo -e "\t<meta charset="UTF-8">" >> index.html
echo -e "\t<meta http-equiv="X-UA-Compatible" content="IE=edge">" >> index.html
echo -e "\t<meta name="viewport" content="width=device-width, initial-scale=1.0">" >> index.html
echo "<title>Document</title>" >> index.html
echo "</head>" >> index.html
echo "<body>" >> index.html
echo -e "\n</body>" >> index.html
echo -n "</html>" >> index.html
echo "Project $1 created successfully"
cd ..