<?php

namespace ModularityDynamicGuides;

class App
{
    public function __construct()
    {
        add_action('plugins_loaded', array($this, 'registerModule'));
        add_action('admin_enqueue_scripts', array($this, 'enqueueAdmin'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueFrontend'));
        add_action('acf/validate_save_post/name=dynamic_guide_outcomes_hidden', array($this,'validateOutcomes'));

        $this->cacheBust = new \ModularityDynamicGuides\Helper\CacheBust();
    }

    public function validateOutcomes($valid, $value, $field, $inputName) {
        echo '<pre>' . print_r( "hello", true ) . '</pre>';
        die;
    }

    /**
     * Enqueue admin css and js
     * @return void
    */
    public function enqueueAdmin() 
    {
        wp_register_script(
            'modularity-dynamic-guides-admin-js',
            MODULARITYDYNAMICGUIDES_URL . '/dist/' .
            $this->cacheBust->name('js/modularity-dynamic-guides-admin.js'),
            ['acf-input']
        );

        wp_enqueue_script('modularity-dynamic-guides-admin-js');

        wp_register_style(
            'modularity-dynamic-guides-admin-css',
            MODULARITYDYNAMICGUIDES_URL . '/dist/' .
            $this->cacheBust->name('css/modularity-dynamic-guides-admin.css')
        );

        wp_enqueue_style('modularity-dynamic-guides-admin-css');

    }

    /**
     * Enqueue frontend css and js
     * @return void
     */
    public function enqueueFrontend()
    {
        wp_register_style(
            'modularity-dynamic-guides-css',
            MODULARITYDYNAMICGUIDES_URL . '/dist/' .
            $this->cacheBust->name('css/modularity-dynamic-guides.css')
        );

        wp_enqueue_style('modularity-dynamic-guides-css');

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
