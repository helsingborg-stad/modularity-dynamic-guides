import globalState from "./globalState";
import Options from "./options";

class Actions {
    constructor(group, outcomesInstance, optionsInstance) {
        this.group = group;
        this.outcomesInstance = outcomesInstance;
        this.optionsInstance = optionsInstance;

        this.addActions();
    }

    addActions() {
        acf.addAction('remove', (el) => {
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

                        if (globalState[instance]) {
                            delete globalState[instance];
                        }
                    }
                });
            }

            if (optionRemoved) {
                const instance = optionRemoved.getAttribute('dynamic-guide-options-instance');
                const removedOption = row.querySelector('[data-name="choice"] input');
                let choiceId = false;
                
                if (removedOption && instance) {
                    this.outcomesInstance.selects.forEach(select => {
                        const option = select.querySelector(`optgroup[dynamic-guide-optgroup="${instance}"] option[value="${removedOption.value}"]`);
                        
                        if (option) {
                            if (!choiceId) {
                                choiceId = option.hasAttribute('dynamic-guide-option') ? 
                                option.getAttribute('dynamic-guide-option') :
                                false;
                            }

                            option.remove();
                        } 
                    });
                    
                    if (choiceId && globalState[instance] && globalState[instance][choiceId]) {
                            delete globalState[instance][choiceId];
                    }
                }
            }
        });

        acf.addAction('append', (el) => {
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
                this.choiceRowAdded(choicesGroup, choice[0]);
                return;
            }

            const outcomeSelect = row?.querySelector('[data-name="outcome"] select');

            if (outcomeSelect) {
                this.outcomesInstance.selects.push(outcomeSelect);
                this.setupNewSelect(outcomeSelect);
                return;
            }
        });

        acf.add_filter('validation_complete', (json, $form) => {
            const selectObjects = {};
            this.outcomesInstance.getSelects().forEach((select, index) => {
                const selected = select.selectedOptions;
                let selectObject = {};
    
                for (const option of selected) {
                    const optiongroupLabel = option.parentElement?.label;
    
                    if (optiongroupLabel) {
                        selectObject[optiongroupLabel] = option.value;
                    }
                }
    
                selectObjects[index] = selectObject;
            });
    
            this.outcomesInstance.hiddenField.val(JSON.stringify(selectObjects));

            return json;
        });
    }

    stepRowAdded(stepRow, heading) {
        const key = globalState.generateUniqueKey();
        stepRow.attr('dynamic-guide-options-instance', key);

        if (!globalState[key]) {
            globalState[key] = {};
        }

        
        const optionsInstance = new Options(key, this.group);
        if (!globalState[key]['instance']) {
            globalState[key]['instance'] = optionsInstance;
        }

        globalState[key]['instance'].setupListeners(heading, []);
    }

    choiceRowAdded(choicesGroup, choice) {
        const instance = choicesGroup?.getAttribute('dynamic-guide-options-instance');

        if (choice && instance && globalState[instance]['instance']) {
            globalState[instance]['instance'].listenToChoice(choice);
        }
    }

    setupNewSelect(outcomeSelect) {
        if (outcomeSelect[0] && outcomeSelect[0].$el) {
            return;
        }
        for (const step in globalState) {
            for (const key in globalState[step]) {
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