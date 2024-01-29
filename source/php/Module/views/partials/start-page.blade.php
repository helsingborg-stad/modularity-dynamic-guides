<div class="dynamic-guide__guide u-padding__top--12">
    @paper([
    'classList' => ['u-padding--6', 'dynamic-guide__guide-container']
    ])
        <div class="dynamic-guide__content">
            @if($startPage['heading'])
                @typography([
                    'element' => 'h2',
                    'variant' => 'h1',
                    'classList' => ['u-margin__bottom--4']
                ])
                {{ $startPage['heading'] }}
                @endtypography
            @endif
            @if($startPage['preamble'])
                @typography([
                    'classList' => ['u-margin__y--2'],
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
                {{ $startPage['button_label'] }}
            @endbutton
        </div>
    @endpaper
</div>