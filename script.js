class TextScramble {
  constructor(element) {
    this.element = element;
    this.textNodes = Array.from(this.element.childNodes)
      .filter(node => node.nodeType === 3 && node.textContent.trim() !== ''); // Filter out empty text nodes
    this.init();
  }

  init = () => {
    this.textNodes.forEach(textNode => {
      textNode.addEventListener('mouseover', (event) => {
        event.preventDefault();
        this.scrambleText(textNode);
      });

      textNode.addEventListener('mouseout', () => {
        this.revertText(textNode);
      });
    });
  }

  scrambleText = (textNode) => {
    const originalText = textNode.textContent;
    const scrambledText = this.getScrambledText(originalText);
    textNode.textContent = scrambledText;
  }

  revertText = (textNode) => {
    const originalText = textNode.getAttribute('data-original-text');
    textNode.textContent = originalText;
  }

  getScrambledText = (text) => {
    const reversedText = text.split('').reverse().join('');
    return reversedText;
  }
}

// Init TextScramble
const scrambleElements = document.querySelectorAll('[data-text-scramble]');
scrambleElements.forEach((element) => {
  const textScrambleInstance = new TextScramble(element);

  // Store the original text in a data attribute for reverting
  textScrambleInstance.textNodes.forEach(textNode => {
    textNode.setAttribute('data-original-text', textNode.textContent);
  });
});
