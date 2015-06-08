# Grunt

## Add grunt

### Files

To add Grunt to your project, you will have to launch this task:

    ###CONSOLE_PATH### presta:initialize:grunt
    
### Configuration

In order to use assets created by Grunt, the task has generated a configuration file assets.yml
into the app/config/bundles. You now have to import it into the app/config/config.yml configuration file:   

    imports:
        ...
        - { resource: bundles/assets.yml }

### Use

To use Grunt, you will have to add those two blocks in your layout file:

    {% block stylesheets %}
        {% include '@stylesFolder/front/styles.html.twig' ignore missing %}
    {% endblock %}

    {% block javascripts %}
        {% include '@scriptsFolder/front/scripts.html.twig' ignore missing %}
    {% endblock %}
