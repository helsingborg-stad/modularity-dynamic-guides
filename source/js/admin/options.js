import globalState from './globalState';

class Options {
    constructor(key, group) {
        this.key = key;
        this.group = group;
        this.choiceIndex = 0;
    }

    setupListeners(heading, choices) {
        const input = heading.$el.find('input');
        if (!input) return;

        let currentHeadingsValue = input.val();
        this.saveValueGlobally('heading', currentHeadingsValue);
        this.group.dispatchEvent(this.createCustomEvent('heading'));

        input.focus(() => {
            currentHeadingsValue = input.val();
        });
        
        input.change(() => {
            this.saveValueGlobally('heading', input.val());
            this.group.dispatchEvent(this.createCustomEvent('heading'));   
        });
        
        choices.forEach(choice => {
           this.listenToChoice(choice);
        });
    }

    listenToChoice(choice) {
        const input = choice.$el.find('input');
        if (!input) return;

        let currentChoiceValue = input.val();
        const choiceIndex = this.choiceIndex;
        this.saveValueGlobally('choice-' + choiceIndex + '_'+ this.key, currentChoiceValue);
        this.group.dispatchEvent(this.createCustomEvent('choice', 'choice-' + choiceIndex + '_'+ this.key));

        input.focus((e) => {
            currentChoiceValue = input.val();
        });

        input.change((e) => {
            this.saveValueGlobally('choice-' + choiceIndex + '_'+ this.key, input.val());
            this.group.dispatchEvent(this.createCustomEvent('choice', 'choice-' + choiceIndex + '_'+ this.key));   
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

export default Options;