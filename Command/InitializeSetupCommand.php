<?php
/**
 * This file is part of the PrestaInitializerBundle.
 *
 * (c) PrestaConcept <http://www.prestaconcept.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Presta\InitializerBundle\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @author Nicolas Joubert <njoubert@prestaconcept.net>
 */
class InitializeSetupCommand extends AbstractInitializerCommand
{
    /**
     * @var string
     */
    protected $consolePath;

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('presta:initialize:setup')
            ->setDescription('Setup Initializer');
    }

    /**
     * {@inheritdoc}
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $this->init($input, $output);

        $this->log('[presta-initializer] Setup');

        $this->consolePath = $this->askConsolePath();
        $this->generateDocumentationFiles();
        $this->generateMakefile();
        $this->cleanInstall();

        $this->log('[presta-initializer] Setup done');
    }

    /**
     * Copy README and installation files
     */
    public function generateDocumentationFiles()
    {
        $this->log('[presta-initializer] generate documentation skeleton');

        if (file_exists('README.md')) {
            $this->log('[presta-initializer] README.md already exist : abort');
            return;
        }

        $content = file_get_contents(self::getSkeletonPath() . 'README.md');

        $dialog = $this->getHelperSet()->get('dialog');

        $customerName = $dialog->ask(
            $this->output,
            'Customer name: ',
            'your-customer-name'
        );

        $projectName = $dialog->ask(
            $this->output,
            'Project name: ',
            'your-project-name'
        );

        $content = str_replace('###CUSTOMER_NAME###', $customerName, $content);
        $content = str_replace('###PROJECT_NAME###', $projectName, $content);
        $content = str_replace('###CONSOLE_PATH###', $this->consolePath, $content);

        file_put_contents('README.md', $content);

        if (file_exists('doc/001-installation.md')) {
            $this->log('[presta-initializer] doc/001-installation.md already exist : abort');
            return;
        }

        if (!file_exists('doc')) {
            mkdir('doc');
        }

        $content = file_get_contents(self::getSkeletonPath() . 'doc/001-installation.md');
        file_put_contents('doc/001-installation.md', $content);

        $this->log('[presta-initializer] generate documentation skeleton done');
    }

    /**
     * Create Makefile
     */
    public function generateMakefile()
    {
        $this->log('[presta-initializer] generate makefile skeleton');

        if (file_exists('Makefile')) {
            $this->log('[presta-initializer] Makefile already exist : abort');
            return;
        }

        $content = file_get_contents(self::getSkeletonPath() . 'Makefile');
        $content = str_replace('###CONSOLE_PATH###', $this->consolePath, $content);

        file_put_contents('Makefile', $content);

        $this->log('[presta-initializer] generate makefile skeleton done');
    }

    /**
     * Remove unused files from symfony-standard
     */
    public function cleanInstall()
    {
        $this->log('[presta-initializer] clean install');

        //Remove config.php
        if (file_exists('web/config.php')) {
            $this->log('remove : web/config.php');
            unlink('web/config.php');
        }

        //Remove Upgrade documentation
        foreach (glob("UPGRADE*.md") as $file) {
            $this->log('remove : ' . $file);
            unlink($file);
        }

        $this->log('[presta-initializer] clean install done');
    }

    /**
     * @return string
     */
    protected function getSkeletonPath()
    {
        return __DIR__ . '/../Resources/skeleton/';
    }
}
