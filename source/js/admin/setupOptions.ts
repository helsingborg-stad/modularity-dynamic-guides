import Options from './options';
import globalState from './globalState';
import { AcfField, GlobalState } from 'dynamic-guides-interface';

class setupOptions {
    group: HTMLElement;
    optionsInstance: Object;
    constructor(group: HTMLElement) {
        this.group = group;
        this.optionsInstance = {};

        this.setupOptions();
    }

    private generateUniqueKey() {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substring(2, 10);
    
        return `${timestamp}_${random}`;
    }

    private setupOptions() {
        const steps = acf.getField('field_65b78add784cd');

        if (!steps) return;

        const headingsFields = this.getHeadingsFields(steps);

        headingsFields.forEach(heading => {
            const choicesRepeater = this.getChoicesRepeaters(heading);
            
            if (choicesRepeater && choicesRepeater[0] && choicesRepeater[0].$el) {
                const key = globalState.generateUniqueKey();
                choicesRepeater[0].$el.attr('dynamic-guide-options-instance', key)
                const choices = this.getChoicesFields(choicesRepeater[0]);
                
                if (choices) {
                    this.setupAndSaveNewOptionsInstance(key);
                    (globalState as GlobalState)[key]['instance'].setupListeners(heading, choices);
                }
            }

        });
    }

    setupAndSaveNewOptionsInstance(key: string) {
        if (!(globalState as GlobalState)[key]) {
            (globalState as GlobalState)[key] = {};
        }

        const optionsInstance = new Options(key, this.group);
        if (!(globalState as GlobalState)[key]['instance']) {
            (globalState as GlobalState)[key]['instance'] = optionsInstance;
        }
    }

    getChoicesFields(choiceRepeater: AcfField) {
        return acf.getFields({
            key: 'field_65b78b92784cf',
            parent: choiceRepeater.$el
        });
    }

    getChoicesRepeaters(heading: AcfField) {
        return acf.getFields({
            key: 'field_65b78b84784ce',
            sibling: heading.$el,
            limit: 1
        });
    }

    getHeadingsFields(steps: AcfField) {
        return acf.getFields({
            key: 'field_65b7993d1aba6',
            parent: steps.$el
        });
    }
}

export default setupOptions;