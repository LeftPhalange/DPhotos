App = { // initialize all variables, this follows the model of the Election example we had, we are borrowing that structure to stay familiar with everything
  web3Provider: null, // This jQuery structure is inspired by the Ultimate dApp Ethereum tutorial
  web3Object: null,
  PhotoContract: null,
  Photo: null,
  PhotoInstance: null,
  Purchased: false,
  account: '0x0',
  init: function () { // init function, gets everything started (from the document.ready event in jQuery)
    return App.initializeWeb3(); // get Web3 initialized, getting the smart contract ready and get the account address
  },
  initializeWeb3: function () { // requesting permission
    if (window.ethereum) { // from the MetaMask developer guide, this allows us to get MetaMask to interface with our web app
        window.web3 = new Web3(ethereum);
        try { // Let's give it a go here...
            ethereum.enable();
          } catch (error) { // Denied
            alert ("To make a purchase on here, please accept the request through MetaMask, and try again.");
          }
      }
      else { // an Ethereum client (MetaMask or Brave browser) isn't present, show 'em where we get the goods
        window.location.pathname = "/incompatible.html";
      }
      web3Provider = web3.currentProvider;
      web3.eth.getCoinbase(function(err, account) { // get address of user
        if (err === null) {
          App.account = account;
          $("#accAddress").html("Your address: " + account); // change accAddress control dynamically
        }
      }); // Below is initializing the PhotoContract with the contract constructor of web3.js 0.x.x, with the ABI
      PhotoContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getListing",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listingArray",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "listingCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "fileName",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getFilename",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "fileName",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			}
		],
		"name": "addPhoto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]);
  App.Photo = PhotoContract.at('0xb39dbaB42C49bA50d58E9c155229A076EC43Ed77'); // place the deployed contract address here
  },
  getListing: function (id) {
    console.log(id);
    App.Photo.getListing(id, function (err, inst) { if (!err) { App.PhotoInstance = inst; // this will get the price at index 1
      App.makeTransaction (id, App.PhotoInstance[1]);
    } });
  },
  makeTransaction: function (fileName, price) { // perform transaction, ID is what photo it is
    web3.eth.sendTransaction({
        from: App.account,
        to: '0x9026F338795A28d3e1987FC22Af26b5660A4F88F', // deployed contract address (account) goes here
        value: price // this value will change over time when we make it dynamic, should we choose to.
    }, function(error, hash) {
        if (error != null) { // Something went wrong, transaction most likely did not go through due to insufficient funds or improper permissions (rejected).
          alert ("Transaction has been denied.");
        }
        else { // Success!
          $('#modal-title').text('Congratulations! You now have the rights to this image.');
          var html = 'Get it here: <a href="/assets/' + App.PhotoInstance[3] + '_actual.jpg"><br />Link to photo</a>'; // dynamically gets link from current photo instance
          $('#modal-message').html(html);
          $('#purchase-modal-button').text('Finish');
          App.Purchased = true;
        }
    });
  }
};

// This is where our events will go.
$(document).ready(function() { // Modifies modal-message and modal-title, when the document is ready event is triggered.
  App.init(); // get everything started, trigger the initializeWeb3 function (to get smart contract and address ready)
  var id = -1; // which photo is it? this helps us with that
  $( "#purchase-modal-button" ).click(function() { // this is INSIDE the modal, the purchase button
      if (App.Purchased == true) { // This is when you actually did purchase it, and you cannot purchase it again
        $('#purchaseModal').modal('hide');
        App.Purchased = false;
      }
      else {
        var price = null;
        App.getListing(id);
      }
  });
  $( ".purchase-btn" ).click(function() { // one of the purchase buttons are made
    var price = "0";
    var title = "Title";
    var description = "Description";
    var imgSrc = $('#card-modal-image').attr('src');
    if (this.id == "pbutton-1") { // set content for the modal
      id = 0;
      price = "1";
      title = $('#card-1-title').text();
      description = $('#card-1-desc').text();
      image = $('#card-1-image').attr('src');
    }
    else if (this.id == "pbutton-2") { // set content for modal
      id = 1;
      price = "1";
      title = $('#card-2-title').text();
      description = $('#card-2-desc').text();
      image = $('#card-2-image').attr('src');
    }
    else if (this.id == "pbutton-3") { // set content for modal
      id = 2;
      price = "1";
      title = $('#card-3-title').text();
      description = $('#card-3-desc').text();
      image = $('#card-3-image').attr('src');
    }
    // set content dynamically
    $('#modal-title').text('You are requesting a purchase of ' + price + ' ether.');
    $('#modal-message').text('This will entitle you to the rights of the following image:');
    $('#card-modal-title').text(title);
    $('#card-modal-desc').text(description);
    $('#card-modal-image').attr('src', image);
    $('#purchaseModal').modal('show'); // finally, show the modal
  });
});
