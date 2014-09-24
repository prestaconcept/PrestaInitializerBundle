<?php
/**
 * This file is part of the PrestaInitializerBundle
 *
 * (c) PrestaConcept <www.prestaconcept.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Presta\InitializerBundle\Composer;

use Composer\Script\CommandEvent;

/**
 * @author Nicolas Bastien <nbastien@prestaconcept.net>
 */
class ScriptHandler
{
    /**
     * Should be declared in your composer.json file like this :
     *
     * "scripts": {
     *     "post-install-cmd": [
     *         ...
     *         "Presta\\InitializerBundle\\Composer\\ScriptHandler::install"
     *     ],
     * ...
     *
     * @param CommandEvent $event
     */
    public static function install(CommandEvent $event)
    {
        $event->getIO()->write('[presta-initializer] Install');

        self::setUpPermissions($event);
        self::addVagrantIp($event);
        self::generateDocumentationFiles($event);
        self::generateMakefile($event);
        self::cleanInstall($event);

        $event->getIO()->write('[presta-initializer] Install done');
    }

    /**
     * @param CommandEvent $event
     */
    public static function setUpPermissions(CommandEvent $event)
    {
        $event->getIO()->write('[presta-initializer] set up permissions');

        $files = array(
            'web/app.php',
            'web/app_dev.php',
            'app/console'
        );

        foreach ($files as $file) {
            $event->getIO()->write('update ' . $file);
            $content = file_get_contents($file);

            $content = str_replace('<?php', '<?php' . PHP_EOL . 'umask(0000);' . PHP_EOL, $content);

            file_put_contents($file, $content);
        }

        $event->getIO()->write('[presta-initializer] set up permissions done');
    }

    /**
     * @param CommandEvent $event
     */
    public static function addVagrantIp(CommandEvent $event)
    {
        $event->getIO()->write('[presta-initializer] add vagrant ip for dev');

        $content = file_get_contents('web/app_dev.php');

        $content = str_replace(
            "array('127.0.0.1', ",
            "array('127.0.0.1', '192.168.33.10', '192.168.33.1', ",
            $content
        );

        file_put_contents('web/app_dev.php', $content);

        $event->getIO()->write('[presta-initializer] add vagrant ip for dev done');
    }

    /**
     * @param CommandEvent $event
     */
    public static function generateDocumentationFiles(CommandEvent $event)
    {
        $event->getIO()->write('[presta-initializer] generate documentation skeleton');

        $content = file_get_contents(__DIR__ . '/../Resources/skeleton/README.md');

        $customerName = $event->getIO()->ask(
            'Customer name: ',
            'your-customer-name'
        );

        $projectName = $event->getIO()->ask(
            'Project name: ',
            'your-project-name'
        );

        $content = str_replace('###CUSTOMER_NAME###', $customerName, $content);
        $content = str_replace('###PROJECT_NAME###', $projectName, $content);

        file_put_contents('README.md', $content);

        $event->getIO()->write('[presta-initializer] generate documentation skeleton done');
    }

    /**
     * @param CommandEvent $event
     */
    public static function cleanInstall(CommandEvent $event)
    {
        $event->getIO()->write('[presta-initializer] clean install');

        //Remove config.php
        $event->getIO()->write('remove : web/config.php');
        unlink('web/config.php');

        //Remove Upgrade documentation
        foreach (glob("UPGRADE*.md") as $file) {
            $event->getIO()->write('remove : ' . $file);
            unlink($file);
        }

        $event->getIO()->write('[presta-initializer] clean install done');
    }

    /**
     * @param CommandEvent $event
     */
    public static function generateMakefile(CommandEvent $event)
    {
        $event->getIO()->write('[presta-initializer] generate makefile skeleton');

        $content = file_get_contents(__DIR__ . '/../Resources/skeleton/Makefile');

        file_put_contents('Makefile', $content);

        $event->getIO()->write('[presta-initializer] generate makefile skeleton done');
    }
}
