import Guide from './frontend/guide';

[...document.querySelectorAll('.dynamic-guide')].forEach(dynamicGuide => {
    new Guide(dynamicGuide);
})
