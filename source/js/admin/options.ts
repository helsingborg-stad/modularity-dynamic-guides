import globalState from './globalState';
import type { GlobalState, AcfField } from 'dynamic-guides-interface';

class Options {
	group: HTMLElement;
	key: string;
	choiceIndex: number;

	constructor(key: string, group: HTMLElement) {
		this.group = group;
		this.key = key;
		this.choiceIndex = 0;
	}

	/**
	 * Sets up listeners for the heading and choices fields.
	 * @param {AcfField} heading - The heading field.
	 * @param {AcfField[]} choices - An array of choices fields.
	 */
	public setupListeners(heading: AcfField, choices: Array<AcfField>) {
		const input = heading.$el.find('input');
		if (!input) return;

		let currentHeadingsValue = input.val();
		this.saveValueGlobally('heading', currentHeadingsValue ?? false);
		this.group.dispatchEvent(this.createCustomEvent('heading'));

		input.focus(() => {
			currentHeadingsValue = input.val();
		});

		input.change(() => {
			this.saveValueGlobally('heading', input.val() ?? false);
			this.group.dispatchEvent(this.createCustomEvent('heading'));
		});

		choices.forEach((choice) => {
			this.listenToChoice(choice);
		});
	}

	/**
	 * Listens to changes in the choice field and updates the global state.
	 * @param {AcfField} choice - The choice field.
	 */
	private listenToChoice(choice: AcfField) {
		const input = choice.$el.find('input');
		if (!input) return;

		let currentChoiceValue = input.val();
		const choiceIndex = this.choiceIndex;
		this.saveValueGlobally('choice-' + choiceIndex + '_' + this.key, currentChoiceValue ?? false);
		this.group.dispatchEvent(this.createCustomEvent('choice', 'choice-' + choiceIndex + '_' + this.key));

		input.focus((e) => {
			currentChoiceValue = input.val();
		});

		input.change((e) => {
			this.saveValueGlobally('choice-' + choiceIndex + '_' + this.key, input.val() ?? false);
			this.group.dispatchEvent(this.createCustomEvent('choice', 'choice-' + choiceIndex + '_' + this.key));
		});

		this.choiceIndex++;
	}

	/**
	 * Saves a value globally in the global state.
	 * @param {string} key - The key under which to store the value in global state.
	 * @param {string|false} value - The value to be stored.
	 */
	private saveValueGlobally(key: string, value: string | false) {
		(globalState as GlobalState)[this.key][key] = value;
	}

	/**
	 * Creates a custom event with specified details.
	 * @param {string} type - The type of the custom event.
	 * @param {string|false} choiceKey - The choice key associated with the event.
	 * @returns {CustomEvent} - The created custom event.
	 */
	private createCustomEvent(type: string, choiceKey: string | false = false): CustomEvent {
		const args = {
			detail: {
				key: this.key,
				type: type,
				choiceKey: choiceKey,
			},
		};

		return new CustomEvent('dynamicGuidesCustomEvent', args);
	}
}

export default Options;
