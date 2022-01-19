import {
    clamp
} from '../numberUtilities';

describe('numberUtilities', () => { 
    describe('clamp', () => { 
        describe('With value between min and max', () => { 
            it('should return the value', () => {
                const value = 20.5;
                const min = -12.7;
                const max = 25;
                const output = clamp(value, min, max);

                expect(output).toBe(value);
            });
        });
        describe('With value lower than min', () => { 
            it('should return the min', () => {
                const value = 7.25;
                const min = 8;
                const max = 25;
                const output = clamp(value, min, max);

                expect(output).toBe(min);
            });
        });
        describe('With value higher than max', () => { 
            it('should return the max', () => {
                const value = -5;
                const min = -18;
                const max = -7.75;
                const output = clamp(value, min, max);

                expect(output).toBe(max);
            });
        });
    
    });
});