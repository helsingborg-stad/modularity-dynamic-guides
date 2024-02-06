// interface.d.ts
declare module 'dynamic-guides-interface' {
    interface CustomEventWithDetail extends CustomEvent {
        detail: eventDetailObject;
    }

    interface EventDetailObject {
        key: string;
        type: string;
        choiceKey: string|false;
    }

    interface GlobalState {
        generateUniqueKey(): string;
        [key: string]: any;
    }

    interface AcfField {
        $el: JQuery<HTMLElement>;
    }

    interface HiddenFieldValue {
        [key: number]: any;
    }
}