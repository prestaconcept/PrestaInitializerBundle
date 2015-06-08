ENV = "dev"

## Command used by Prestaconcept deployment process
## This allow you to easily add other command
install:
	###CONSOLE_PATH### presta:deployment:install --env=dev

update:
	###CONSOLE_PATH### presta:deployment:update --env=dev

rebuild:
	###CONSOLE_PATH### presta:deployment:rebuild --env=$(ENV)

deploy-install:
	###CONSOLE_PATH### presta:deployment:deploy-install --env=prod

deploy-update:
	###CONSOLE_PATH### presta:deployment:deploy-update --env=prod

test-install:
	###CONSOLE_PATH### presta:deployment:test-install --env=test

test-clean:
	###CONSOLE_PATH### presta:deployment:test-clean --env=test

## Common development tasks
ai:
	###CONSOLE_PATH### assets:install web

ais:
	###CONSOLE_PATH### assets:install web --symlink --relative

cs:
	bin/phpcs --extensions=php -n --standard=PSR2 --report=full src

cbf:
	bin/phpcbf --extensions=php --standard=PSR2 src

cc:
	###CONSOLE_PATH### cache:clear

## Project tasks
