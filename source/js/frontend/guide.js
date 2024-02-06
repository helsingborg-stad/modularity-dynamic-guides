class Guide {
    constructor(dynamicGuide) {
        this.index = 0;
        this.choices = {}; 
        this.restartButton = dynamicGuide.querySelector('[data-js-dynamic-guide-restart-button]')
        this.resultContainer = dynamicGuide.querySelector('[data-js-dynamic-guide-result]');
        this.steps = [...dynamicGuide.querySelectorAll('[data-js-dynamic-guide-step]')];
        this.backButton = dynamicGuide.querySelector('[data-js-dynamic-guide-back-button]');

        this.steps && this.backButton && this.setListeners();
    }

    setListeners() {
        this.steps.forEach((step, index) => {
            [...step.querySelectorAll('[data-js-dynamic-guide-button]')].forEach(button => {
                button.addEventListener('click', () => {
                    this.index++;
                    this.saveChoiceValue(step, button);
                    this.updateGuideStep(index);
                })
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

    saveChoiceValue(step, button) {
        if (step.getAttribute('data-js-dynamic-guide-step') && button.getAttribute('data-js-dynamic-guide-button')) {
            this.choices[step.getAttribute('data-js-dynamic-guide-step')] = button.getAttribute('data-js-dynamic-guide-button');
            
            if (Object.keys(this.choices).length === (this.steps.length - 2)) {
                console.log(this.choices);
            }
        }
    }

    updateGuideStep(index) {
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
        if (this.choices) {

        const url = new URL(window.location);
        let params = new URLSearchParams(url.search);
 
        params.set('outcome', JSON.stringify(this.choices));
        url.search = params.toString();
 
        window.location.href = url.toString();
    }
}
    
}

export default Guide;