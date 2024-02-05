class StartGuide {
    constructor(dynamicGuide) {
        this.dynamicGuide = dynamicGuide;
        this.index = 0;
        this.choices = {}; 
        this.guideSteps = [...dynamicGuide.querySelectorAll('[data-js-dynamic-guide-step]')];
        this.guideStartButton = dynamicGuide.querySelector('[dynamic-guide-start]');
        this.backButton = dynamicGuide.querySelector('[data-js-dynamic-guide-back-button]');
        this.resultContainer = dynamicGuide.querySelector('[data-dynamic-guide-result]');
        this.restartButton = dynamicGuide.querySelector('[data-js-dynamic-guide-endpage-back-button]');
        this.guideStepsEnd = dynamicGuide.querySelector('[data-js-dynamic-guide-endpage]');
        this.choiceButtons = [...dynamicGuide.querySelectorAll('[data-js-dynamic-guide-choice]')];
        this.init();
    }

    init(){
        if(!this.guideStartButton || !this.guideSteps.length) return;
        this.setupListeners();       
    }

    setupListeners(){
        this.guideStartButton.addEventListener('click', () => {
            this.index = 1;
            this.updateGuideStep();
        });

        this.backButton.addEventListener('click', () => {
            if (this.index > 0) {
                this.index -= 1;
                this.updateGuideStep();
            }
        });

        this.choiceButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const choiceValue = button.getAttribute('data-js-dynamic-guide-choice');
                this.choices[this.index] = choiceValue; 

                if (this.index < this.guideSteps.length - 1) {
                    this.index += 1;
                    this.updateGuideStep();
                } else { 
                   this.endGuide();
                }
            });
        });
    }

    updateGuideStep(){
        this.guideSteps.forEach((step) => {
            step.classList.add('u-display--none');
        });

        this.guideSteps[this.index].classList.remove('u-display--none');
        this.backButton.classList.toggle('u-display--none', this.index === 0);
    }

    endGuide(){
        this.guideStepsEnd.classList.remove('u-display--none');

        Object.values(this.choices).forEach(value => {
            this.resultContainer.innerHTML += `
                <p class="c-typography c-typography__variant--p">
                    ${value}
                </p>
            `;
        });

        this.guideSteps[this.index].classList.add('u-display--none');
        this.backButton.classList.add('u-display--none');

        this.restartButton.classList.remove('u-display--none');
        this.restartGuide();

        const getResultsButton = this.dynamicGuide.querySelector('[data-js-dynamic-guide-get-results-button]');

        getResultsButton.addEventListener('click', () => {
            this.showResult();
        });
    }

    showResult() {
        const urlParams = new URLSearchParams();
        const questionElements = this.dynamicGuide.querySelectorAll('[data-js-dynamic-guide-question]');

        questionElements.forEach((questionElement, index) => {
            const question = questionElement.textContent.trim();
            const answer = this.choices[index + 1];
    
            if (question && answer) urlParams.set(question, answer);
        });
    
        const currentUrl = new URL(window.location.href);
        currentUrl.search = urlParams.toString();
        window.location.href = currentUrl.toString();
    }
    
    restartGuide(){
        this.restartButton.addEventListener('click',() => {
            this.guideStepsEnd.classList.add('u-display--none');
            this.restartButton.classList.add('u-display--none');
            this.guideSteps[0].classList.remove('u-display--none');
            this.choices = {};
            this.resultContainer.innerHTML = '';
        });
    }
}

export default StartGuide;