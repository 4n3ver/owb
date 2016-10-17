# OWB

## Install Dependencies
`$ npm install`

## Scripts
run by typing
`$ npm run <scriptname>`

+ `startd` 
Run start daemon, will watch source code for changes and perform hot-reload automatically (built files will not be written to disk).

+ `buildd`
Run build daemon, will watch source code for changes and perform transpilation on change (built files will be saved on the disk).

+ `flowd`
Run flow-type server on the foreground.

+ `clean`
Remove build directory.

+ `build`
Transpile source code and save the built files into disk.

## For Developer
+ Install `webpack-dev-server` and `webpack` globally
`$ npm install --global webpack-dev-server webpack`
+ Install `Redux DevTools` for Chrome 
<a href="https://goo.gl/RQ43VE"><img src="http://chart.apis.google.com/chart?cht=qr&chs=120x120&choe=UTF-8&chld=H|0&chl=https://goo.gl/RQ43VE"/></a>
+ For IntelliJ WebStorm user:
"uncheck File > Settings... > System Settings > Use safe write (save changes to a temporary file first)."

## Contributors
+ Yoel Ivan (yivan3@gatech.edu)
