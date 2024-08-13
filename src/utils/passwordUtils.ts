type PasswordOptions = {
    length: number;
    useSpecialChars: boolean;
    excludeAmbiguous: boolean;
};

const SPECIAL_CHARS = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";
const AMBIGUOUS_CHARS = "0O1lI";
const DEFAULT_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SUBSTITUTIONS: { [key: string]: string } = {
    'a': '@', 'A': '4',
    'e': '3', 'E': '3',
    'i': '1', 'I': '1',
    'o': '0', 'O': '0',
    's': '$', 'S': '$',
    'b': '8', 'B': '8',
    'g': '9', 'G': '9'
};


const filterAmbiguousChars = (chars: string): string => {
    return chars.split('').filter(char => !AMBIGUOUS_CHARS.includes(char)).join('');
};


const applySubstitutions = (phrase: string): string => {
    return phrase.split('').map(char => SUBSTITUTIONS[char] || char).join('');
};


const randomizeCase = (phrase: string): string => {
    return phrase.split('').map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join('');
};


export const generatePasswordFromPhrase = (
    phrase: string,
    { length, useSpecialChars, excludeAmbiguous }: PasswordOptions
): string => {
    let transformedPhrase = applySubstitutions(phrase);
    transformedPhrase = randomizeCase(transformedPhrase);

    if (useSpecialChars) {
        transformedPhrase = insertSpecialChar(transformedPhrase);
    }

    if (Math.random() > 0.5) {
        transformedPhrase = reverseString(transformedPhrase);
    }

    if (excludeAmbiguous) {
        transformedPhrase = filterAmbiguousChars(transformedPhrase);
    }

    return completePasswordLength(transformedPhrase, length, useSpecialChars, excludeAmbiguous);
};


export const generateRandomPassword = (
    { length, useSpecialChars, excludeAmbiguous }: PasswordOptions
): string => {
    const chars = useSpecialChars ? DEFAULT_CHARS + SPECIAL_CHARS : DEFAULT_CHARS;
    const filteredChars = excludeAmbiguous ? filterAmbiguousChars(chars) : chars;

    return Array.from({ length }, () => filteredChars.charAt(Math.floor(Math.random() * filteredChars.length))).join('');
};


const insertSpecialChar = (str: string): string => {
    const position = Math.floor(Math.random() * str.length);
    const specialChar = SPECIAL_CHARS.charAt(Math.floor(Math.random() * SPECIAL_CHARS.length));
    return str.slice(0, position) + specialChar + str.slice(position);
};


const reverseString = (str: string): string => {
    return str.split('').reverse().join('');
};


const completePasswordLength = (
    str: string,
    length: number,
    useSpecialChars: boolean,
    excludeAmbiguous: boolean
): string => {
    const chars = useSpecialChars ? DEFAULT_CHARS + SPECIAL_CHARS : DEFAULT_CHARS;
    const filteredChars = excludeAmbiguous ? filterAmbiguousChars(chars) : chars;

    while (str.length < length) {
        const randomChar = filteredChars.charAt(Math.floor(Math.random() * filteredChars.length));
        const position = Math.floor(Math.random() * (str.length + 1));
        str = str.slice(0, position) + randomChar + str.slice(position);
    }

    return str.slice(0, length);
};


export const calculatePasswordStrength = (password: string): string => {
    let strength = 0;
    if (password.length > 8) strength++;
    if (password.length > 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    switch (strength) {
        case 1:
        case 2:
            return 'Weak';
        case 3:
        case 4:
            return 'Medium';
        case 5:
            return 'Strong';
        default:
            return 'Weak';
    }
};
