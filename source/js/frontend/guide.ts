class Guide {
    index: number;
    choices: {[key: string]: string};
    restartButton: HTMLButtonElement;
    resultContainer: HTMLDivElement;
    steps: HTMLDivElement[];
    backButton: HTMLButtonElement;

    constructor(dynamicGuide: HTMLDivElement) {
        this.index = 0;
        this.choices = {}; 
        this.restartButton = dynamicGuide.querySelector('[data-js-dynamic-guide-restart-button]') as HTMLButtonElement;
        this.resultContainer = dynamicGuide.querySelector('[data-js-dynamic-guide-result]') as HTMLDivElement;
        this.steps = [...(dynamicGuide.querySelectorAll('[data-js-dynamic-guide-step]'))] as HTMLDivElement[];
        this.backButton = dynamicGuide.querySelector('[data-js-dynamic-guide-back-button]') as HTMLButtonElement;

        this.steps && this.backButton && this.setListeners();
    }

    setListeners() {
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

        this.backButton.addEventListener('click', () => {
            const index = this.index;
            this.index--;
            this.updateGuideStep(index)
        });

        this.restartButton.addEventListener('click', () => {
            const index = this.index;
            this.index = 0;
            this.updateGuideStep(index);
        })
    }

    saveChoiceValue(step: HTMLDivElement, button: HTMLButtonElement){  
        const stepAttribute = step.getAttribute('data-js-dynamic-guide-step');
        const buttonAttribute = button.getAttribute('data-js-dynamic-guide-button');

        if (stepAttribute && buttonAttribute) {
            this.choices[stepAttribute] = buttonAttribute;

            if (Object.keys(this.choices).length === this.steps.length - 2) {
                console.log(this.choices);
            }
        }
    }

    updateGuideStep(index: number) {
        if (this.index >= 1 && !((this.index + 1) == this.steps.length)) {
            this.backButton.classList.remove('u-display--none');
        } else {
            this.backButton.classList.add('u-display--none');
        }

        if (this.steps[this.index]) {
            this.steps[index].classList.add('u-display--none');
            this.steps[this.index].classList.remove('u-display--none');
        } else {
            this.getResults()
        }
    }

    getResults() {
        const url = new URL(window.location.href);
        url.searchParams.set('outcome', JSON.stringify(this.choices));
        window.location.href = url.toString();
    }
}

export default Guide;