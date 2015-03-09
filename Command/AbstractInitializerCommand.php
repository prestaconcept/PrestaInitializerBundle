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

use Presta\InitializerBundle\Exception\EnvironmentException;
use Presta\InitializerBundle\Manager\ConfigurationManager;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @author Matthieu Crinquand <mcrinquand@prestaconcept.net>
 */
abstract class AbstractInitializerCommand extends ContainerAwareCommand
{
    /**
     * @var InputInterface
     */
    protected $input;

    /**
     * @var OutputInterface
     */
    protected $output;

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    protected function init(InputInterface $input, OutputInterface $output)
    {
        $this->input  = $input;
        $this->output = $output;
    }

    /**
     * @param string $message
     */
    protected function log($message)
    {
        $this->output->writeln(
            $this->getHelper('formatter')->formatSection('presta-initializer', $message)
        );
    }

    /**
     * Clear application cache
     */
    protected function clearCache()
    {
        $application  = $this->getApplication();
        $commandInput = new ArrayInput(array('command' => 'cache:clear'));
        $application->doRun($commandInput, $this->output);
    }
}
