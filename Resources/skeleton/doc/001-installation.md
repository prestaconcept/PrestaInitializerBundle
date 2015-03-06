# Installation

## Récupération des sources

    git clone [adresse]
    cd WebViewAlliance

## Installation

    composer install
    make install

## Explication des commandes contenues dans le Makefile

Ces commandes sont appellées par : make [commande]

* install : première installation du projet
* update : mise à jour d'un projet déjà installé
* rebuild : réinitialisation de la base de donnée avec les fixtures de base
* deploy-* : utilisées par capifony
* test-install : mise en place de l'environnement de test
* test-clean : réinitialisation de la base de donnée de test
* ai : installation des assets en mode par défaut (hard copy)
* ais :  installation des assets en mode symlink
* cs : Exécute le checkstyle PSR2
* cs-fixer : correction automatique du checkstyle
* cc : vidage du cache
* pdc : Exécute PHPDocBlockChecker
   
## Installation en production

### Configuration

Afin de pouvoir initialiser votre configuration capifony, voila la liste des répertoires qui devront être
partagé entre vos releases et initialisé dans le dossier /shared

    set :writable_dirs,       [
        app_path + "/cache",
        app_path + "/logs",
        web_path + "/uploads"
    ]

    set :shared_children,       [
        app_path + "/logs",
        app_path + "/exports",
        web_path + "/uploads"
    ]

### Détails des répertoires de l'application 

    - /web/upload/wysiwyg : répertoire de téléchargement depuis le wysiwyg
    - ...
