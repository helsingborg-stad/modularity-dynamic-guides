<?php

namespace ModularityDynamicGuides\Module;

class DynamicGuides extends \Modularity\Module
{
    public $slug = 'dynamic-guide';
    public $supports = array();
    public $blockSupports = array(
        'align' => ['full'],
        'mode' => false
    );

    public function init()
    {
        //Define module
        $this->nameSingular = __("Dynamic guide", 'modularity-dynamic-guides');
        $this->namePlural = __("Dynamic guides", 'modularity-dynamic-guides');
        $this->description = __("Creates dynamic guides.", 'modularity-dynamic-guides');

        add_filter('Modularity/Block/Settings', function ($blockSettings, $slug) {
            if ($slug == $this->slug) {
                $blockSettings['mode'] = 'edit';
            }
            return $blockSettings;
        }, 10, 2);
    }

    public function template(): string
    {
        return "dynamic-guide.blade.php";
    }

    /**
     * Available "magic" methods for modules:
     * init()            What to do on initialization
     * data()            Use to send data to view (return array)
     * style()           Enqueue style only when module is used on page
     * script            Enqueue script only when module is used on page
     * adminEnqueue()    Enqueue scripts for the module edit/add page in admin
     * template()        Return the view template (blade) the module should use when displayed
     */
}
