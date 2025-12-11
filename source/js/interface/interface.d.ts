declare module 'dynamic-guides-interface' {
	interface CustomEventWithDetail extends CustomEvent {
		detail: EventDetailObject;
	}

	interface EventDetailObject {
		key: string;
		type: string;
		choiceKey: string | false;
	}

	interface GlobalState {
		generateUniqueKey(): string;
		[key: string]: any;
	}

	interface AcfField {
		$el: JQuery<HTMLElement>;
		val(value?: string): string;
	}

	interface HiddenFieldValue {
		[key: number]: {
			[key: string]: string;
		};
	}
}
