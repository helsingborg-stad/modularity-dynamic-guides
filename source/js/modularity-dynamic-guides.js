import StartGuide from './frontend/startGuide';

[...document.querySelectorAll('.dynamic-guide')].forEach(dynamicGuide => {
    new StartGuide(dynamicGuide);
})
