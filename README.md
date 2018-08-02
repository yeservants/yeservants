# Yielded Evangelical Servants Website

This project is a website builder for the yeservants.org powered by nodejs, babel and sass.

**Folder Structure**

     ├── docs                # Compiled src for github pages
     ├── public              # Compiled src for yeservants.org
     ├── src                 
     │   ├── js              # javascript to be compiled
     │   ├── missionaries    # missionary information to compile
     │   ├── sass            # Stylesheets to compile
     │   ├── static          # Folder to copy as-is to public
     │   │   ├──  images     # Site + missionary images
     │   ├── templates       # HTML templates that form layout
     │   ├── build.js        # Main Build script that compiles everything
     │   └── config.json     # Site configuration variables
     ├── build.bat 
     └── README.md           # This page :)



## Set Up

Have nodejs 8 or higher installed

`npm install` (Install required dependencies)

`npm install babel-cli babel-preset-env sass --g` (Global babel and sass compiler)

### Build
`npm run build` (Builds for /public)

`npm run build4docs` (Builds for /docs which runs the [Beta Github Page](https://yeservants.github.io/website/))


Build only css: `npm run compilecss`

Build only js: `npm run compilejs`

## License
This source is under copyright © zfbx/Tony & Yielded Evangelical Servants Inc - 2018 - All Rights Reserved
Unauthorized copying of this file, via any medium is prohibited.

Main copyright holder is [zfbx](http://github.com/zfbx) with licensing open to Yielded Evangelical Servants Inc (Y.E.S.).
All Rights to this source belong to zfbx and zfbx witholds the rights to reuse source in other projects including but not limited to open source projects at which time that portion of code will be under the open source. Y.E.S. is a not-for-profit organization.
