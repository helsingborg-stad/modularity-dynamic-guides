import globalState from './globalState';

class Option {
    constructor(key, group) {
        this.key = key;
        this.group = group;
        this.choiceIndex = 0;
    }

    setupListeners(heading, choices) {
        let currentHeadingsValue = heading.el.value;
        this.saveValueGlobally('heading', currentHeadingsValue);
        this.group.dispatchEvent(this.createCustomEvent('heading'));
        
        heading.el.addEventListener('focus', (e) => {
            currentHeadingsValue = heading.el.value;
        });
        
        heading.el.addEventListener('change', (e) => {
            this.saveValueGlobally('heading', heading.el.value);
            this.group.dispatchEvent(this.createCustomEvent('heading'));   
        });
        
        choices.forEach(choice => {
           this.listenToChoice(choice);
        });
    }

    listenToChoice(choice) {
        let currentChoiceValue = choice.el.value;
        const choiceIndex = this.choiceIndex;
        this.saveValueGlobally('choice-' +  choiceIndex, currentChoiceValue);
        this.group.dispatchEvent(this.createCustomEvent('choice', 'choice-' + choiceIndex));

        choice.el.addEventListener('focus', (e) => {
            currentChoiceValue = choice.el.value;
        });

        choice.el.addEventListener('change', (e) => {
            this.saveValueGlobally('choice-' +  choiceIndex, choice.el.value);
            this.group.dispatchEvent(this.createCustomEvent('choice', 'choice-' + choiceIndex));   
        });

        this.choiceIndex ++;
    }

    saveValueGlobally(key, value) {
        globalState[this.key][key] = value;
    }

    createCustomEvent(type, choiceKey = false) {
        let args = {
            'detail': {
                'key': this.key,
                'type': type,
                'choiceKey': choiceKey
            }
        };

        return new CustomEvent('customEvent', args);
    }
}

export default Option;