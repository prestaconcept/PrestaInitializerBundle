Presta Initializer Bundle - Installation
========================================

## Install and configure

### Introduction

Here are the step you have to follow to install Presta Initializer Bundle before launching "composer install" and once 
you have installed your project and get the Symfony source code. 

### First you have to get the source

    composer require presta/initializer-bundle '1.0.*@dev' --no-update

### You have to activate the bundle on AppKernel.php

    new Presta\InitializerBundle\PrestaInitializerBundle(),

### Delete README file

### Remove IP Protection on app_dev.php

    // This check prevents access to debug front controllers that are deployed by accident to production servers.
    // Feel free to remove this, extend it, or make something more sophisticated.
    if (isset($_SERVER['HTTP_CLIENT_IP'])
        || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
        || !(in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', 'fe80::1', '::1')) || php_sapi_name() === 'cli-server')
    ) {
        header('HTTP/1.0 403 Forbidden');
        exit('You are not allowed to access this file. Check '.basename(__FILE__).' for more information.');
    }
    
**NB: This file must be never push by deploiement and only be present on dev environment.**

### Then launch setup command

    ###CONSOLE_PATH### presta:initialize:setup
    
