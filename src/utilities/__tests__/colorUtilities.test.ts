import { isValidHexColor, convertHexToRGB } from './../colorUtilities';
describe('colorUtilities', () => {
    describe('isValidHexColor', () => {
        describe('when a valid hex color value is supplied', () => {
            it('should return true', () => {
                expect(isValidHexColor('#ff9900')).toBe(true);
                expect(isValidHexColor('#DDDDDD')).toBe(true);
                expect(isValidHexColor('#f90')).toBe(true);
                expect(isValidHexColor('#DDD')).toBe(true);
            });
        });

        describe('when an invalid rgb color value is supplied', () => {
            it('should return false', () => {
                expect(isValidHexColor('invalid')).toBe(false);
                expect(isValidHexColor('ff9900')).toBe(false);
                expect(isValidHexColor('###')).toBe(false);
            });
        });
    });

    describe('convertHexToRGB', () => {
        describe('when supplied with an invalid value', () => {
            it('should throw an Error', () => {
                expect(() => {
                    convertHexToRGB('invalid');
                }).toThrow();
            });
        });

        describe('when supplied with a valid hex', () => {
            describe('with four characthers', () => {
                it('should return the correct RBG value', () => {
                    expect(convertHexToRGB('#f90')).toBe('rgb(255, 153, 0)');
                    expect(convertHexToRGB('#f90', 0.9)).toBe(
                        'rgba(255, 153, 0, 0.9)'
                    );
                });
            });

            describe('with seven characthers', () => {
                it('should return the correct RGB value', () => {
                    expect(convertHexToRGB('#ff9900')).toBe('rgb(255, 153, 0)');
                    expect(convertHexToRGB('#ff9900', 0.9)).toBe(
                        'rgba(255, 153, 0, 0.9)'
                    );
                });
            });
        });

        describe('when supplied with a three character hex and a 6 character hex of the same color', () => {
            it('should return the exact same result', () => {
                const longValueWithoutAlpha = convertHexToRGB('#ff9900');
                const shortValueWithoutAlpha = convertHexToRGB('#f90');

                expect(longValueWithoutAlpha).toEqual(shortValueWithoutAlpha);
            });
        });
    });
});
