import Option from './option';
import globalState from './globalState';

class setupOptions {
    constructor(group) {
        this.group = group;
        this.optionsInstance = {};
        this.setupOptions();
        this.addActions();

  
    }
    
    addActions() {
        acf.addAction('append', (el) => {
            const row = el[0];
            const element = row?.querySelector('input');
            const choicesElement = row?.closest('[dynamic-guide-options-instance]');

            if (choicesElement) {
                const instance = choicesElement.getAttribute('dynamic-guide-options-instance');
                
                if (this.optionsInstance.hasOwnProperty(instance)) {
                    this.optionsInstance[instance].listenToChoice({'el': element, 'val': ''});
                }
            }
        });
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
            const key = this.generateUniqueKey();
            set.setAttribute('dynamic-guide-options-instance', key);

            if (!heading) return;
            const choicesArr = [...set.querySelectorAll('.acf-row:not(.acf-clone)')].map(choiceRow => {
                const choice = choiceRow.querySelector('[data-name="choice"] input');
                return choice && choice.value ? {'el': choice, 'val': choice.value} : false;
            });
            
            
            if (!globalState[key]) {
                globalState[key] = {};
            }

            
            const optionsInstance = new Option(key, this.group);
            if (!this.optionsInstance[key]) {
                this.optionsInstance[key] = optionsInstance;
            }
            optionsInstance.setupListeners({'el': heading, 'val': heading.value}, choicesArr);
        });
    }
}

export default setupOptions;