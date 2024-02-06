import globalState from './globalState';
import {CustomEventWithDetail, EventDetailObject, GlobalState} from 'dynamic-guides-interface';

class SetupOutcomes {
    group: HTMLElement;
    selects: Array<any>;
    hiddenField: JQuery<HTMLElement>
    hiddenFieldValue: Object|false;

    constructor(group: HTMLElement) {
        this.group          = group;
        this.selects        = this.getSelects();
        this.hiddenField    = acf.getField('field_65ba49cbdb950');

        if (this.hiddenField && this.hiddenField.val() !== undefined) {
            const val: string       = this.hiddenField.val() as string;
            this.hiddenFieldValue   = JSON.parse(val);
        } else {
            this.hiddenFieldValue   = false;
        }

        if (this.selects && this.hiddenFieldValue) {
            this.setupAlreadyCreatedSelects();
        }
    }

    public getSelects(): Array<HTMLSelectElement> {
        const outcomeFields = acf.getFields({
            key: 'field_65b8ee0ac6cd8'
        });
        
        const selects = outcomeFields.map((outcomeField) => {
            const select = outcomeField.$el.find('select');
            return select && select[0] ? select[0] : false;
        });

        return selects ? selects : [];
    }
    
    private setupAlreadyCreatedSelects() {
        this.group.addEventListener('dynamicGuidesCustomEvent', (e: Event) => {
            const dynamicGuidesCustomEvent = e as CustomEventWithDetail;
            this.selects.forEach((select, index) => {
                this.createOptions(select, dynamicGuidesCustomEvent.detail);
                if (Array.isArray(this.hiddenFieldValue) && this.hiddenFieldValue[index]) {
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

    public createOptions(select: HTMLElement, detail: EventDetailObject) {
        const {key, type, choiceKey} = detail;

        if ((globalState as GlobalState)[key]['heading']) {
            const optgroup = select.querySelector(`optgroup[dynamic-guide-optgroup="${key}"]`);
            const option = optgroup?.querySelector(`option[dynamic-guide-option="${choiceKey}"]`)
            
            if (type === 'choice' && option && optgroup && choiceKey) {
                this.addOption(key, choiceKey, option, optgroup);
            } else if (optgroup) {
                this.addOptgroup(select, key, optgroup);
            }
        }
    }

    private addOption(key: string, choiceKey: string, option: Element|undefined, optgroup: Element|undefined) {
        if (option && optgroup) {
            option.setAttribute('value', (globalState as GlobalState)[key][choiceKey]);
            option.innerHTML = (globalState as GlobalState)[key][choiceKey];
        } else if(optgroup) {
            optgroup.innerHTML += `<option dynamic-guide-option="${choiceKey}" value="${(globalState as GlobalState)[key][choiceKey]}">${(globalState as GlobalState)[key][choiceKey]}</option>`;
        }
    }

    private addOptgroup(select: HTMLElement, key: string, optgroup: Element) {
        if (optgroup) {
            optgroup.setAttribute('label', (globalState as GlobalState)[key]['heading']);
        } else {
            select.innerHTML += `<optgroup dynamic-guide-optgroup="${key}" label="${(globalState as GlobalState)[key]['heading']}"></optgroup>`
        }
    }
}

export default SetupOutcomes;