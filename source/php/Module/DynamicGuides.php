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
        $data['steps'] = $this->getChoicesSteps($fields);
        $data['backgroundImage'] = !empty($fields['dynamic_guide_background_image']) ? 
        $this->getImageFromId($fields['dynamic_guide_background_image']) : false;
        
        
        $data['resultPage'] = $this->getResultPageValues($fields);
        $data['posts'] = $this->getPosts($fields['dynamic_guide_outcomes'][0]['outcome_posts']);

        $data['outcome'] = $this->getOutcome($fields);

        return $data;
    }

    private function getOutcome(array $fields) {
        $outcomes = $fields['dynamic_guide_outcomes_hidden'];

        if (!empty($outcomes) && is_string($outcomes)) {
            $outcomes = json_decode($outcomes);

            foreach ((array) $outcomes as $outcome) {
                echo '<pre>' . print_r( $outcome, true ) . '</pre>';
            }
        }
    }

    private function getPosts(array $postIds) {
        $posts = [];
        foreach ($postIds as $postId) {
            $post = get_post($postId);
            if (!empty($post)) {
                $post = \Municipio\Helper\Post::preparePostObject($post);
                $posts[] = $post;
            }
        }

        return $posts;
    }

    private function getResultPageValues(array $fields) {
        $outcomeData  = $fields['dynamic_guide_outcomes'][0];

        return $outcomeData;
    }

    private function getStartPageValues(array $fields): array {
        $startPage = !empty($fields['dynamic_guide_start_page']) ? 
        array_merge($this->defaultStartPageValues(), $fields['dynamic_guide_start_page']) : 
        [];

        return $startPage;
    }

    private function getChoicesSteps(array $fields) {
        return !empty($fields['dynamic_guide_steps']) ? $fields['dynamic_guide_steps'] : false;
    }

    private function defaultStartPageValues() {
        return [
            'heading' => '',
            'preamble' => '',
            'button_label' => '',
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
