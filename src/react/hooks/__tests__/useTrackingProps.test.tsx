import { render } from '@testing-library/react';
import useTrackingProps from '../useTrackingProps';

import React from 'react';

describe('useTrackingProps()', () => {
    describe('When applied on a JSX element', () => {
        describe('..with context supplied', () => {
            it('should render the tracking props on it correctly', () => {
                const trackingProps = useTrackingProps('preorder', 'submit', {
                    subscribeToNewsletter: true,
                });

                const { asFragment } = render(<button {...trackingProps} />);

                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe('..without context supplied', () => {
            it('should render the tracking props on it correctly', () => {
                const trackingProps = useTrackingProps('preorder', 'submit');

                const { asFragment } = render(<button {...trackingProps} />);

                expect(asFragment()).toMatchSnapshot();
            });
        });
    });
});
