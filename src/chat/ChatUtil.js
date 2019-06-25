const colorCodes = {
  '0': 'black',
  '1': 'dark_blue',
  '2': 'dark_green',
  '3': 'dark_cyan',
  '4': 'dark_red',
  '5': 'dark_purple',
  '6': 'gold',
  '7': 'gray',
  '8': 'dark_gray',
  '9': 'blue',
  a: 'green',
  b: 'aqua',
  c: 'red',
  d: 'light_purple',
  e: 'yellow',
  f: 'white',
  k: 'obfuscated',
  l: 'bold',
  m: 'strikethrough',
  n: 'underlined',
  o: 'italic',
  r: 'reset',
  '&': '&'
};

class ChatUtil {
  static parseColoredMessage(message) {
    if (typeof message === 'object') return message;

    const componentList = [];
    let text = '';
    let nextChanged = false;

    // Default component properties
    let color = 'reset';
    let bold = false;
    let italic = false;
    let underlined = false;
    let strikethrough = false;
    let obfuscated = false;

    const createJsonComponent = () => {
      if (!text.trim()) return;
      componentList.push({
        text,
        color,
        bold,
        italic,
        underlined,
        strikethrough,
        obfuscated
      });
      text = '';
    };

    while (message !== '') {
      const currentChar = message[0];
      if (nextChanged) {
        const newColor = colorCodes[currentChar];
        if (newColor) {
          if (newColor === 'bold') bold = true;
          else if (newColor === 'strikethrough') strikethrough = true;
          else if (newColor === 'underlined') underlined = true;
          else if (newColor === 'italic') italic = true;
          else if (newColor === 'obfuscated') obfuscated = true;
          else if (newColor === '&') text += '&';
          else if (newColor === 'reset') {
            strikethrough = false;
            bold = false;
            underlined = false;
            obfuscated = false;
            italic = false;
            color = 'reset';
          } else color = newColor;
        }
        nextChanged = false;
      } else if (currentChar === '&') {
        if (nextChanged) {
          text += '&';
          nextChanged = false;
        } else {
          nextChanged = true;
          createJsonComponent();
        }
      } else {
        text += currentChar;
      }

      message = message.slice(1, message.length);
    }
    createJsonComponent();

    if (componentList.length > 0) {
      return {
        text: '',
        extra: componentList
      };
    } else return { text: '' };
  }
}

module.exports = ChatUtil;
