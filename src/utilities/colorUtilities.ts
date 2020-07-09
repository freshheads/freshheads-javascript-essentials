const RGBColorPattern = /^\#([a-f0-9]{6}|[a-f0-9]{3})$/i;

export const isValidHexColor = (value: string) => RGBColorPattern.test(value);

export function convertHexToRGB(hexColor: string, alpha?: number): string {
    if (!isValidHexColor(hexColor)) {
        throw new Error('Invalid HEX color supplied');
    }

    const normalizedHexColor =
        hexColor.length === 4
            ? `${hexColor[0]}${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`
            : hexColor;

    const r = parseInt(normalizedHexColor.slice(1, 3), 16);
    const g = parseInt(normalizedHexColor.slice(3, 5), 16);
    const b = parseInt(normalizedHexColor.slice(5, 7), 16);

    return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
}
