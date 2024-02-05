@segment([
    'title'         => $resultPage['outcome_title'],
    'content'       => $resultPage['outcome_content'],
    'layout'        => 'split',
    'image'         => 'https://picsum.photos/1080/720?e',
    'background'    => 'primary',
    'textColor'     => 'light',
    'textAlignment' => 'center',
    'imageFocus'    => ['top' => '90', 'left' => '100'],
])
 
 
@button([
    'variant'       => 'default',
    'text'          => 'Ladda ner checklista',
    'icon'          => 'arrow_forward',
])
@endbutton
 
@endsegment
 
<div class="o-grid">
@foreach($posts as $post)    
    <div class="o-grid-12@xs o-grid-6@sm o-grid-4@md o-grid-4@lg o-grid-4@xl u-margin__top--4">
        @block([
            'heading' => $post->postTitle,
            'ratio' => '12:16',
            'filled' => true,
            'image' => $post->images['thumbnail12:16'],
            'link' => $permalink,
        ])
        @endblock
    </div>
    @endforeach
</div>
@button([
    'style' => 'basic',
    'color' => 'default',
    'text' => 'Starta om guiden',
    'icon' => 'arrow_back',
    'reversePositions' => 'true',
    'classList' => ['u-margin__right--auto', 'u-margin__top--3'],
    'attributeList' => ['data-js-dynamic-guide-endpage-back-button' => '']
])
@endbutton