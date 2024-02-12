import { BookDAO } from './dao/bookDAO.js';
import promptSync from 'prompt-sync';
const bookDAO = new BookDAO();
const prompt = promptSync();

export class Utils {
    checkIfIdAlreadyExists = async (id) => {
        const foundedId = await bookDAO.getBookById(id);

        return foundedId.rows[0];
    }

    showSuccessMessage = (action) => {
        const actionMessage = action ? `Book successfully ${action}` : 'Success'
        console.log(`\n${actionMessage}\n`)
    }

    handleContinueOperations = (callBackFunction) => {
        const wantToContinue = prompt('Do you want to do another operation? (yes/no) ').toLowerCase();

        if (wantToContinue === 'yes' || wantToContinue === 'y' || wantToContinue === '') {
            return callBackFunction.activate();
        } else if (wantToContinue === 'no' || wantToContinue === 'n') {
            return console.log('Operation finished')
        }
    }
}
