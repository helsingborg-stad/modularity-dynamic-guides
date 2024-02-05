<div class="dynamic-guide__content u-display--none" data-js-dynamic-guide-step>

    @typography([
        'element' => 'h2',
        'variant' => 'h1',
        'classList' => ['u-margin__bottom--4']
    ])
        Här är dina svar. Klicka för resultat.
    @endtypography

    <div class="dynamic-guide__result" data-js-dynamic-guide-result></div>
<div>
    @button([
        'text' => "Hämta resultat",
        'color' => 'primary',
        'icon' => 'arrow_forward',
        'classList' => ['u-margin__top--3'],
        'attributeList' => ['data-js-dynamic-guide-button' => '']
    ])
    @endbutton
</div>

@button([
    'style' => 'basic',
    'color' => 'default',
    'text' => 'Inte rätt? Starta om guiden',
    'reversePositions' => 'true',
    'classList' => ['dynamic-guide-restart'],
    'attributeList' => ['data-js-dynamic-guide-restart-button' => '']
])
@endbutton
</div>

TODO: LÄGG TILL PROGRESSBAR