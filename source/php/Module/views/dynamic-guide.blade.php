<div class="dynamic-guide">
@if(empty($outcome))
    @includeWhen($backgroundImage, 'partials.background-image')
    <div class="dynamic-guide__guide u-padding__top--12">
        @paper([
        'classList' => ['u-padding--6', 'dynamic-guide__guide-container']
        ])
            @includeWhen($startPage, 'partials.start-page')
            @includeWhen(!empty($steps), 'guide.steps')
            @include('partials.end-page')
            @button([
                'style'             => 'basic',
                'color'             => 'default',
                'text'              => 'Previous step',
                'icon'              => 'arrow_back',
                'reversePositions'  => 'true',
                'classList'         => ['u-display--none', 'u-margin__right--auto', 'u-margin__top--3'],
                'attributeList'     => ['data-js-dynamic-guide-back-button' => '']
            ])
            @endbutton
        @endpaper
    </div>
    @else
        @include('partials.results-page')
    @endif
</div>
