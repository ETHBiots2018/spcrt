$(window).on('load', function() {

    var ownerAddress = "0x417ac95EE9FF85512848a27A88e32a1A2D0CE661";
    
    var contractAddress = "";
    var contractAbi = [ /* contractAbi */ ];

    var cont = $('#content');
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        cont.text('Everything up and running!');
        cont. removeClass();
        cont.addClass('alert-success');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        var errorMsg = 'web3 is missing :( Please open in Google Chrome Browser and install the Metamask extension.';
        cont.text(errorMsg);
        cont. removeClass();
        cont.addClass('alert-danger');
        console.log(errorMsg);
        return;
    }
    
    // create instance of contract object that we use to interface the smart contract
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);

    contractInstance.balanceOf(ownerAddress, function(error, balance) {
        if (error) {
            var errorMsg = 'error reading balance from smart contract: ' + error;
            cont.text(errorMsg);
            cont. removeClass();
            cont.addClass('alert-danger');
            console.log(errorMsg);
            return;
        }
        $('#account-token-amount').text(balance)
    });
    
    $('#repair').on('submit', function(e) {
        e.preventDefault(); // cancel the actual submit
        var repairAddress = $('#repair-address').val();
        var tokens = $('#repair-token-amount').val();
        contractInstance.transferRepair(ownerAddress, repairAddress, tokens, function(error, repair) {
            if (error) {
                var errorMsg = 'error with transfer ' + error;
                cont.text(errorMsg);
                cont. removeClass();
                cont.addClass('alert-danger');
                console.log(errorMsg);
                return;
            }
            cont.text('submitted new transaction to network');
            cont. removeClass();
            cont.addClass('alert-success');
        });
    });

    $('#recycle').on('submit', function(e) {
        e.preventDefault(); // cancel the actual submit
        var validationKey = $('#validation-key').val();

        if(validationKey === 123456) {
            var errorMsg = 'Validation Key invalid! Process aborted';
            cont.text(errorMsg);
            cont. removeClass();
            cont.addClass('alert-danger');
            console.log(errorMsg);
            return;
        } else {
            contractInstance.mintRecycle(ownerAddress, function(error, recyle) {
                if (error) {
                    var errorMsg = 'error with recycle transaction ' + error;
                    cont.text(errorMsg);
                    cont. removeClass();
                    cont.addClass('alert-danger');
                    console.log(errorMsg);
                    return;
                }
                cont.text('Tokens were successfully added to your account.');
                cont. removeClass();
                cont.addClass('alert-success');
            });
        }
    });

    $('#resell').on('submit', function(e) {
        e.preventDefault(); // cancel the actual submit
        var buyerAddress = $('#buyer-address');
        var tokens = $('#byer-token-amount');
        contractInstance.transferResell(ownerAddress,buyerAddress,tokens, function(error, txHash) {
            if (error) {
                var errorMsg = 'error with transfer ' + error;
                cont.text(errorMsg);
                cont. removeClass();
                cont.addClass('alert-danger');
                console.log(errorMsg);
                return;
            }
            cont.text('submitted new transaction to network');
            cont. removeClass();
            cont.addClass('alert-success');
        });
    });



});

function cb(error, response) {
    // callback as helper function for debugging purposes
    console.error('error: ' + error + ', response: ' + response);
}
