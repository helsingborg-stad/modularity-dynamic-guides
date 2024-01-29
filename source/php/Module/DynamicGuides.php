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

    
    /**
     * View data
     * @return array
    */
    public function data(): array
    {
        $data = [];
        $fields = get_fields($this->ID);
        $data['startPage'] = $this->getStartPageValues($fields);
        
        return $data;
    }

    private function getStartPageValues(array $fields) {
        $startPage = !empty($fields['dynamic_guide_start_page']) ? 
        array_merge($this->defaultStartPageValues(), $fields['dynamic_guide_start_page']) : 
        [];

        $startPage['background_image'] = $this->getImageFromId($startPage['background_image']);

        if (!class_exists('\Municipio\Helper\FormatObject')) {
           return false; 
        }

        return (array) \Municipio\Helper\FormatObject::camelCase($startPage);
    }

    private function defaultStartPageValues() {
        return [
            'heading' => '',
            'preamble' => '',
            'button_label' => '',
            'background_image' => false

        ];
    }

    private function getImageFromId($id) {
        if ($id && class_exists('\Municipio\Helper\Image')) {
            return \Municipio\Helper\Image::getImageAttachmentData($id, [1920, 1080]);
        }

        return false;
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
