const prompt = require('prompt-sync')({ sigint: true });
const bookController = require('./controllers/bookController');

activate();

function activate() {
    const op = prompt('Type the operation: (create, read (show all), update or delete): ');

    handleOperationChoice(op);
}

function handleOperationChoice(op) {
    const ops = [
        {'create': 'createBook'},
        {'read': 'showBooks'},
        {'update': 'updateBook'},
        {'delete': 'deleteBook'},
    ];
    
    const validOp = ops.find(obj => Object.keys(obj)[0] === op)?.[op]

    validOp
        ? bookController[validOp]({activate})
        : console.log(`"${op}" operation not valid`);
}
