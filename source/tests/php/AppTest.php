<?php
namespace ModularityDynamicGuides;

use ModularityDynamicGuides\App;

use Brain\Monkey\Functions;
use Mockery;

class AppTest extends \PluginTestCase\PluginTestCase
{
    public function testAddHooks()
    {
        new App();
    
        self::assertNotFalse(has_action('admin_enqueue_scripts', 'ModularityDynamicGuides\App->enqueueStyles()'));
        self::assertNotFalse(has_action('admin_enqueue_scripts', 'ModularityDynamicGuides\App->enqueueScripts()'));
    }

    public function testEnqueueStyles()
    {
        Functions\expect('wp_register_style')->once();
        Functions\expect('wp_enqueue_style')->once()->with('modularity-dynamic-guides-css');

        $app = new App();

        $app->enqueueStyles();
    }

    public function testEnqueueScripts()
    {
        Functions\expect('wp_register_script')->once();
        Functions\expect('wp_enqueue_script')->once()->with('modularity-dynamic-guides-js');

        $app = new App();

        $app->enqueueScripts();
    }
}
