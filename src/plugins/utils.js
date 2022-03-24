/**
 * Wrapper to navigator.clipboard.writeText() with fallback tentative
 * for non-secure contexts.
 * Source: https://stackoverflow.com/a/65996386
 * Author: drmrbrewer
 */
export function copyToClipboard(textToCopy) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    const textArea = document.createElement('textarea');

    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
}

/**
 *
 * Transform an input that can be an array into a litteral value
 * If it's an array, return the first value of the array
 * @param {any} input - The value to check
 * @returns {any}
 */
export function unArray(input) {
  return Array.isArray(input) ? input[0] : input;
}

export function isEmptyObject(object) {
  return Object.keys(object).length === 0;
}
