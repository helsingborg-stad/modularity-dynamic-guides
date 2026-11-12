<?php

namespace WpService\Implementations {
    function plugins_url($path, $plugin)
    {
        return 'https://example.test/wp-content/plugins/dynamic-guides';
    }

    function wp_cache_get($key, $group, $force, &$found)
    {
        return [];
    }

    function wp_register_script(...$args)
    {
        $GLOBALS['dynamicGuideAssets'][] = ['register_script', ...$args];
        return true;
    }

    function wp_enqueue_script(...$args)
    {
        $GLOBALS['dynamicGuideAssets'][] = ['enqueue_script', ...$args];
    }

    function wp_register_style(...$args)
    {
        $GLOBALS['dynamicGuideAssets'][] = ['register_style', ...$args];
        return true;
    }

    function wp_enqueue_style(...$args)
    {
        $GLOBALS['dynamicGuideAssets'][] = ['enqueue_style', ...$args];
    }
}

namespace ModularityDynamicGuides {
    function add_action($hook, $callback)
    {
    }
}
