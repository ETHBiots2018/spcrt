$(window).on('load', function() {

    var userAddress = web3.eth.accounts[0];
    var contractAddress = "0x0bd69bd276d7c0a205cd7096f65b69e14d369214";
    var contractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"referrer","type":"address"}],"name":"introduction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"objReceiver","type":"address"}],"name":"mintCollection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"mintRecycle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getReputation","outputs":[{"name":"rep","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"repairGuy","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferRepair","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];

    var cont = $('#content');
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        //cont.text('Everything up and running!');
        //cont. removeClass();
        //cont.addClass('alert-success');
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

    contractInstance.balanceOf(userAddress, function(error, balance) {
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

        if(repairAddress === '' || tokens === '') return;
        contractInstance.transferRepair(repairAddress, tokens, function(error, repair) {
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
        if(validationKey === '') return;
        if(validationKey == 123456) {
            var errorMsg = 'Validation Key invalid! Process aborted';
            cont.text(errorMsg);
            cont. removeClass();
            cont.addClass('alert-danger');
            console.log(errorMsg);
            return;
        } else {
            contractInstance.mintRecycle(function(error, recyle) {
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
        if(buyerAddress === ''|| tokens === '') return;
        contractInstance.transfer(buyerAddress, tokens, function(error, txHash) {
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
