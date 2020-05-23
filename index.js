const prompt = require('prompt-sync')();

/* Using a class to store the wallet details. Sql can also
be used to store the details */
class Wallet {
    constructor() {
        this._mooofarm_wallet = 0;
        this._bonus = 0;
        this._winnings = 0;
        this._deposit = 0;
    }
    set addDeposit(increase) {
      this._deposit += increase;
      this._mooofarm_wallet += increase;
    }
    set addBonus(increase) {
        this._bonus += increase;
        this._mooofarm_wallet += increase;
      }
    set addWinnings(increase) {
        this._winnings += increase;
        this._mooofarm_wallet += increase;
    }
    get deposit() {
        return this._deposit;
    }
    get bonus() {
        return this._bonus;
    }
    get winnings() {
        return this._winnings;
    }
    get mooofarm_wallet() {
        return this._mooofarm_wallet;
    }
}

// Hard coding a dummy user account
var user1 = new Wallet();
user1.addDeposit = 100;
user1.addBonus = 60;
user1.addWinnings = 340;


const discount = prompt('What is the discount % ?');
const serviceCharge = [300, 400, 600, 500]; //just to give different types of Charges
const selectedService = (100-discount)/100 * serviceCharge[Math.floor(Math.random() * 4)]; //to randomly select from available charges for multiple outputs
console.log('Discounted Charge for the service: ',selectedService);
const bal = user1.mooofarm_wallet;
console.log('Available balance: ',bal);
const resp = prompt('Do you want to continue: (y/n)');

if (resp === 'n' || resp === 'N' || bal < selectedService) {  //Get out because requirements do not meet
    return;
}

const bonus = user1.bonus;
const tempBonus = bonus - 0.1*selectedService;
console.log(tempBonus);
const tempDep = 0;
user1.addBonus = tempBonus >= 0 ? -(0.1*selectedService): 0;
if(!user1.bonus) {
    tempDep = abs(tempBonus);
}
if(user1.deposit >= tempDep + (0.9*selectedService)){  //If whole fee can be recovered using deposit plus bonus money
    user1.addDeposit = -(tempDep + (0.9*selectedService));
} else {
    user1.addWinnings = (tempDep + user1.deposit) - (0.9*selectedService);
    user1.addDeposit = -(user1.deposit);
}
console.log('Success. Updated balance: ', user1.mooofarm_wallet, user1.bonus, user1.deposit, user1.winnings);



