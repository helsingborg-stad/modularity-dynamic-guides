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
        
        $data['outcome'] = $this->getOutcome($fields);

        return $data;
    }

    private function getOutcome(array $fields) 
    {
        if (!isset($_GET['outcome'])) { return false; }
        $outcomes = $fields['dynamic_guide_outcomes'];
        $outcomeIndex = $this->getOutcomeIndex($fields);

        if ($outcomeIndex === false || empty($outcomes[$outcomeIndex])) {
           return false;
        }

        $outcome = array_merge($this->defaultOutcomeValues(), $outcomes[$outcomeIndex]);

        if ($outcome['outcome_posts']) {
            $outcome['outcome_posts'] = $this->getPosts($outcome['outcome_posts']);
        }

        if ($outcome['outcome_image']) {
            $outcome['outcome_image'] = $this->getImageFromId($outcome['outcome_image']);
        }
        
        return \Municipio\Helper\FormatObject::camelCase($outcome);
    }

    private function defaultOutcomeValues(): array 
    {
        return [
            'outcome_posts' => false,
            'outcome_content' => false,
            'outcome_title' => false,
        ];
    }



    private function getOutcomeIndex(array $fields) {
        $outcomes = $fields['dynamic_guide_outcomes_hidden'];
        $urlOutcome = stripslashes($_GET['outcome']);
        $urlOutcome = (array) json_decode($urlOutcome, false);

        
        if (!empty($urlOutcome) && !empty($outcomes) && is_string($outcomes)) {
            $outcomes = (array) json_decode($outcomes);
            $matchingOutcome = false;
            foreach ($outcomes as $index => $outcome) {
                $outcome = (array) $outcome;
                $arrayKeysAreTheSame = $this->checkSameArrayKeys($outcome, $urlOutcome);
                
                if ($arrayKeysAreTheSame) {
                    $matchingOutcome = $index;
                    break;
                }
            }
            
            return $matchingOutcome;
        }

        return false;
    }

    private function checkSameArrayKeys(array $outcome, array $urlOutcome)
    {
        ksort($outcome);
        ksort($urlOutcome);
        if (array_keys($urlOutcome) !==  array_keys($outcome)) {
            return false;
        }
        
        $matchingValues = true;
        foreach ($urlOutcome as $key => $value) {
            if ($value !== $outcome[$key]) {
                $matchingValues = false;
                break;
            }
        }

        return $matchingValues;
    }

    private function getPosts(array $postIds) 
    {
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

    private function getStartPageValues(array $fields): array 
    {
        $startPage = !empty($fields['dynamic_guide_start_page']) ? 
        array_merge($this->defaultStartPageValues(), $fields['dynamic_guide_start_page']) : 
        [];

        return $startPage;
    }

    private function getChoicesSteps(array $fields) 
    {
        return !empty($fields['dynamic_guide_steps']) ? $fields['dynamic_guide_steps'] : false;
    }

    private function defaultStartPageValues() 
    {
        return [
            'heading' => '',
            'preamble' => '',
            'button_label' => '',
        ];
    }

    private function getImageFromId($id) 
    {
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
