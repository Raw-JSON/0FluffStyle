# 0flufStyle

> **0flufStyle** is a minimalist, high-performance web application designed to transform standard text into a wide array of Unicode-based styles. Built with a focus on performance and zero-dependency architecture, it provides instant, client-side text transformation for social media, coding, or creative writing.

## 🚀 Features
- **Instant Transformation**: Real-time conversion as you type.
- **Vast Style Library**: 
    - **Standard**: Bold, Italic, Monospace, Script, Fraktur, Double-Struck.
    - **Decorative**: Bubbles, Squared, Small Caps, Tiny (Superscript), Subscript.
    - **Ancient & Cryptic**: Runic, Ogham, Gothic (Ancient), Coptic, Shavian, Braille.
    - **Glitch & Effects**: Zalgo (Glitch), Strikethrough, Underline, Slash.
- **Copy & Share**: Single-click to copy to clipboard or share via the native Web Share API.
- **Sanitized Output**: Automatically strips invisible control characters (ZWJ) to ensure clean, predictable text.
- **Minimalist UI**: Dark-mode optimized, responsive, and lightweight.

## 🛠️ Technical Standard
- **Vanilla Stack**: HTML5, CSS3 (Tailwind CSS for layout), and Vanilla JavaScript.
- **0fluf Protocol**: No heavy frameworks, no tracking, no bloat.
- **Performance**: High-efficiency character mapping via `char_maps.js`.
- **Safety**: Client-side only; your data never leaves your browser.

## 📂 Project Structure
- `index.html`: The core UI and entry point.
- `style.css`: Custom styling and font-preview overrides.
- `script.js`: Core logic, including algorithmic glitch effects and character combination.
- `char_maps.js`: The dictionary of Unicode mappings.

## 📜 License
[MIT License](LICENES)
