import Option from './option';
import Options from './options';
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
            
            const choice = el?.find('[data-name="choice"] input');
            const stepRow = el?.find('[data-name="choices"]');
            if (stepRow[0]) {
                const heading = el.find('[data-name="heading"] input');
                if (heading[0]) {
                    this.stepRowAdded(stepRow[0], heading[0]);
                }
            } else if (choice[0]) {
                const choicesElement = row?.closest('[dynamic-guide-options-instance]');
                console.log(choice);
                this.choiceRowAdded(choicesElement, choice);
            }
        });
    }

    stepRowAdded(stepRow, heading) {
        const key = this.generateUniqueKey();
        stepRow.setAttribute('dynamic-guide-options-instance', key);

        if (!globalState[key]) {
            globalState[key] = {};
        }

        
        const optionsInstance = new Option(key, this.group);
        if (!this.optionsInstance[key]) {
            this.optionsInstance[key] = optionsInstance;
        }
        optionsInstance.setupListeners({'el': heading, 'val': heading.value}, []);
    }

    choiceRowAdded(choicesElement, element) {
        const instance = choicesElement?.getAttribute('dynamic-guide-options-instance');

        if (element[0] && this.optionsInstance.hasOwnProperty(instance)) {
            console.log();
            this.optionsInstance[instance].listenToChoice({'el': element[0], 'val': ''});
        }
    }

    generateUniqueKey() {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substring(2, 10);
    
        return `${timestamp}_${random}`;
    }

    setupOptions() {
        const choicesSets = this.group.querySelectorAll('.acf-row:not(.acf-clone) [data-name="choices"]');
        if (!choicesSets) return;

        const steps = acf.getField('field_65b78add784cd');

        // const repeater = steps.$el.find('.acf-row:not(.acf-clone');

        // console.log(repeater);

        const headingsFields = acf.getFields({
            key: 'field_65b7993d1aba6',
            parent: steps.$el
        });

        let choicesArray = [];
        headingsFields.forEach(heading => {
            const choicesRepeater = acf.getFields({
                key: 'field_65b78b84784ce',
                sibling: heading.$el,
                limit: 1
            });
            
            if (choicesRepeater && choicesRepeater[0] && choicesRepeater[0].$el) {
                const key = this.generateUniqueKey();
                choicesRepeater[0].$el.attr('dynamic-guide-options-instance', key)
                const choices = acf.getFields({
                    key: 'field_65b78b92784cf',
                    parent: choicesRepeater[0].$el
                });
                
                if (choices) {
                    if (!globalState[key]) {
                        globalState[key] = {};
                    }

                    const optionsInstance = new Options(key, this.group);
                    if (!this.optionsInstance[key]) {
                        this.optionsInstance[key] = optionsInstance;
                    }
                    
                    optionsInstance.setupListeners(heading, choices);
                }
            }

        });
    }
}

export default setupOptions;