import StartGuide from './frontend/startGuide';
import Test from './frontend/test';

[...document.querySelectorAll('.dynamic-guide')].forEach(dynamicGuide => {
    // new StartGuide(dynamicGuide);
    new Test(dynamicGuide);
})
