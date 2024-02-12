import globalState from "./globalState";
import SetupOutcomes from "./setupOutcomes";
import SetupOptions from "./setupOptions";
import Options from "./options";
import {GlobalState} from 'dynamic-guides-interface';

type SelectObject = { [key: string]: string };
type SelectObjects = { [key: string]: SelectObject };

class Actions {
    group: HTMLElement;
    outcomesInstance: SetupOutcomes;
    optionsInstance: SetupOptions;
    publishButton: HTMLElement|null;
    
    constructor(group: HTMLElement, outcomesInstance: SetupOutcomes, optionsInstance: SetupOptions) {
        this.group = group;
        this.outcomesInstance = outcomesInstance;
        this.optionsInstance = optionsInstance;
        this.publishButton = document.querySelector('#publishing-action');

        this.setupPublishListener();
        this.addActions();
    }

    private setupPublishListener() {
        if (!this.publishButton) return;
        this.publishButton.addEventListener('click', () => {
            this.validationAction();
        });
    }

    public addActions() {
        acf.addAction('remove', (el: JQuery<HTMLElement>) => {
            this.removeAction(el);
        });

        acf.addAction('append', (el: JQuery<HTMLElement>) => {
            this.appendAction(el);
        });

        if (!this.publishButton) {
            acf.add_filter('validation_complete', (json: Object, $form: Object) => {
                this.validationAction();
                return json;
            });
        }
    }

    private validationAction() {
        const selectObjects: SelectObjects = {};
        this.outcomesInstance.getSelects().forEach((select: HTMLSelectElement, index: number) => {
            const selected = select.selectedOptions;
            let selectObject: SelectObject = {};

            for (const option of selected) {
                const optgroup = option.parentElement;
                const optiongroupLabel = (optgroup as HTMLOptGroupElement)?.label;

                if (optiongroupLabel) {
                    selectObject[optiongroupLabel] = option.value;
                }
            }
                selectObjects[index] = selectObject;
        });
        
        this.outcomesInstance.hiddenField.val(JSON.stringify(selectObjects));
    }

    private appendAction(el: JQuery<HTMLElement>) {
        const row = el[0];
            
        const stepRow = el?.find('[data-name="choices"]');
        if (stepRow.length > 0) {
            const heading = acf.getFields({
                key: 'field_65b7993d1aba6',
                parent: el,
                limit: 1
            });

            if (heading[0]) {
                this.stepRowAdded(stepRow, heading[0]);
                return;
            }
        } 

        const choice = acf.getFields({
            key: 'field_65b78b92784cf',
            parent: el,
            limit: 1
        });
        
        if (choice[0]) {
            const choicesGroup = row?.closest('[dynamic-guide-options-instance]');
            if (choicesGroup) {
                this.choiceRowAdded(choicesGroup, choice[0]);
            }
            return;
        }

        const outcomeSelect = row?.querySelector('[data-name="outcome"] select');

        if (outcomeSelect) {
            this.outcomesInstance.selects.push(outcomeSelect as HTMLSelectElement);
            if (outcomeSelect) {
                this.setupNewSelect((outcomeSelect as HTMLSelectElement));
            }
            return;
        }
    }

    private removeAction(el: JQuery<HTMLElement>) {
        const row = el[0];
        if (!row) return;

        const stepRemoved = row.querySelector('[dynamic-guide-options-instance]');
        const optionRemoved = row.closest('[dynamic-guide-options-instance]');
        if (stepRemoved) {
            const instance = stepRemoved.getAttribute('dynamic-guide-options-instance');
            this.outcomesInstance.selects.forEach(select => {
                const optgroup = select.querySelector(`optgroup[dynamic-guide-optgroup="${instance}"]`);
                if (optgroup) {
                    optgroup.remove();

                    if (instance && globalState.hasOwnProperty(instance)) {
                        delete (globalState as GlobalState)[instance];
                    }
                }
            });
        }

        if (optionRemoved) {
            const instance = optionRemoved.getAttribute('dynamic-guide-options-instance');
            const removedOption = row.querySelector('[data-name="choice"] input');
            let choiceId: string | false | null = false;
            
            if (removedOption && instance) {
                this.outcomesInstance.selects.forEach(select => {
                    const option = select.querySelector(`optgroup[dynamic-guide-optgroup="${instance}"] option[value="${(removedOption as HTMLOptionElement).value}"]`);
                    
                    if (option) {
                        if (!choiceId) {
                            choiceId = option.hasAttribute('dynamic-guide-option') ? 
                            option.getAttribute('dynamic-guide-option') :
                            false;
                        }

                        option.remove();
                    } 
                });
                
                if (
                    choiceId && 
                    (globalState as GlobalState)[instance] && 
                    (globalState as GlobalState)[instance][choiceId]
                ) {
                        delete (globalState as GlobalState)[instance][choiceId];
                }
            }
        }
    }

    private stepRowAdded(stepRow: JQuery<HTMLElement>, heading: JQuery<HTMLElement>) {
        const key = globalState.generateUniqueKey();
        stepRow.attr('dynamic-guide-options-instance', key);

        if (!(globalState as GlobalState)[key]) {
            (globalState as GlobalState)[key] = {};
        }
        
        const optionsInstance = new Options(key, this.group);
        if (!(globalState as GlobalState)[key]['instance']) {
            (globalState as GlobalState)[key]['instance'] = optionsInstance;
        }

        (globalState as GlobalState)[key]['instance'].setupListeners(heading, []);
    }

    private choiceRowAdded(choicesGroup: Element, choice: JQuery<HTMLElement>) {
        const instance = choicesGroup?.getAttribute('dynamic-guide-options-instance');

        if (choice && instance && (globalState as GlobalState)[instance]['instance']) {
            (globalState as GlobalState)[instance]['instance'].listenToChoice(choice);
        }
    }

    private setupNewSelect(outcomeSelect: HTMLSelectElement) {
        for (const step in globalState) {
            for (const key in (globalState as GlobalState)[step]) {
                if (key === 'heading') {
                    this.outcomesInstance.createOptions(outcomeSelect, {'key': step, 'type': 'heading', 'choiceKey': false});
                } else if(key !== 'instance') {
                    this.outcomesInstance.createOptions(outcomeSelect, {'key': step, 'type': 'choice', 'choiceKey': key})
                }
            }
        }
    }
}

export default Actions;