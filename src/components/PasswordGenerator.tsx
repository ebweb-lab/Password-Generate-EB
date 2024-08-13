import React, { useState } from 'react';
import {
    generatePasswordFromPhrase,
    generateRandomPassword,
    calculatePasswordStrength
} from '../utils/passwordUtils';

function PasswordGenerator() {
    const [password, setPassword] = useState<string>('');
    const [length, setLength] = useState<number>(12);
    const [specialChars, setSpecialChars] = useState<boolean>(true);
    const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);
    const [usePhrase, setUsePhrase] = useState<boolean>(false);
    const [phrase, setPhrase] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');

    const handleGeneratePassword = () => {
        const options = { length, useSpecialChars: specialChars, excludeAmbiguous };

        const generatedPassword = usePhrase && phrase.trim().length > 0
            ? generatePasswordFromPhrase(phrase, options)
            : generateRandomPassword(options);

        setPassword(generatedPassword);
        setDifficulty(calculatePasswordStrength(generatedPassword));
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-xl font-bold text-center">Password Generator</h1>
            <PasswordLengthSlider length={length} setLength={setLength} />
            <CheckboxOption
                label="Include Special Characters"
                checked={specialChars}
                onChange={setSpecialChars}
            />
            <CheckboxOption
                label="Exclude Ambiguous Characters (e.g., 0, O, 1, l)"
                checked={excludeAmbiguous}
                onChange={setExcludeAmbiguous}
            />
            <CheckboxOption
                label="Use Phrase/Word"
                checked={usePhrase}
                onChange={setUsePhrase}
            />
            {usePhrase && <PhraseInput phrase={phrase} setPhrase={setPhrase} />}
            <GenerateButton onClick={handleGeneratePassword} />
            {password && <PasswordDisplay password={password} difficulty={difficulty} />}
        </div>
    );
}

//Componente para el control deslizante
function PasswordLengthSlider({ length, setLength }: { length: number; setLength: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <div className="space-y-2">
            <label className="block">Length: {length}</label>
            <input
                type="range"
                min="8"
                max="20"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
}

function CheckboxOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="flex items-center space-x-3">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label>{label}</label>
        </div>
    );
}

//Entrada de frases o palabras
function PhraseInput({ phrase, setPhrase }: { phrase: string; setPhrase: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <div className="space-y-2">
            <input
                type="text"
                placeholder="Enter your phrase or word"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                className="w-full p-2 border rounded-md"
            />
        </div>
    );
}

function GenerateButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
        >
            Generate Password
        </button>
    );
}

function PasswordDisplay({ password, difficulty }: { password: string; difficulty: string }) {
    return (
        <div className="space-y-2">
            <p className="text-lg font-mono">{password}</p>
            <p>
                Strength: <span className={`font-bold ${getDifficultyColor(difficulty)}`}>{difficulty}</span>
            </p>
        </div>
    );
}

//Función auxiliar para determinar el color del indicador de seguridad
function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
        case 'Strong':
            return 'text-green-600';
        case 'Medium':
            return 'text-yellow-600';
        case 'Weak':
        default:
            return 'text-red-600';
    }
}

export default PasswordGenerator;
