<?php 

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
    'key' => 'group_65b3a530b28a9',
    'title' => __('Dynamic Guides', 'modularity-dynamic-guides'),
    'fields' => array(
        0 => array(
            'key' => 'field_65b3cce38dd5c',
            'label' => __('Background image', 'modularity-dynamic-guides'),
            'name' => 'dynamic_guide_background_image',
            'aria-label' => '',
            'type' => 'image',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'uploader' => '',
            'return_format' => 'id',
            'acfe_thumbnail' => 0,
            'min_width' => '',
            'min_height' => '',
            'min_size' => '',
            'max_width' => '',
            'max_height' => '',
            'max_size' => '',
            'mime_types' => '',
            'preview_size' => 'medium',
            'library' => 'all',
        ),
        1 => array(
            'key' => 'field_65b3d572b576a',
            'label' => __('Start page', 'modularity-dynamic-guides'),
            'name' => 'dynamic_guide_start_page',
            'aria-label' => '',
            'type' => 'group',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'layout' => 'block',
            'acfe_seamless_style' => 0,
            'acfe_group_modal' => 0,
            'acfe_group_modal_close' => 0,
            'acfe_group_modal_button' => '',
            'acfe_group_modal_size' => 'large',
            'sub_fields' => array(
                0 => array(
                    'key' => 'field_65b3a5735e4bd',
                    'label' => __('Heading', 'modularity-dynamic-guides'),
                    'name' => 'heading',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
                1 => array(
                    'key' => 'field_65b3c83bc5ce2',
                    'label' => __('Preamble', 'modularity-dynamic-guides'),
                    'name' => 'preamble',
                    'aria-label' => '',
                    'type' => 'textarea',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'acfe_textarea_code' => 0,
                    'maxlength' => '',
                    'rows' => '',
                    'placeholder' => '',
                    'new_lines' => '',
                ),
                2 => array(
                    'key' => 'field_65b3c85dc5ce3',
                    'label' => __('Button label', 'modularity-dynamic-guides'),
                    'name' => 'button_label',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
            ),
        ),
        2 => array(
            'key' => 'field_65c2503d18bae',
            'label' => __('End page', 'modularity-dynamic-guides'),
            'name' => 'dynamic_guide_end_page',
            'aria-label' => '',
            'type' => 'group',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'layout' => 'block',
            'acfe_seamless_style' => 0,
            'acfe_group_modal' => 0,
            'acfe_group_modal_close' => 0,
            'acfe_group_modal_button' => '',
            'acfe_group_modal_size' => 'large',
            'sub_fields' => array(
                0 => array(
                    'key' => 'field_65c2510318bb0',
                    'label' => __('Heading', 'modularity-dynamic-guides'),
                    'name' => 'heading',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
                1 => array(
                    'key' => 'field_65c250a318baf',
                    'label' => __('Result button label', 'modularity-dynamic-guides'),
                    'name' => 'result_button_label',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => __('The button label to get the result of the guide.', 'modularity-dynamic-guides'),
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
                2 => array(
                    'key' => 'field_65c2514018bb1',
                    'label' => __('Restart button label', 'modularity-dynamic-guides'),
                    'name' => 'restart_button_label',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => __('Button label to restart the guide', 'modularity-dynamic-guides'),
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
            ),
        ),
        3 => array(
            'key' => 'field_65c32a399cbd2',
            'label' => __('Results page', 'modularity-dynamic-guides'),
            'name' => 'dynamic_guide_results_page',
            'aria-label' => '',
            'type' => 'group',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'layout' => 'block',
            'acfe_seamless_style' => 0,
            'acfe_group_modal' => 0,
            'acfe_group_modal_close' => 0,
            'acfe_group_modal_button' => '',
            'acfe_group_modal_size' => 'large',
            'sub_fields' => array(
                0 => array(
                    'key' => 'field_65c32a529cbd3',
                    'label' => __('Restart guide button label', 'modularity-dynamic-guides'),
                    'name' => 'restart_button_label',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => __('The label for the button to restart the guide after getting the results', 'modularity-dynamic-guides'),
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
            ),
        ),
        4 => array(
            'key' => 'field_65b78add784cd',
            'label' => __('Steps', 'modularity-dynamic-guides'),
            'name' => 'dynamic_guide_steps',
            'aria-label' => '',
            'type' => 'repeater',
            'instructions' => __('Create one for each step in the guide', 'modularity-dynamic-guides'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => 'testing123',
                'id' => '',
            ),
            'acfe_repeater_stylised_button' => 0,
            'layout' => 'block',
            'pagination' => 0,
            'min' => 0,
            'max' => 0,
            'collapsed' => '',
            'button_label' => __('Add Row', 'modularity-dynamic-guides'),
            'rows_per_page' => 20,
            'sub_fields' => array(
                0 => array(
                    'key' => 'field_65b7993d1aba6',
                    'label' => __('Heading', 'modularity-dynamic-guides'),
                    'name' => 'heading',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'parent_repeater' => 'field_65b78add784cd',
                ),
                1 => array(
                    'key' => 'field_65b78b84784ce',
                    'label' => __('Step', 'modularity-dynamic-guides'),
                    'name' => 'choices',
                    'aria-label' => '',
                    'type' => 'repeater',
                    'instructions' => __('Amount of choices for the step', 'modularity-dynamic-guides'),
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'acfe_repeater_stylised_button' => 0,
                    'layout' => 'row',
                    'min' => 0,
                    'max' => 0,
                    'collapsed' => '',
                    'button_label' => __('Add Row', 'modularity-dynamic-guides'),
                    'rows_per_page' => 20,
                    'parent_repeater' => 'field_65b78add784cd',
                    'sub_fields' => array(
                        0 => array(
                            'key' => 'field_65b78b92784cf',
                            'label' => __('Choice', 'modularity-dynamic-guides'),
                            'name' => 'choice',
                            'aria-label' => '',
                            'type' => 'text',
                            'instructions' => '',
                            'required' => 1,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'maxlength' => '',
                            'placeholder' => '',
                            'prepend' => '',
                            'append' => '',
                            'parent_repeater' => 'field_65b78b84784ce',
                        ),
                    ),
                ),
            ),
        ),
        5 => array(
            'key' => 'field_65b8b17f91cdf',
            'label' => __('Outcomes', 'modularity-dynamic-guides'),
            'name' => 'dynamic_guide_outcomes',
            'aria-label' => '',
            'type' => 'repeater',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'acfe_repeater_stylised_button' => 0,
            'layout' => 'block',
            'pagination' => 0,
            'min' => 0,
            'max' => 0,
            'collapsed' => '',
            'button_label' => __('Add Row', 'modularity-dynamic-guides'),
            'rows_per_page' => 20,
            'sub_fields' => array(
                0 => array(
                    'key' => 'field_65b8ee0ac6cd8',
                    'label' => __('Outcome', 'modularity-dynamic-guides'),
                    'name' => 'outcome',
                    'aria-label' => '',
                    'type' => 'select',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'choices' => array(
                    ),
                    'default_value' => array(
                    ),
                    'return_format' => 'array',
                    'multiple' => 1,
                    'allow_null' => 0,
                    'ui' => 0,
                    'ajax' => 0,
                    'placeholder' => '',
                    'allow_custom' => 0,
                    'search_placeholder' => '',
                    'parent_repeater' => 'field_65b8b17f91cdf',
                ),
                1 => array(
                    'key' => 'field_65bcf9c7288ef',
                    'label' => __('Posts', 'modularity-dynamic-guides'),
                    'name' => 'outcome_posts',
                    'aria-label' => '',
                    'type' => 'post_object',
                    'instructions' => __('Posts to show for following outcome', 'modularity-dynamic-guides'),
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'post_type' => '',
                    'post_status' => array(
                        0 => 'publish',
                    ),
                    'taxonomy' => '',
                    'return_format' => 'id',
                    'multiple' => 1,
                    'save_custom' => 0,
                    'save_post_status' => 'publish',
                    'acfe_bidirectional' => array(
                        'acfe_bidirectional_enabled' => '0',
                    ),
                    'allow_null' => 0,
                    'bidirectional' => 0,
                    'ui' => 1,
                    'bidirectional_target' => array(
                    ),
                    'save_post_type' => '',
                    'parent_repeater' => 'field_65b8b17f91cdf',
                ),
                2 => array(
                    'key' => 'field_65c0a46e6d241',
                    'label' => __('Title', 'modularity-dynamic-guides'),
                    'name' => 'outcome_title',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'parent_repeater' => 'field_65b8b17f91cdf',
                ),
                3 => array(
                    'key' => 'field_65c0a47c6d242',
                    'label' => __('Content', 'modularity-dynamic-guides'),
                    'name' => 'outcome_content',
                    'aria-label' => '',
                    'type' => 'textarea',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'acfe_textarea_code' => 0,
                    'maxlength' => '',
                    'rows' => '',
                    'placeholder' => '',
                    'new_lines' => '',
                    'parent_repeater' => 'field_65b8b17f91cdf',
                ),
                4 => array(
                    'key' => 'field_65c0a4576d240',
                    'label' => __('Image', 'modularity-dynamic-guides'),
                    'name' => 'outcome_image',
                    'aria-label' => '',
                    'type' => 'image',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'uploader' => '',
                    'return_format' => 'id',
                    'acfe_thumbnail' => 0,
                    'min_width' => '',
                    'min_height' => '',
                    'min_size' => '',
                    'max_width' => '',
                    'max_height' => '',
                    'max_size' => '',
                    'mime_types' => '',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'parent_repeater' => 'field_65b8b17f91cdf',
                ),
                5 => array(
                    'key' => 'field_65c0a48f6d243',
                    'label' => __('Call To Action Url', 'modularity-dynamic-guides'),
                    'name' => 'outcome_call_to_action_url',
                    'aria-label' => '',
                    'type' => 'url',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '50',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'parent_repeater' => 'field_65b8b17f91cdf',
                ),
                6 => array(
                    'key' => 'field_65c388d95871b',
                    'label' => __('Call To Action Label', 'modularity-dynamic-guides'),
                    'name' => 'outcome_call_to_action_label',
                    'aria-label' => '',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '50',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'maxlength' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'parent_repeater' => 'field_65b8b17f91cdf',
                ),
            ),
        ),
        6 => array(
            'key' => 'field_65ba49cbdb950',
            'label' => __('dynamic_guide_outcomes_hidden', 'modularity-dynamic-guides'),
            'name' => 'dynamic_guide_outcomes_hidden',
            'aria-label' => '',
            'type' => 'acfe_hidden',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'mod-dynamic-guide',
            ),
        ),
        1 => array(
            0 => array(
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/dynamic-guide',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'left',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
    'show_in_rest' => 0,
    'acfe_display_title' => '',
    'acfe_autosync' => array(
        0 => 'json',
    ),
    'acfe_form' => 0,
    'acfe_meta' => '',
    'acfe_note' => '',
));
}