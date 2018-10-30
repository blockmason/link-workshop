pragma solidity ^0.4.24;

contract Lending {

    struct Loan {
        address creditor;
        address debtor;
        uint amount;
        uint term; // in months
        uint interest; // in basis points so 500 is 5.00%
    }

    mapping(uint => Loan) public loans;
    uint public loansCount;

    // loaned event
    event createLoanEvent(address indexed creditor);
    
    constructor () public {
    }
        
    function addLoan(address creditor, address debtor, uint amount, uint term, uint interest) public {
        loansCount ++;
        loans[loansCount] = Loan(creditor, debtor, amount, term, interest);
        emit createLoanEvent(creditor);
    }
}