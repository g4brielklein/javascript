const bookController = require('./controllers/bookController');
const readline = require('readline');

const operations = ['create', 'read (show all)', 'update', 'delete'];

activate();

function activate(isRestarting) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    if (!isRestarting) {
        rl.input.on('keypress', handleKeyPress);
    }

    selectedItem = 0;
    displayOptions();

    function displayOptions() {
        console.clear();
        console.log('Select the operation: ')
    
        operations.forEach((option, index) => {
            index === selectedItem
                ? console.log(`> ${option}`)
                : console.log(option);
        });
    }

    function handleKeyPress(key, info) {
        if (info.name === 'down' && selectedItem < operations.length - 1) {
            selectedItem++;
        } else if (info.name === 'up' && selectedItem > 0) {
            selectedItem--;
        }
         else if (info.name === 'return') {
            rl.removeListener('keypress', handleKeyPress);
            rl.close();
            return handleOperationChoice(selectedItem);
        }
    
        displayOptions();
    }
}

function handleOperationChoice(selectedItem) {
    const ops = [
        {'create': 'createBook'},
        {'read': 'showBooks'},
        {'update': 'updateBook'},
        {'delete': 'deleteBook'},
    ];
    
    const validOp = Object.values(ops[selectedItem])[0]

    validOp
        ? bookController[validOp]({ activate })
        : console.log('[ERROR]: Operation not valid');
}
