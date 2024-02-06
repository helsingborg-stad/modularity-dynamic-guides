import globalState from './globalState';
import { GlobalState, AcfField } from 'dynamic-guides-interface';

class Options {
    group: HTMLElement;
    key: string;
    choiceIndex: number;

    constructor(key: string, group: HTMLElement) {
        this.group = group;
        this.key = key;
        this.choiceIndex = 0;
    }

    public setupListeners(heading: AcfField, choices: Array<AcfField>) {
        const input = heading.$el.find('input');
        if (!input) return;

        let currentHeadingsValue = input.val();
        this.saveValueGlobally('heading', currentHeadingsValue ?? "");
        this.group.dispatchEvent(this.createCustomEvent('heading'));

        input.focus(() => {
            currentHeadingsValue = input.val();
        });
        
        input.change(() => {
            this.saveValueGlobally('heading', input.val() ?? "");
            this.group.dispatchEvent(this.createCustomEvent('heading'));   
        });
        
        choices.forEach(choice => {
           this.listenToChoice(choice);
        });
    }

    private listenToChoice(choice: AcfField) {
        const input = choice.$el.find('input');
        if (!input) return;

        let currentChoiceValue = input.val();
        const choiceIndex = this.choiceIndex;
        this.saveValueGlobally('choice-' + choiceIndex + '_'+ this.key, currentChoiceValue ?? "");
        this.group.dispatchEvent(this.createCustomEvent('choice', 'choice-' + choiceIndex + '_'+ this.key));

        input.focus((e) => {
            currentChoiceValue = input.val();
        });

        input.change((e) => {
            this.saveValueGlobally('choice-' + choiceIndex + '_'+ this.key, input.val() ?? "");
            this.group.dispatchEvent(this.createCustomEvent('choice', 'choice-' + choiceIndex + '_'+ this.key));   
        });

        this.choiceIndex ++;
    }

    private saveValueGlobally(key: string, value: string) {
        (globalState as GlobalState)[this.key][key] = value;
    }

   private createCustomEvent(type: string, choiceKey: string|false = false) {
        let args = {
            'detail': {
                'key': this.key,
                'type': type,
                'choiceKey': choiceKey
            }
        };

        return new CustomEvent('dynamicGuidesCustomEvent', args);
    }
}

export default Options;