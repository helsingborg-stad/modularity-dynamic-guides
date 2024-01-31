import SetupOptions from "./admin/setupOptions";
import SetupOutcomes from "./admin/setupOutcomes";

document.addEventListener('DOMContentLoaded', () => {
    const group = document.querySelector('#acf-group_65b3a530b28a9');
    
    if (typeof acf !== 'undefined' && group) {
        new SetupOutcomes(group);
        new SetupOptions(group);
    }
})