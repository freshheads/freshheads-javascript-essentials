import { pushTrackingEvent } from '../dataLayer';

describe('dataLayer', () => {
    describe('pushTrackingEvent', () => {
        describe('When no dataLayer exists', () => {
            it('should create a new data layer and add the event to it', () => {
                // @ts-ignore => typescript does not know about dataLayer on window
                delete window.dataLayer;

                pushTrackingEvent('preorder', 'submit', {
                    subscribeToNewsletter: true,
                });

                // @ts-ignore => typescript does not know about dataLayer on window
                expect(window.dataLayer).toBeDefined();

                // @ts-ignore => typescript does not know about dataLayer on window
                expect(Array.isArray(window.dataLayer)).toBe(true);

                // @ts-ignore => typescript does not know about dataLayer on window
                expect(window.dataLayer).toHaveLength(1);

                // @ts-ignore => typescript does not know about dataLayer on window
                const firstItem = window.dataLayer[0];

                expect(firstItem).toEqual({
                    _clear: false,
                    event: 'preorder',
                    action: 'submit',
                    context: {
                        subscribeToNewsletter: true,
                    },
                });
            });
        });

        describe('When a dataLayer already exists', () => {
            it('should add the event to the existing events in the dataLayer', () => {
                // @ts-ignore => typescript does not know about dataLayer on window
                window.dataLayer = [
                    {
                        event: 'other_event',
                        action: 'click',
                    },
                ];

                pushTrackingEvent('preorder', 'submit');

                // @ts-ignore => Typescript does not know about dataLayer property
                expect(window.dataLayer).toBeDefined();

                // @ts-ignore => typescript does not know about dataLayer on window
                expect(Array.isArray(window.dataLayer)).toBe(true);

                // @ts-ignore => typescript does not know about dataLayer on window
                expect(window.dataLayer).toHaveLength(2);

                // @ts-ignore => typescript does not know about dataLayer on window
                const addedItem = window.dataLayer[1];

                expect(addedItem).toEqual({
                    event: 'preorder',
                    action: 'submit',
                    _clear: false,
                });
            });
        });
    });
});
