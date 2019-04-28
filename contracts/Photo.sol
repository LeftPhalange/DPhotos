pragma solidity ^0.5.0;

contract Photo {
  struct Listing {
    // general structure of things for a photo listing
    uint id;
    string price;
    string name;
    string fileName;
    string description;
  }
  mapping (uint => Listing) public listings;
  uint[] public listingArray;
  uint public listingCount;
  constructor () public { // since this acts as a marketplace ran by an individual, photos are hardcoded, otherwise we would have a way to set these photos dynamically
    addPhoto (0, "1000000000000000000", "Springtime in February", "32716194821_5115481715", "Taken at Georgia State University in February of 2017.");
    addPhoto (1, "1000000000000000000", "Through Concrete", "32025085133_1c27a7f4e0", "Taken at Georgia State University in February of 2017.");
    addPhoto (2, "1000000000000000000", "Cherry Blossoms", "32077057834_629722e347", "Taken at Sugarloaf Mills in East Atlanta in 2017.");
  }
  function addPhoto (uint id, string memory price, string memory name, string memory fileName, string memory description) public { // visibility should be private since it won't be used outside this contract
    listings[id].id = id;
    listings[id].price = price;
    listings[id].name = name;
    listings[id].fileName = fileName;
    listings[id].description = description;
    listingArray.push(id);
    listingCount++;
  }
  function getFilename (uint id) public view returns (string memory) {
    return (listings[id].fileName);
  }
  function getLength () public view returns (uint) {
    return listingCount;
  }
  function getListing (uint id) public view returns (uint, string memory, string memory, string memory, string memory)
  {
    Listing memory listing = listings[id];
    return (listing.id, listing.price, listing.name, listing.fileName, listing.description);
  }
}
