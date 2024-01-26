<div class="dynamic-guide">
    @group([
        'direction' => 'vertical',
        'justifyContent' => 'center',
        'alignItems' => 'center',
        'classList' => ['dynamic-guide__heading']
    ])
        @typography([
            'element' => 'h2'
        ])
        {{ $heading }}
        @endtypography
        @typography([
            'classList' => ['dynamic-guide__preamble']
        ])
        {{$preamble}}
        @endtypography
        @button([
            'text' => $startButtonLabel
        ])
        @endbutton
    @endgroup
    @image([
        'src' => $image[0]
    ])
    @endimage
</div>