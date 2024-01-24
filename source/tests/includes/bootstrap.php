<?php

// Get around direct access blockers.
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../');
}

define('MODULARITYDYNAMICGUIDES_PATH', __DIR__ . '/../../../');
define('MODULARITYDYNAMICGUIDES_URL', 'https://example.com/wp-content/plugins/' . 'modularity-modularity-dynamic-guides');
define('MODULARITYDYNAMICGUIDES_TEMPLATE_PATH', MODULARITYDYNAMICGUIDES_PATH . 'templates/');


// Register the autoloader
$loader = require __DIR__ . '/../../../vendor/autoload.php';
$loader->addPsr4('ModularityDynamicGuides\\Test\\', __DIR__ . '/../php/');

require_once __DIR__ . '/PluginTestCase.php';
