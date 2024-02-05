<div class="dynamic-guide__content u-display--none" data-js-dynamic-guide-endpage>

    @typography([
        'element' => 'h2',
        'variant' => 'h1',
        'classList' => ['u-margin__bottom--4']
    ])
        Här är dina svar. Klicka för resultat.
    @endtypography

    <div class="dynamic-guide__result" data-dynamic-guide-result></div>

    @button([
        'text' => "Hämta resultat",
        'color' => 'primary',
        'icon' => 'arrow_forward',
        'classList' => ['u-margin__top--3'],
        'attributeList' => ['data-js-dynamic-guide-get-results-button' => '']
    ])
    @endbutton

</div>

@button([
    'style' => 'basic',
    'color' => 'default',
    'text' => 'Inte rätt? Starta om guiden',
    'icon' => 'arrow_back',
    'reversePositions' => 'true',
    'classList' => ['u-display--none', 'u-margin__right--auto', 'u-margin__top--3'],
    'attributeList' => ['data-js-dynamic-guide-endpage-back-button' => '']
])
@endbutton
