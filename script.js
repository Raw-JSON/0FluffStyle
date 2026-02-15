// 0FluffStyle Logic

// --- CORE FUNCTIONS ---

// Architectural Enhancement: Input Sanitization
// Strips Zero Width Joiners (ZWJ) and other invisible control characters
// to ensure predictable mapping and clean outputs.
function sanitizeInput(text) {
    // Regex matches ZWJ (\u200D), BOM (\uFEFF), and other invisible separators
    return text.replace(/[\u200B-\u200D\uFEFF]/g, '');
}

function convertText(text, map) {
    // Check if we are using the squared map.
    // If so, force uppercase on the input text to match the uppercase-only Unicode block.
    const inputText = (map === charMaps.squared) ? text.toUpperCase() : text;
    
    return inputText.split('').map(char => map[char] || char).join('');
}

// --- NEW COMBINING LOGIC (For Glitch, Strikethrough, etc.) ---
function combineText(text, combiningChar) {
    return text.split('').map(c => c + combiningChar).join('');
}

function zalgoText(text) {
    // A simplified Zalgo generator (glitch effect)
    // Adds random combining diacritics above, middle, and below.
    const chars = text.split('');
    const zalgoUp = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
    const zalgoDown = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];
    
    return chars.map(char => {
        if (char === ' ') return char;
        let newChar = char;
        // Add 1-2 random marks up
        for(let i=0; i < Math.floor(Math.random() * 2) + 1; i++) {
            newChar += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
        }
        // Add 1 random mark down
        if (Math.random() > 0.3) {
             newChar += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
        }
        return newChar;
    }).join('');
}


const styleMapsForMixed = [
    charMaps.bold, charMaps.serifItalic, charMaps.script, charMaps.fraktur,
    charMaps.doubleStruck, charMaps.monospace, charMaps.serifBold, charMaps.circled,
    charMaps.smallCaps, charMaps.runic
];

function convertMixed(text) {
    return text.split('').map((char, i) => {
        const map = styleMapsForMixed[i % styleMapsForMixed.length];
        return map[char] || char;
    }).join('');
}

// --- FONT REGISTRY ---
// Updated to include new v1.4 styles
const fonts = [
    { name: 'Mixed', converter: convertMixed },
    { name: 'Normal', converter: (text) => text },
    
    // Standard
    { name: 'Bold', converter: (text) => convertText(text, charMaps.bold) },
    { name: 'Italic', converter: (text) => convertText(text, charMaps.serifItalic) },
    { name: 'Bold Italic', converter: (text) => convertText(text, charMaps.serifBoldItalic) },
    { name: 'Serif Bold', converter: (text) => convertText(text, charMaps.serifBold) },
    { name: 'Script', converter: (text) => convertText(text, charMaps.script) },
    { name: 'Fraktur', converter: (text) => convertText(text, charMaps.fraktur) },
    { name: 'Monospace', converter: (text) => convertText(text, charMaps.monospace) },
    { name: 'Double-Struck', converter: (text) => convertText(text, charMaps.doubleStruck) },
    
    // Decorative
    { name: 'Bubble', converter: (text) => convertText(text, charMaps.bubble) },
    { name: 'Circled', converter: (text) => convertText(text, charMaps.circled) },
    { name: 'Squared', converter: (text) => convertText(text, charMaps.squared) },
    { name: 'Small Caps', converter: (text) => convertText(text, charMaps.smallCaps) },
    { name: 'Tiny (Superscript)', converter: (text) => convertText(text, charMaps.tiny) },
    { name: 'Subscript', converter: (text) => convertText(text, charMaps.subscript) },
    { name: 'Fullwidth', converter: (text) => convertText(text, charMaps.fullwidth) },
    
    // Ancient / Cryptic
    { name: 'Runic', converter: (text) => convertText(text, charMaps.runic) },
    { name: 'Ogham', converter: (text) => convertText(text, charMaps.ogham) },
    { name: 'Gothic (Ancient)', converter: (text) => convertText(text, charMaps.gothicAncient) },
    { name: 'Coptic', converter: (text) => convertText(text, charMaps.coptic) },
    { name: 'Shavian', converter: (text) => convertText(text, charMaps.shavian) },
    { name: 'Braille', converter: (text) => convertText(text, charMaps.braille) },
    { name: 'Star/Symbol', converter: (text) => convertText(text, charMaps.dingbatCryptic) },

    // Glitch / Effects
    { name: 'Strikethrough', converter: (text) => combineText(text, '\u0336') },
    { name: 'Underline', converter: (text) => combineText(text, '\u0332') },
    { name: 'Slash', converter: (text) => combineText(text, '\u0338') },
    { name: 'Zalgo (Glitch)', converter: zalgoText },
];

// --- UI LOGIC ---

