ENV = "dev"

## Command used by Prestaconcept deployment process
## This allow you to easily add other command
install:
	app/console presta:deployment:install --env=dev

update:
	app/console presta:deployment:update --env=dev

rebuild:
	app/console presta:deployment:rebuild --env=$(ENV)

deploy-install:
	app/console presta:deployment:deploy-install --env=prod

deploy-update:
	app/console presta:deployment:deploy-update --env=prod

test-install:
	app/console presta:deployment:test-install --env=test

test-clean:
	app/console presta:deployment:test-clean --env=test

## Common development tasks
ai:
	app/console assets:install web

ais:
	app/console assets:install web --symlink

cs:
	bin/phpcs --extensions=php -n --standard=PSR2 --report=full src

cs-fixer:
	php-cs-fixer fix src

cc:
	app/console cache:clear

## Project tasks
