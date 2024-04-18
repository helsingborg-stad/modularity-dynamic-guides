import Guide from './frontend/guide';

document.addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('.dynamic-guide')].forEach(dynamicGuide => {
        new Guide(dynamicGuide);
    })
});