//BACK-END LOGIC
function Account(first, last, deposit) {
    this.first = first;
    this.last = last;
    this.deposit = deposit;
}

//Prototypes
Account.prototype.fullName = function() {
    return this.first + " " + this.last;
};

Account.prototype.depositCash = function(amt1, amt2) {
    return amt1 + amt2;
};   

Account.prototype.withdraw = function(amt1, amt2) {
    return amt1 - amt2;
};

function resetFields() {
    $("input#first-name").val("");
    $("input#last-name").val("");
    $("input#initial-deposit").val("");
    $("input#withdraw-amount").val("");
    $("input#deposit-amount").val("");
}

//JQUERY FRONT-END LOGIC
$(document).ready(function() {
    //target the open-account, withdraw and deposit buttons
    $("button#open-account-button").click(function() {
        $("form#open-account-form").slideToggle(500);
    });

    $("button#withdraw-button").click(function() {
        $("form#withdraw-form").slideToggle(500);
    })

    $("button#deposit-button").click(function() {
        $("form#deposit-form").slideToggle(500);
    })

    //Form submission
    $("form#open-account-form").submit(function(event) {
        event.preventDefault();
        //get the values
        var inputtedFirstName = $("input#first-name").val();
        var inputtedLastName = $("input#last-name").val();
        var inputtedDeposit = parseInt($("input#initial-deposit").val());

        // create an account object
        var newAccount = new Account(inputtedFirstName, inputtedLastName, inputtedDeposit);

        //Display the data
        $("div.user-detail").slideToggle(900);
        $("div.user-detail h5").text(newAccount.fullName());
        $("div.user-detail").append('<p>' + '<span class="account-info">' +  'FirstName:' + '</span>' + " " + newAccount.first +  
                                    '</p>' + '<p>' + '<span class="account-info">' +  'LastName:' + '</span>' + " " + newAccount.last +  
                                    '</p>' + '<p id="new-deposit">' + '<span class="account-info">' + 'Balance:' + '</span>' +  " " + newAccount.deposit +  '</p>');
        
        //hide the form
        $(this).hide();
        $("button#open-account-button").hide();
        
        $("form#withdraw-form").submit(function(event) {
            event.preventDefault();

            // get the value of the form
            var inputtedAmountWithdraw = parseInt($("input#withdraw-amount").val());
            var balanceInTheAccount = newAccount.deposit;
            var balanceAfterWithdrawal = newAccount.withdraw(balanceInTheAccount, inputtedAmountWithdraw);
            newAccount.deposit = balanceAfterWithdrawal;

            //Appending the data
            $("div.user-detail #new-deposit").text('Balance: ' + balanceAfterWithdrawal);
            resetFields();
        });
    
        $("form#deposit-form").submit(function(event) {
            event.preventDefault();

            //get the value of the form
            var inputtedDepositAmount = parseInt($("input#deposit-amount").val());
            var newBalanceInTheAccount = newAccount.deposit;
            var balanceAfterDepositing = newAccount.depositCash(newBalanceInTheAccount, inputtedDepositAmount);
            newAccount.deposit = balanceAfterDepositing;

            //Appending the data
            $("div.user-detail #new-deposit").text('Balance: ' + newAccount.deposit);
            resetFields();
        });

        //reset Fields
        resetFields();
    });

    


})






































/* 

    $(":input").each(function() {
        if($(this).val() === "") {
            alert("Make sure you fill in all the fields");
        } else {
            alert("submmited");
        }
    });
});

*/