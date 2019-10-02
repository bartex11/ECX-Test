var state = {
  currentView: 'select-fruits',
  orderList: [],
  fruits: [
    {
      id: 1,
      name: 'Bananas'
    },
    {
      id: 2,
      name: 'Red apple '
    },
    {
      id: 3,
      name: 'Green Apple'
    },
    {
      id: 4,
      name: 'Melons'
    }
  ]
};

function outputFruitsSelectorView() {
  var text = '<p>Fruits:</p>';
  state.fruits.forEach(item => {
    text = text + '<p>' + item.id + '.' + item.name + '</p>';
  });
  consoleWrite(text);
}

function outputPintOrderList() {
  var text = '<p>Current order list:</p>';
  if (state.orderList.length > 0) {
    state.orderList.forEach(item => {
      text = text + '<p>' + 'id:' + item.id + '-menge' + item.quantity + '</p>';
    });
  } else {
    text = text + '<p>empty</p>';
  }
  consoleWrite(text);
}

function outputMenu() {
  var outputDivElement = document.getElementById('console-output');
  var text = '<p>Commands:</p>';
  text += '<p>menu                                      - prints this menu</p>';
  text +=
    '<p>add-fruit-to-order {fruit-id} {quantity}  - adds fruit to the order list</p>';
  text +=
    '<p>print-order-list                          - print the order list</p>';
  text +=
    '<p>list-fruits                               - list available fruits</p>';
  text += '<br/>';
  consoleWrite(text);
}

function processCommand(command) {
  var parts = command.split(' ');
  var cmd = parts[0];
  var arguments = parts.slice(1);

  switch (cmd) {
    case 'menu':
      outputMenu();
      break;
    case 'add-fruit-to-order':
      if (arguments.length === 2) {
        state.orderList.push({
          id: arguments[0],
          quantity: arguments[1]
        });
      } else {
        outputToConsole(
          'Command add-fruit-to-order requires id and quantity arguments!'
        );
      }
      break;
    case 'list-fruits':
      outputFruitsSelectorView();
      break;
    case 'print-order-list':
      outputPintOrderList();
      break;
    default:
      outputToConsole('Unsupported Command: ' + command);
      break;
  }
}

function outputToConsole(text) {
  consoleWrite('<p>' + text + '</p>');
}

function consoleWrite(html) {
  var outputDivElement = document.getElementById('console-output');
  outputDivElement.innerHTML += html + '<br/><br/>';
}

function onCommandInputKeyDown(e) {
  if (e.code === 'Enter') {
    processCommand(e.target.value);
    e.target.value = '';
  }
}

function onDocumentLoaded() {
  outputMenu();
}
