export const setInputSelection = (input, startPos, endPos) => {
  if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(startPos, endPos);
  } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', endPos);
      range.moveStart('character', startPos);
      range.select();
  }
}

export const setInputPos = (input, pos) => {
  setInputSelection(input, pos, pos);
}