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

use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Cocur\Slugify\Slugify;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Yaml\Dumper;
use Symfony\Component\Yaml\Yaml;

/**
 * @author Matthieu Crinquand <mcrinquand@prestaconcept.net>
 */
class InstallGruntCommand extends AbstractInitializerCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('presta:initialize:grunt')
            ->setDescription('Install grunt');
    }

    /**
     * {@inheritdoc}
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $this->init($input, $output);

        $this->generateGruntFile();
    }

    /**
     * Handle every step required for Grunt installation
     */
    protected function generateGruntFile()
    {
        $fileSystem = new Filesystem();

        $this->log('[presta-initializer] generate grunt skeleton');

        // Gruntfile.js & package.json
        // copy grunt-config folder
        $this->installFiles($fileSystem);

        // create folder for grunt generated files
        $this->handleFolders($fileSystem);

        // add command to Makefile
        $this->modifyMakefile();

        // gitignore
        $this->modifyGitignore();

        $this->log('[presta-initializer] generate grunt skeleton done');

        $this->log('[presta-initializer] You can now add helper for get the script and style file');
        $this->log('[presta-initializer] Take a look at the 002-grunt.md documentation file');
    }

    /**
     * Ignore file generated or needed by Grunt
     */
    protected function modifyGitignore()
    {
        $content = file_get_contents('.gitignore');
        $toReplace = '/web/bundles/';
        $replacement = '/web/bundles/
/web/styles/
!/web/styles/apps/.gitkeep
/web/scripts/
!/web/scripts/apps/.gitkeep
/node_modules/';
        file_put_contents('.gitignore', str_replace($toReplace, $replacement, $content));
    }

    /**
     * Add specific grunt command into the Makefile
     */
    protected function modifyMakefile()
    {
        $content = file_get_contents('Makefile');
        $toReplace = '
## Project tasks';
        $replacement = '
### Grunt tasks
app = front
grunt-install: ais
	npm install
	./node_modules/.bin/grunt dev-publish
	./node_modules/.bin/grunt githooks

# launch the fos:js-routing even if not exists
grunt-publish: ais
	- app/console fos:js-routing:dump --env=$(ENV) 2> /dev/null

## Project tasks';

        $content = str_replace($toReplace, $replacement, $content);

        $toReplace = '
	app/console presta:deployment:install --env=dev';
        $replacement = '
	app/console presta:deployment:install --env=dev
	make grunt-install
	ln -s ./node_modules/grunt-contrib-watch/tasks/lib/livereload.js ./web/livereload.js';

        file_put_contents('Makefile', str_replace($toReplace, $replacement, $content));
    }

    /**
     * Add folder for generated files
     * Add configuration to record those files into Symfony
     *
     * @param Filesystem $fileSystem
     */
    protected function handleFolders(Filesystem $fileSystem)
    {
        $fileSystem->mkdir('web/scripts/apps/', 0755);
        $fileSystem->mkdir('web/styles/apps/', 0755);
        $fileSystem->dumpFile('web/scripts/apps/.gitkeep', '');
        $fileSystem->dumpFile('web/styles/apps/.gitkeep', '');

        $array = array(
            'twig'  => array(
                'paths' => array(
                    "%kernel.root_dir%/../web/scripts/apps" => 'scriptsFolder',
                    "%kernel.root_dir%/../web/styles/apps"  => 'stylesFolder'
                )
            )
        );

        $dumper = new Dumper();
        $yaml = $dumper->dump($array, 3);
        $fileSystem->dumpFile('app/config/bundles/assets.yml', $yaml);
    }

    /**
     * Copy file from skeleton to project
     * Keep the project.json file if already exists because it's a specific project file
     *
     * @param Filesystem $fileSystem
     */
    protected function installFiles(Filesystem $fileSystem)
    {
        $dialog = $this->getHelperSet()->get('dialog');
        $slugify = new Slugify();

        $fileSystem->copy($this->getSkeletonPath() . 'Gruntfile.js', 'Gruntfile.js', true);

        $fileSystem->copy($this->getSkeletonPath() . 'package.json', 'package.json', true);
        $content = file_get_contents('package.json');
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
        $content = str_replace('###CUSTOMER_NAME###', $slugify->slugify($customerName), $content);
        $content = str_replace('###PROJECT_NAME###', $slugify->slugify($projectName), $content);
        file_put_contents('package.json', $content);

        $isUpdate = $fileSystem->exists('grunt-config/project.json');
        // save specific config for this project
        if ($isUpdate) {
            $fileSystem->copy('grunt-config/project.json', 'project.json');
        }
        $rootDir = getcwd();
        $fileSystem->mirror(
            $this->getSkeletonPath() . 'grunt-config',
            $rootDir . '/grunt-config',
            null,
            array('override' => true)
        );
        // put specific config for this project
        if ($isUpdate) {
            $fileSystem->copy('project.json', 'grunt-config/project.json', true);
            $fileSystem->remove('project.json');
        }
    }

    /**
     * @return string
     */
    protected static function getSkeletonPath()
    {
        return __DIR__ . '/../Resources/skeleton/grunt/';
    }
}