// GitHub SVG for the new button
const githubSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3c0 0-1.03-.39-3.41 1.05A16.3 16.3 0 0 0 12 2.88 16.3 16.3 0 0 0 7.4 4.04c-2.38-1.44-3.41-1.05-3.41-1.05A5.07 5.07 0 0 0 3.91 4.77 5.44 5.44 0 0 0 4 9.47c0 5.42 3.3 6.61 6.44 7.37-.4.34-.78 1-1.15 2.06v4.31"></path>
    </svg>
`;
// Share SVG
const shareSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.479-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632L15.316 8.684m0 0a3 3 0 100-5.368 3 3 0 000 5.368zm0 5.368a3 3 0 100 5.368 3 3 0 000-5.368z" />
    </svg>
`;

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const clearBtn = document.getElementById('clearBtn');
    
    // Set stylized title
    const titleEl = document.getElementById('appTitle');
    titleEl.innerText = convertText("0FluffStyle.", charMaps.serifBold); 
    
    // Set GitHub Button
    const githubBtn = document.getElementById('githubButton');
    if (githubBtn) {
        githubBtn.innerHTML = `${githubSVG} View on GitHub`;
        githubBtn.onclick = () => window.open('https://github.com/jayancobk/Stylish-Words', '_blank');
    }
    
    // Initial Render
    updateFontDisplay();
    updateCharCounter();
    
    // Listeners
    textInput.addEventListener('input', () => {
        updateFontDisplay();
        toggleClearButton();
        updateCharCounter();
    });

    // Clear Button Logic
    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        textInput.focus();
        updateFontDisplay();
        toggleClearButton();
        updateCharCounter();
    });
});

function toggleClearButton() {
    const textInput = document.getElementById('textInput');
    const clearBtn = document.getElementById('clearBtn');
    if (textInput.value.length > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }
}

function updateCharCounter() {
    const textInput = document.getElementById('textInput');
    const counterEl = document.getElementById('charCounter');
    const currentLength = textInput.value.length;
    const limit = 280;

    counterEl.innerText = `${currentLength} / ${limit}`;

    // Visual feedback for limits
    if (currentLength >= limit) {
        counterEl.classList.remove('text-gray-400', 'text-yellow-500');
        counterEl.classList.add('text-red-500');
    } else if (currentLength >= limit * 0.9) {
        counterEl.classList.remove('text-gray-400', 'text-red-500');
        counterEl.classList.add('text-yellow-500');
    } else {
        counterEl.classList.remove('text-red-500', 'text-yellow-500');
        counterEl.classList.add('text-gray-400');
    }
}

function updateFontDisplay() {
    const textInput = document.getElementById('textInput');
    const fontGrid = document.getElementById('fontGrid');
    
    // Architectural Enhancement: Apply sanitization before processing
    let rawText = textInput.value;
    const sanitizedText = sanitizeInput(rawText);
    
    const text = sanitizedText === '' ? 'Sample Text' : sanitizedText;
    
    fontGrid.innerHTML = '';

    fonts.forEach(font => {
        const convertedText = font.converter(text);

        const card = document.createElement('div');
        card.className = 'relative bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 transition-transform duration-300 hover:scale-105';
        
        const textPreview = document.createElement('p');
        textPreview.className = 'font-preview-text';
        textPreview.innerText = convertedText;
        
        const fontName = document.createElement('span');
        fontName.className = 'block text-sm text-gray-400 mt-4';
        fontName.innerText = font.name;
        
        // COPY BUTTON
        const copyButton = document.createElement('button');
        copyButton.className = 'absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400';
        copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        `;
        copyButton.onclick = (e) => {
            e.stopPropagation(); 
            copyToClipboard(convertedText);
        };
        
        // SHARE BUTTON
        const shareButton = document.createElement('button');
        shareButton.className = 'absolute top-16 right-4 bg-gray-700 text-gray-300 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500';
        shareButton.innerHTML = shareSVG;
        shareButton.title = 'Share Text';
        shareButton.onclick = (e) => {
            e.stopPropagation();
            shareText(convertedText);
        };
        
        card.onclick = () => copyToClipboard(convertedText);

        card.appendChild(textPreview);
        card.appendChild(fontName);
        card.appendChild(copyButton);
        card.appendChild(shareButton);
        fontGrid.appendChild(card);
    });
}
// --- CLIPBOARD & SHARE ---
let toastTimer;
function showToast() {
    const toast = document.getElementById('toast');
    if (toastTimer) clearTimeout(toastTimer);
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(1rem)';
    }, 3000);
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(showToast);
    } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast();
        } catch (err) { console.error('Copy failed', err); }
        document.body.removeChild(textarea);
    }
}

function shareText(text) {
    if (navigator.share) {
        navigator.share({
            title: 'Stylish Words',
            text: text
        }).catch((error) => console.error('Error sharing', error));
    } else {
        copyToClipboard(text);
        alert("Share API not available. Text copied to clipboard instead!");
    }
}

// Expose global functions
window.copyToClipboard = copyToClipboard;
window.shareText = shareText;
window.updateFontDisplay = updateFontDisplay;
