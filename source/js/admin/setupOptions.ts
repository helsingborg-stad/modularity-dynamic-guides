import Options from "./options";
import globalState from "./globalState";
import type { AcfField, GlobalState } from "dynamic-guides-interface";

class SetupOptions {
	group: HTMLElement;
	optionsInstance: Object;
	constructor(group: HTMLElement) {
		this.group = group;
		this.optionsInstance = {};

		this.setupOptions();
	}

	/**
	 * Sets up options based on the defined steps and their associated fields.
	 */
	private setupOptions() {
		const steps = acf.getField("field_65b78add784cd");

		if (!steps) return;

		const headingsFields = this.getHeadingsFields(steps);

		headingsFields.forEach((heading) => {
			const choicesRepeater = this.getChoicesRepeaters(heading);

			if (choicesRepeater && choicesRepeater[0] && choicesRepeater[0].$el) {
				const key = globalState.generateUniqueKey();
				choicesRepeater[0].$el.attr("dynamic-guide-options-instance", key);
				const choices = this.getChoicesFields(choicesRepeater[0]);

				if (choices) {
					this.setupAndSaveNewOptionsInstance(key);
					(globalState as GlobalState)[key]["instance"].setupListeners(
						heading,
						choices,
					);
				}
			}
		});
	}

	/**
	 * Sets up and saves a new options instance.
	 * @param {string} key - The unique key for the options instance.
	 */
	private setupAndSaveNewOptionsInstance(key: string) {
		if (!(globalState as GlobalState)[key]) {
			(globalState as GlobalState)[key] = {};
		}

		const optionsInstance = new Options(key, this.group);
		if (!(globalState as GlobalState)[key]["instance"]) {
			(globalState as GlobalState)[key]["instance"] = optionsInstance;
		}
	}

	/**
	 * Retrieves the choices fields for a given choices repeater.
	 * @param {AcfField} choiceRepeater - The choices repeater field.
	 * @returns {AcfField[]} - An array of choices fields.
	 */
	private getChoicesFields(choiceRepeater: AcfField): AcfField[] {
		return acf.getFields({
			key: "field_65b78b92784cf",
			parent: choiceRepeater.$el,
		});
	}

	/**
	 * Retrieves the choices repeaters for a given heading.
	 * @param {AcfField} heading - The heading field.
	 * @returns {AcfField[]} - An array of choices repeaters.
	 */
	private getChoicesRepeaters(heading: AcfField): AcfField[] {
		return acf.getFields({
			key: "field_65b78b84784ce",
			sibling: heading.$el,
			limit: 1,
		});
	}

	/**
	 * Retrieves the heading fields for a given set of steps.
	 * @param {AcfField} steps - The steps field.
	 * @returns {AcfField[]} - An array of heading fields.
	 */
	private getHeadingsFields(steps: AcfField): AcfField[] {
		return acf.getFields({
			key: "field_65b7993d1aba6",
			parent: steps.$el,
		});
	}
}

export default SetupOptions;
