pragma solidity >=0.5.0;

contract Photo {
  struct Listing {
    // general structure of things for a photo listing
    string name;
    string description;
    string actualName;
    string price;
  }
  mapping (uint => Listing) public listings;
  uint public listingCount;
  constructor () public {

  }
  function addPhoto (string memory title, string memory description, string memory actualName, string memory price) private { // visibility should be private since it won't be used outside this contract
    listingCount++;
    listings[listingCount] = Listing (title, description, actualName, price);
  }
}
