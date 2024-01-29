<div class="dynamic-guide__guide u-padding__top--12 u-display--none" data-js-dynamic-guide-steps>
    @paper([
    'classList' => ['u-padding--6', 'dynamic-guide__guide-container']
    ])
        @foreach($steps as $index => $step)
            <div class="dynamic-guide__content dynamic-guide__step u-display--none" data-js-dynamic-guide-step="{{ $index }}">
            @if(!empty($step['heading']))
            @typography([
                'element'   => 'h2',
                'variant'   => 'h1',
                'classList' => ['u-margin__bottom--4']
            ])
                {{ $step['heading'] }}
            @endtypography
            @endif
                @if(is_array($step['choices']))
                    @foreach($step['choices'] as $choiceData)
                        @if(!empty($choiceData['choice']))
                                @button([
                                    'text'      => $choiceData['choice'],
                                    'color'     => 'primary',
                                    'classList' => ['dynamic-guide__step-choice', 'u-margin__left--0', 'u-margin__y--1'],
                                    'attributeList' => ['data-js-dynamic-guide-choice' => $choiceData['choice']]
                                ])
                                @endbutton
                        @endif
                    @endforeach
                @endif
            
            @button([
                'style'             => 'basic',
                'color'             => 'default',
                'text'              => 'Previous step',
                'icon'              => 'arrow_back',
                'reversePositions'  => 'true',
                'classList'         => ['u-margin__right--auto', 'u-margin__top--3'],
                'attributeList'     => ['data-js-dynamic-guide-back-button' => '']
            ])
            test
            @endbutton
            </div>
        @endforeach
    @endpaper
</div>