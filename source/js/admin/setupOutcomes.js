import globalState from './globalState';

class SetupOutcomes {
    constructor(group) {
        this.group = group;
        this.selects = this.getSelects();
        this.hiddenField = acf.getField('field_65ba49cbdb950');
        this.hiddenFieldValue = this.hiddenField.val() ? JSON.parse(this.hiddenField.val()) : false;

        if (!this.hiddenField) return;

        if (this.selects) {
            this.setupAlreadyCreatedSelects();
        }
    }

    getSelects() {
        const outcomeFields = acf.getFields({
            key: 'field_65b8ee0ac6cd8'
        });
        
        const selects = outcomeFields.map(outcomeField => {
            const select = outcomeField.$el.find('select') 
            return select && select[0] ? select[0] : false;
        });

        return selects ? selects : [];
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