import Actions from './admin/actions';
import SetupOptions from './admin/setupOptions';
import SetupOutcomes from './admin/setupOutcomes';

document.addEventListener('DOMContentLoaded', () => {
	const group = document.querySelector('#acf-group_65b3a530b28a9');

	if (typeof acf !== 'undefined' && group) {
		const outcomesInstance = new SetupOutcomes(group);
		const optionsInstances = new SetupOptions(group);
		new Actions(group, outcomesInstance, optionsInstances);
	}
});
