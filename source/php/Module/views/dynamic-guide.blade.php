<div class="dynamic-guide">
    @includeWhen($backgroundImage, 'partials.background-image')
    @includeWhen($startPage, 'partials.start-page')
    @includeWhen(!empty($steps), 'guide.steps')
</div>