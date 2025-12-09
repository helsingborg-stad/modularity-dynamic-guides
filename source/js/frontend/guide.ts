class Guide {
	index: number;
	choices: { [key: string]: string };
	restartButton: HTMLButtonElement;
	answersContainer: HTMLElement;
	steps: HTMLDivElement[];
	backButton: HTMLButtonElement;
	resetButton: HTMLButtonElement;

	constructor(dynamicGuide: HTMLDivElement) {
		this.index = 0;
		this.choices = {};
		this.restartButton = dynamicGuide.querySelector('[data-js-dynamic-guide-restart-button]') as HTMLButtonElement;
		this.answersContainer = dynamicGuide.querySelector('[data-js-dynamic-guide-answers]') as HTMLElement;
		this.steps = [...dynamicGuide.querySelectorAll('[data-js-dynamic-guide-step]')] as HTMLDivElement[];
		this.backButton = dynamicGuide.querySelector('[data-js-dynamic-guide-back-button]') as HTMLButtonElement;
		this.resetButton = dynamicGuide.querySelector('[data-js-dynamic-guide-endpage-back-button]') as HTMLButtonElement;
		this.setListeners();
	}

	/**
	 * Sets up event listeners for buttons and handles user interactions.
	 */
	private setListeners() {
		this.steps &&
			this.steps.forEach((step, index) => {
				const buttons = [...step.querySelectorAll('[data-js-dynamic-guide-button]')] as HTMLButtonElement[];
				buttons.forEach((button) => {
					button.addEventListener('click', () => {
						this.index++;
						this.saveChoiceValue(step, button);
						this.updateGuideStep(index);
					});
				});
			});

		this.backButton &&
			this.backButton.addEventListener('click', () => {
				const index = this.index;
				this.index--;
				this.updateGuideStep(index);
			});

		this.restartButton &&
			this.restartButton.addEventListener('click', () => {
				const index = this.steps.length - 1;
				this.index = 0;
				this.updateGuideStep(index);
			});

		this.resetButton &&
			this.resetButton.addEventListener('click', () => {
				this.resetGuide();
			});
	}

	/**
	 * Resets the guide by removing the 'outcome' parameter from the URL.
	 */
	private resetGuide() {
		const url = new URL(window.location.href);
		url.searchParams.delete('outcome');
		window.location.href = url.toString();
	}

	/**
	 * Saves the user's choice for the current step and updates the choices object.
	 * @param {HTMLDivElement} step - The HTML element representing the current step.
	 * @param {HTMLButtonElement} button - The HTML button representing the chosen option.
	 */
	private saveChoiceValue(step: HTMLDivElement, button: HTMLButtonElement) {
		const stepAttribute = step.getAttribute('data-js-dynamic-guide-step');
		const buttonAttribute = button.getAttribute('data-js-dynamic-guide-button');

		if (stepAttribute && buttonAttribute) {
			this.choices[stepAttribute] = buttonAttribute;

			if (Object.keys(this.choices).length === this.steps.length - 2) {
				this.createAnswersList();
			}
		}
	}

	/**
	 * Creates a list of answers and questions in the answers container.
	 */
	private createAnswersList() {
		let li = '';
		for (const [answer, question] of Object.entries(this.choices)) {
			li += this.createListItem(answer, question);
		}

		this.answersContainer.innerHTML = li;
	}

	/**
	 * Creates an HTML list item with the specified answer and question.
	 * @param {string} answer - The chosen answer.
	 * @param {string} question - The associated question.
	 * @returns {string} - The HTML list item.
	 */
	private createListItem(answer: string, question: string): string {
		return `<li><b>${answer}:</b> ${question}</li>`;
	}

	/**
	 * Updates the display of guide steps based on the current index.
	 * @param {number} index - The current index.
	 */
	private updateGuideStep(index: number) {
		if (this.index >= 1 && !(this.index + 1 >= this.steps.length)) {
			this.backButton.classList.remove('u-display--none');
		} else {
			this.backButton.classList.add('u-display--none');
		}

		if (this.steps[this.index]) {
			this.steps[index].classList.add('u-display--none');
			this.steps[this.index].classList.remove('u-display--none');
		} else {
			this.getResults();
		}
	}

	/**
	 * Redirects to the results page with the chosen outcomes in the URL.
	 */
	private getResults() {
		const url = new URL(window.location.href);
		url.searchParams.set('outcome', JSON.stringify(this.choices));
		window.location.href = url.toString();
	}
}

export default Guide;
