const bookController = require('./controllers/bookController');
const keypress = require('keypress');

const operations = ['create', 'read (show all)', 'update', 'delete', 'status'];
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', handleKeyPress);

activate();

function activate() {
    process.stdin.resume();
    selectedItem = 0;

    displayOptions();
}

function displayOptions() {
    console.clear();
    console.log('\n=== BookTracker v1.0 ===\n')

    console.log('Select the operation: ')

    operations.forEach((option, index) => {
        index === selectedItem
            ? console.log(`> ${option}`)
            : console.log(option);
    });

    console.log('\n')
}

function handleKeyPress(ch, key) {
    if (key.name === 'down' && selectedItem < operations.length - 1) {
        selectedItem++;
    } else if (key.name === 'up' && selectedItem > 0) {
        selectedItem--;
    }
     else if (key.name === 'return') {
        process.stdin.pause();
        return handleOperationChoice(selectedItem);
    }

    displayOptions();
}

function handleOperationChoice(selectedItem) {
    const ops = [
        {'create': 'createBook'},
        {'read': 'showBooks'},
        {'update': 'updateBook'},
        {'delete': 'deleteBook'},
        {'status': 'getStatus'},
    ];
    
    const validOp = Object.values(ops[selectedItem])[0]

    validOp
        ? bookController[validOp]({ activate })
        : console.log('[ERROR]: Operation not valid');
}
