import Option from './option';
import globalState from './globalState';

class setupOptions {
    constructor(group) {
        this.group = group;
        this.setupOptions();
    }


    addOptions() {
        let optionsGroups = "";
        this.choices.forEach(choice => {
            optionsGroups += `<optgroup label="${choice.heading}">${this.createOption(choice.choices)}</optgroup>`;
        });

        this.selects.innerHTML = optionsGroups;
    }

    createOption(choices) {
        if (!choices) return;
        let string = "";
        choices.forEach(choice => {
            string += `<option value="${choice}">${choice}</option>`;
        });

        return string;
    }

    addChoice(element, choicesField) {
        const heading = choicesField.previousElementSibling;
        if (!heading) return;

        console.log(heading.querySelector('input'));
    }

    generateUniqueKey() {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substring(2, 10); // Using random characters
    
        return `${timestamp}_${random}`;
    }

    setupOptions() {
        const choicesSets = this.group.querySelectorAll('.acf-row:not(.acf-clone) [data-name="choices"]');
        if (!choicesSets) return;
        
        choicesSets.forEach(set => {
            const choicesRow = set.parentElement;
            const heading = choicesRow?.querySelector('[data-name="heading"] input');
            if (!heading) return;
            const choicesArr = [...set.querySelectorAll('.acf-row:not(.acf-clone)')].map(choiceRow => {
                const choice = choiceRow.querySelector('[data-name="choice"] input');
                return choice && choice.value ? {'el': choice, 'val': choice.value} : false;
            });
            
            const key = this.generateUniqueKey();
            
            if (!globalState[key]) {
                globalState[key] = {};
            }
            
            const optionsInstance = new Option(key, this.group);
            optionsInstance.setupListeners({'el': heading, 'val': heading.value}, choicesArr);
        });
    }
}

export default setupOptions;