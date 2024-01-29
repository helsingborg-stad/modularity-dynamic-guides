<div class="dynamic-guide__guide u-padding__top--12">
    @paper([
    'classList' => ['u-padding--6', 'u-display--flex', 'u-justify-content--center']
    ])
        @group([
            'display' => 'inline-flex',
            'direction' => 'vertical',
            'justifyContent' => 'center'
        ])
            @if($startPage['heading'])
                @typography([
                    'element' => 'h2',
                    'variant' => 'h1',
                    'classList' => ['u-text-align--center']
                ])
                {{ $startPage['heading'] }}
                @endtypography
            @endif
            @if($startPage['preamble'])
                @typography([
                    'classList' => ['u-text-align--center', 'u-margin__y--2'],
                    'attributeList' => ['style' => 'max-width: unset;']
                ]) 
                {{ $startPage['preamble'] }}
                @endtypography
            @endif
            @button([
                'text' => "label",
                'color' => 'primary',
                'attributeList' => ['dynamic-guide-start' => '']
            ])
            @endbutton
        @endgroup
    @endpaper
</div>