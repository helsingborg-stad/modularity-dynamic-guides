import globalState from './globalState';

class SetupOutcomes {
    constructor(group) {
        this.group = group;
        this.selects = this.getSelects();
        this.hiddenField = acf.getField('field_65ba49cbdb950');
        this.hiddenFieldValue = this.hiddenField.val() ? JSON.parse(this.hiddenField.val()) : false;

        if (!this.hiddenField) return;

        this.addActions();

        if (this.selects) {
            this.setupAlreadyCreatedSelects();

            this.selects.forEach(select => {
                this.setSelectListener(select);
            });
        }
    }

    setSelectListener(select) {
        select.addEventListener('change', (e) => {
            this.setHiddenValue();
        })
    }

    setHiddenValue() {
        const selectObjects = {};

        this.getSelects().forEach((select, index) => {
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

        this.hiddenField.val(JSON.stringify(selectObjects));
    }

    addActions() {
        acf.addAction('append', (el) => {
            const outcomeSelect = el[0]?.querySelector('[data-name="outcome"] select');

            if (outcomeSelect) {
                this.selects.push(outcomeSelect);
                this.setupNewSelect(outcomeSelect);
                this.setSelectListener(outcomeSelect);
            }
        });

        acf.addAction('remove', (el) => {
            const select = el[0].querySelector('select');
            if (select) {
                const index = this.selects.indexOf(select);
                if (index !== -1) {
                    this.selects.splice(index, 1);
                    setTimeout(() => {
                        this.setHiddenValue();
                    }, 1000);
                }
            }
        });
    }

    getSelects() {
        const field = this.group.querySelector('[data-name="dynamic_guide_outcomes"]');

        const selectsArr = [...field.querySelectorAll('.acf-row:not(.acf-clone)')].map(selectRow => {
            const select = selectRow.querySelector('[data-name="outcome"] select');
            return select ? select : false;
        });

        return selectsArr ? selectsArr : [];
    }

    setupNewSelect(outcomeSelect) {
        console.log(globalState);
        for (const step in globalState) {
            for (const key in globalState[step]) {
                if (key === 'heading') {
                    this.createOptions(outcomeSelect, {'key': step, 'type': 'heading', 'choiceKey': false});
                } else {
                    this.createOptions(outcomeSelect, {'key': step, 'type': 'choice', 'choiceKey': key})
                }

            }
        }
    }
    
    setupAlreadyCreatedSelects() {
        this.group.addEventListener('customEvent', (e) => {
            this.selects.forEach((select, index) => {
                this.createOptions(select, e.detail);
                if (this.hiddenFieldValue[index]) {
                    for (const key in this.hiddenFieldValue[index]) {
                        const preSelect = select.querySelector(`optgroup[label="${key}"] option[value="${this.hiddenFieldValue[index][key]}"]`);

                        if (preSelect) {
                            preSelect.selected = true;
                        }
                    }
                }
            });
        });
    }

    createOptions(select, detail) {
        const {key, type, choiceKey} = detail;

        if (globalState[key]['heading']) {
            const optgroup = select.querySelector(`optgroup[dynamic-guide-optgroup="${key}"]`);
            const option = optgroup?.querySelector(`option[dynamic-guide-option="${choiceKey}"]`)
            
            if (type === 'choice') {
                this.addOption(key, choiceKey, option, optgroup);
            } else {
                this.addOptgroup(select, key, optgroup);
            }
        }
    }

    addOption(key, choiceKey, option, optgroup) {
        if (option && optgroup) {
            option.setAttribute('value', globalState[key][choiceKey]);
            option.innerHTML = globalState[key][choiceKey];
        } else if(optgroup) {
            optgroup.innerHTML += `<option dynamic-guide-option="${choiceKey}" value="${globalState[key][choiceKey]}">${globalState[key][choiceKey]}</option>`;
        }
    }

    addOptgroup(select, key, optgroup) {
        if (optgroup) {
            optgroup.setAttribute('label', globalState[key]['heading']);
        } else {
            select.innerHTML += `<optgroup dynamic-guide-optgroup="${key}" label="${globalState[key]['heading']}"></optgroup>`
        }
    }
}

export default SetupOutcomes;