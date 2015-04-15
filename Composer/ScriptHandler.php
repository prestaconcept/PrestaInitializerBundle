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

use Composer\Script\Event;
use Symfony\Component\Filesystem\Filesystem;

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
     * @param Event $event
     */
    public static function install(Event $event)
    {
        $event->getIO()->write('[presta-initializer] Install');

        self::setUpPermissions($event);
        self::addDevelopmentIp($event);
        self::generateDocumentationFiles($event);
        self::generateMakefile($event);
        self::cleanInstall($event);

        $event->getIO()->write('[presta-initializer] Install done');
    }

    /**
     * @param Event $event
     */
    public static function setUpPermissions(Event $event)
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

            if (strpos($content, 'umask(0000);//[presta-initializer]') !== false) {
                $event->getIO()->write('[presta-initializer] permissions already exist : abort');
                continue;
            }

            $content = str_replace(
                '<?php',
                '<?php' . PHP_EOL . 'umask(0000);//[presta-initializer]' . PHP_EOL,
                $content
            );

            file_put_contents($file, $content);
        }

        $event->getIO()->write('[presta-initializer] set up permissions done');
    }

    /**
     * @param Event $event
     */
    public static function addDevelopmentIp(Event $event)
    {
        $event->getIO()->write('[presta-initializer] add development ip');

        $content = file_get_contents('web/app_dev.php');

        if (strpos($content, "'127.0.0.1', '192.168.33.10', '192.168.33.1',") !== false) {
            $event->getIO()->write('[presta-initializer] development ip already exist : abort');
            return;
        }

        $content = str_replace(
            "array('127.0.0.1', ",
            "array('127.0.0.1', '192.168.33.10', '192.168.33.1', ",
            $content
        );

        file_put_contents('web/app_dev.php', $content);

        $event->getIO()->write('[presta-initializer] add vagrant ip for dev done');
    }

    /**
     * @param Event $event
     */
    public static function generateDocumentationFiles(Event $event)
    {
        $event->getIO()->write('[presta-initializer] generate documentation skeleton');

        if (file_exists('README.md')) {
            $event->getIO()->write('[presta-initializer] README.md already exist : abort');
            return;
        }

        $content = file_get_contents(self::getSkeletonPath() . 'README.md');

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

        if (file_exists('doc/001-installation.md')) {
            $event->getIO()->write('[presta-initializer] doc/001-installation.md already exist : abort');
            return;
        }

        if (!file_exists('doc')) {
            mkdir('doc');
        }

        $content = file_get_contents(self::getSkeletonPath() . 'doc/001-installation.md');
        file_put_contents('doc/001-installation.md', $content);

        $event->getIO()->write('[presta-initializer] generate documentation skeleton done');
    }

    /**
     * @param Event $event
     */
    public static function cleanInstall(Event $event)
    {
        $event->getIO()->write('[presta-initializer] clean install');

        //Remove config.php
        if (file_exists('web/config.php')) {
            $event->getIO()->write('remove : web/config.php');
            unlink('web/config.php');
        }

        //Remove Upgrade documentation
        foreach (glob("UPGRADE*.md") as $file) {
            $event->getIO()->write('remove : ' . $file);
            unlink($file);
        }

        $event->getIO()->write('[presta-initializer] clean install done');
    }

    /**
     * @param Event $event
     */
    public static function generateMakefile(Event $event)
    {
        $event->getIO()->write('[presta-initializer] generate makefile skeleton');

        if (file_exists('Makefile')) {
            $event->getIO()->write('[presta-initializer] Makefile already exist : abort');
            return;
        }

        $content = file_get_contents(self::getSkeletonPath() . 'Makefile');

        file_put_contents('Makefile', $content);

        $event->getIO()->write('[presta-initializer] generate makefile skeleton done');
    }

    /**
     * @return string
     */
    protected static function getSkeletonPath()
    {
        return __DIR__ . '/../Resources/skeleton/';
    }
}
