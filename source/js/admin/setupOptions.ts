import Options from './options';
import globalState from './globalState';
import { GlobalState } from 'dynamic-guides-interface';

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

        const headingsFields = acf.getFields({
            key: 'field_65b7993d1aba6',
            parent: steps.$el
        });

        headingsFields.forEach(heading => {
            const choicesRepeater = acf.getFields({
                key: 'field_65b78b84784ce',
                sibling: heading.$el,
                limit: 1
            });
            
            if (choicesRepeater && choicesRepeater[0] && choicesRepeater[0].$el) {
                const key = globalState.generateUniqueKey();
                choicesRepeater[0].$el.attr('dynamic-guide-options-instance', key)
                const choices = acf.getFields({
                    key: 'field_65b78b92784cf',
                    parent: choicesRepeater[0].$el
                });
                
                if (choices) {
                    if (!(globalState as GlobalState)[key]) {
                        (globalState as GlobalState)[key] = {};
                    }

                    const optionsInstance = new Options(key, this.group);
                    if (!(globalState as GlobalState)[key]['instance']) {
                        (globalState as GlobalState)[key]['instance'] = optionsInstance;
                    }
                    
                    (globalState as GlobalState)[key]['instance'].setupListeners(heading, choices);
                }
            }

        });
    }
}

export default setupOptions;