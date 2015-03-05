Presta Initializer Bundle - Installation
========================================

## Install and configure

### Introduction

Here are the step you have to follow to install Presta Initializer Bundle before launching "composer install" and once 
you have installed your project and get the Symfony source code. 

### First you have to get the source

    composer require presta/initializer-bundle '1.0.*@dev' --no-update

### Add script to composer post install

    "scripts": {
        "post-install-cmd": [
            ...
            "Presta\\InitializerBundle\\Composer\\ScriptHandler::install",
        ],
    }

### You have to activate the bundle on AppKernel.php

    new Presta\InitializerBundle\PrestaInitializerBundle(),

### Supprimer le README

### Then launch install

    composer install
    
### Relaunch composer post install
 
You can relaunch post install with this command

    composer run-script post-install-cmd
