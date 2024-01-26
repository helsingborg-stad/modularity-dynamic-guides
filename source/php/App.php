<?php

namespace ModularityDynamicGuides;

class App
{
    public function __construct()
    {
        add_action('plugins_loaded', array($this, 'registerModule'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueScripts'));

        $this->cacheBust = new \ModularityDynamicGuides\Helper\CacheBust();
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        wp_register_style(
            'modularity-dynamic-guides-css',
            MODULARITYDYNAMICGUIDES_URL . '/dist/' .
            $this->cacheBust->name('css/modularity-dynamic-guides.css')
        );

        wp_enqueue_style('modularity-dynamic-guides-css');
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        wp_register_script(
            'modularity-dynamic-guides-js',
            MODULARITYDYNAMICGUIDES_URL . '/dist/' .
            $this->cacheBust->name('js/modularity-dynamic-guides.js')
        );

        wp_enqueue_script('modularity-dynamic-guides-js');
    }

    /**
     * Register the module
     * @return void
     */
    public function registerModule()
    {
        if (function_exists('modularity_register_module')) {
            modularity_register_module(
                MODULARITYDYNAMICGUIDES_PATH . 'source/php/Module/',
                'DynamicGuides'
            );
        }
    }
}
