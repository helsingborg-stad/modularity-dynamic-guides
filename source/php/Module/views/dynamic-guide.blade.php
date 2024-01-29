<div class="dynamic-guide">
    @includeWhen($backgroundImage, 'partials.background-image')
    <div class="dynamic-guide__guide u-padding__top--12">
        @paper([
        'classList' => ['u-padding--6', 'dynamic-guide__guide-container']
        ])
            @includeWhen($startPage, 'partials.start-page')
            @includeWhen(!empty($steps), 'guide.steps')
        @endpaper
    </div>
</div>