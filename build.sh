#!/bin/sh
build_ff()
{
    web_ext_ff=$WEB_EXT_FIREFOX
    unset $WEB_EXT_FIREFOX
    mkdir -p ./dist/firefox
    web-ext build -s ./app -a ./dist/firefox --overwrite-dest
    export WEB_EXT_FIREFOX=$web_ext_ff
}

build_chrome()
{
    mkdir -p ./dist/chrome
    read -p "Do you have a key (.pem file)? y/n " conf
    case $conf in
        y|Y|yes|Yes)    read -p "Where is it (path/to/key.pem)?" path
                        google-chrome --pack-extension=./app --pack-extension-key=$path
                        ;;
        n|N|no|No)      google-chrome --pack-extension=./app
    esac
    mv ./app.crx ./dist/chrome/$APP_NAME.crx
}

build_edge()
{
    mkdir -p ./dist/edge
    manifoldjs -d ./dist/edge -l debug -p edgeextension -f edgeextension -m app/manifest.json
    echo "Update the appxmanifest.xml and store assets with your/your extension's information before continuing!"
    read -p "Press Enter or Return to continue..." temp
    manifoldjs -l debug -p edgeextension package $(echo "./dist/edge/$APP_NAME" | sed -r 's/[-]+//')/edgeextension/manifest
    cp $(echo "./dist/edge/$APP_NAME" | sed -r 's/[-]+//')/edgeextension/package/edgeExtension.appx ./dist/edge/
    read -p "Remove build artifacts? y/n " conf
    case $conf in
        y|Y|yes|Yes)    rm -rf $(echo "./dist/edge/$APP_NAME" | sed -r 's/[-]+//')
                        ;;
        n|N|no|No)      break
    esac
}

####
# Main
####
APP_NAME=${PWD##*/}

while [ "$1" != "" ]; do
    case $1 in
        ff | firefox )          build_ff
                                exit
                                ;;
        chrome )                build_chrome
                                exit
                                ;;
        edge )                  build_edge
                                exit
                                ;;
        all )                   build_ff
                                build_chrome
                                build_edge
                                exit 1
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done
