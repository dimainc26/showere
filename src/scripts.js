const imageInput = document.getElementById("file");

const previewPhoto = () => {
  const file = imageInput.files;
  if (file) {
    const fileReader = new FileReader();
    const preview = document.getElementById("image-preview");
    fileReader.onload = (event) => {
      preview.setAttribute("src", event.target.result);
      preview.classList.add("image-size");
    };
    fileReader.readAsDataURL(file[0]);
  }
};

imageInput.addEventListener("change", previewPhoto);

// Make the DIV element draggable:
dragElement(document.getElementById("title-editable"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "div")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// TextDecoration
const editor = document.getElementById("title-editable");

const boldButton = document.getElementById("boldButton");
const italicButton = document.getElementById("italicButton");
const underlineButton = document.getElementById("underlineButton");

function performAction(command) {
  document.execCommand(command, false, null);
  editor.focus();

  var selection = window.getSelection();

  selectors(editor, selection);
}

boldButton.addEventListener("click", function () {
  performAction("bold");
});

italicButton.addEventListener("click", function () {
  performAction("italic");
});

underlineButton.addEventListener("click", function () {
  performAction("underline");
});

// fontsize Range
const fontsizeRange = document.getElementById("font-size-input");

const fontSize = document.getElementById("font-size");

fontsizeRange.addEventListener("change", (event) => {
  fontSize.textContent = event.target.value;

  // TODO: change fontsize in title-editable
  const editor = document.getElementById("title-editable");

  var selection = window.getSelection();

  selectors(editor, selection);

  editor.style.fontSize = event.target.value.toString() + "px";

  selection.removeAllRanges();
});

var selectors = function selection(editor, selection) {
  var range = document.createRange();
  range.selectNodeContents(editor);
  selection.removeAllRanges();
  selection.addRange(range);
};

// Color
const colorValue = document.getElementById("color");

colorValue.addEventListener("change", (event) => {
  editor.style.color = event.target.value.toString();
});

// Left Utils

const newParagraph = document.getElementById("new-paragraph");

newParagraph.addEventListener("click", function addParagraph() {
  const interactiveContainer = document.getElementById("interactive-container");

  const newElement = document.createElement("h1");
  newElement.classList.add("title-box");
  newElement.id = "title-editable_" + 0;

  newElement.innerHTML = "New Text";

  interactiveContainer.appendChild(newElement);

  dragElement(document.getElementById(newElement.id.toString()));

  newParagraph.removeEventListener("click", addParagraph, false);

  newParagraph.style.backgroundColor = "gray";
  newParagraph.innerText = "-";


});
