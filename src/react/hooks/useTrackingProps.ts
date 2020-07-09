import { Serializable } from '../../types/utility';

export type TrackingProps = {
    'data-tracking-event-name': string;
    'data-tracking-event-action': string;
    'data-tracking-event-context'?: Serializable;
};

/**
 * Applies uniform setup for tracking events, using attributes on DOM elements.
 * In Google Tag Manager these can be registered and used to, in turn, push
 * events to Google Analytics or other (tracking) platforms.
 *
 * @param {string} eventName        i.e. "preorder"
 * @param {string} eventAction      i.e. "submit"
 * @param {Serializable=} context   i.e. "{ subscribeToNewsletter: false }"
 */
export default function useTrackingProps(
    eventName: string,
    eventAction: string,
    context?: Serializable
): TrackingProps {
    let props: TrackingProps = {
        'data-tracking-event-name': eventName,
        'data-tracking-event-action': eventAction,
    };

    if (context) {
        props['data-tracking-event-context'] = JSON.stringify(context);
    }

    return props;
}
