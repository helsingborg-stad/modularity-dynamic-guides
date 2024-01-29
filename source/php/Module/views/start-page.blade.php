@group([
    'direction' => 'vertical',
    'justifyContent' => 'center',
    'alignItems' => 'center',
    'classList' => ['dynamic-guide__start-page']
])
    @if($startPage['preamble'])
        @typography([
            'element' => 'h2',
            'classList' => ['dynamic-guide__heading']
        ])
        @endtypography
    @endif
    @if($startPage['preamble'])
        @typography([
            'classList' => ['dynamic-guide__preamble']
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
