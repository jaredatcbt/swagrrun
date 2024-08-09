// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SwagRunMarket is ReentrancyGuard {
    address payable owner;
    address serviceFeesAddress = 0x9d5939C168d606A78B54ed5d7C4C2d1cCCCAAfd0;

    using Counters for Counters.Counter;
    Counters.Counter private itemsSold;

    constructor() {
        owner = payable(msg.sender);
    }

    struct bid {
        address nftContract;
        uint256 bidAmount;
        uint256 nftId;
        address bidPlacedBy;
    }

    struct marketItem {
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        bool isFixedSale;
        uint256 price;
        bool sold;
        bool isAuctionOpen;
        uint256 auctionEnds;
        uint256 auctionBasePrice;
    }

// EVENTS TO CALL
    event NftListedOnFixed(
        address indexed nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        bool isFixedSale,
        uint256 price,
        bool sold
    );
    event NftListedOnAuction(
        address indexed nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        bool sold,
        bool isAuctionOpen,
        uint256 auctionEnds,
        uint256 auctionBasePrice
    );
    event ProductUpdated(
        uint256 indexed id,
        uint256 indexed newPrice,
        bool sold,
        address owner,
        address seller
    );
    event ProductSold(
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );


    /////////////////////////////////// 
    // MAPPINGS TO STORE COLLECTIONS AND BID INFO
    mapping (address => mapping(uint256 => marketItem)) private collections;
    mapping(address => mapping(uint256 => bid)) private bids;
    mapping(address => uint256[]) private listedTokens;


    ///////////////////////////////////
    // LIST AN NFT ITEM ON FIXED PRICE, SENDER WILL PASS PRICE AMOUNT
    function listItemOnFixedPrice(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public nonReentrant {
        require(price > 0, "Price should be moreThan 1");
        require(tokenId > 0, "token Id should be moreThan 1");
        require(nftContract != address(0), "address should not be equal 0x0");

        collections[nftContract][tokenId] = marketItem(
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            true,
            price,
            false,
            false,
            0,
            0
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        updateTokenList(nftContract, tokenId);
        emit NftListedOnFixed(
            nftContract,
            tokenId,
            msg.sender,
            msg.sender,
            true,
            price,
            false
        );
    }

    // LIST AN NFT ITEM ON AUCTION, SENDER WILL PASS BASE PRICE AND ENDING TIME
    function listItemOnAuction(
        address nftContract,
        uint256 tokenId,
        uint256 basePrice,
        uint256 auctionEnds
    ) public nonReentrant {
        require(tokenId > 0, "token Id should be moreThan 1");
        require(nftContract != address(0), "address should not be equal 0x0");

        collections[nftContract][tokenId] = marketItem(
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            false,
            0,
            false,
            true,
            auctionEnds,
            basePrice
        );


        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        updateTokenList(nftContract, tokenId);
        emit NftListedOnAuction(
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            false,
            true,
            auctionEnds,
            basePrice
        );
    }

    // PLACE A BID ON NFT ITEM. IT WILL TAKE CONTRACT ADDRESS AND THE SPECIFIC TOKEN ID IN PARAMS
    function placeBid(address nftContract, uint256 tokenId) public payable {
        require(collections[nftContract][tokenId].seller != address(0), "NFT belong to contract yet");
        require(collections[nftContract][tokenId].sold == false, "NFT already sold");
        require(collections[nftContract][tokenId].auctionEnds > block.timestamp, "Auction time is finished");
        require(collections[nftContract][tokenId].isAuctionOpen == true, "NFT Auction not enabled yet");
        require(msg.sender != collections[nftContract][tokenId].seller, "You are seller, you can't place bids on this nft");
        require(msg.value >= collections[nftContract][tokenId].auctionBasePrice, "Bid amount should be greater than base price of NFT");
        require(msg.value > bids[nftContract][tokenId].bidAmount, "Place a higher bid than previous bidder");

        if(bids[nftContract][tokenId].bidPlacedBy != address(0)){ 
            (bool success, ) = bids[nftContract][tokenId].bidPlacedBy.call{value: bids[nftContract][tokenId].bidAmount}("");
            require(success, "Failed to return bid");
        }

        bids[nftContract][tokenId] = bid(
            nftContract,
            msg.value,
            tokenId,
            payable(msg.sender)
        );

    }


    // // Set auction end time
    // function setAuctionEndTime(uint256 time, uint256 nftItemId) public {
    //     require(msg.sender == nftItems[nftItemId].seller, "You are not owner of this NFT");
    //     nftItems[nftItemId].auctionEnds = time;
    // }

    // Sell to bidder
    function sellToBidder(address nftContract, uint256 tokenId) public {
        require(collections[nftContract][tokenId].auctionEnds < block.timestamp, "Auction is still online");

        address bidWinner = bids[nftContract][tokenId].bidPlacedBy;
        uint256 bidPrice = bids[nftContract][tokenId].bidAmount;
        IERC721(nftContract).transferFrom(address(this), bidWinner, tokenId);

    // Transfering and Distributing values
        uint256 serviceFees = (bidPrice/100)*3;
        uint256 sellerAmount = bidPrice - serviceFees;

        transferValues(nftContract, tokenId, serviceFees, sellerAmount);
        
        collections[nftContract][tokenId].owner = payable(bidWinner);
        collections[nftContract][tokenId].seller = payable(address(0));
        collections[nftContract][tokenId].sold = true;
        collections[nftContract][tokenId].auctionBasePrice = 0;
        collections[nftContract][tokenId].auctionEnds = 0;
        collections[nftContract][tokenId].isAuctionOpen = false;

        bids[nftContract][tokenId].bidPlacedBy = 0x0000000000000000000000000000000000000000;
        bids[nftContract][tokenId].bidAmount = 0;

        itemsSold.increment();

        emit ProductSold(
        nftContract,
        tokenId,
        payable(address(0)),
        payable(bidWinner),
        bidPrice
        );
    }

    //Buy NFT on FIXED PRICE
    function buyNFtOnFixedPrice(address nftContract, uint256 tokenId)
        public
        payable
        nonReentrant
    {
        require(collections[nftContract][tokenId].sold == false, "This item is not for sale right now");
        require(collections[nftContract][tokenId].isFixedSale == true, "This item is not listed on Fixed Sale");

        uint256 price = collections[nftContract][tokenId].price;
        require(msg.value == price, "you are not sending enough amount to buy" );

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

    // Transfering value to everybody
        uint256 serviceFees = (msg.value/100)*3;
        uint256 sellerAmount = msg.value - serviceFees;

        transferValues(nftContract, tokenId, serviceFees, sellerAmount);

        collections[nftContract][tokenId].owner = payable(msg.sender);
        collections[nftContract][tokenId].seller = payable(address(0));
        collections[nftContract][tokenId].sold = true;
        collections[nftContract][tokenId].isFixedSale = false;
        collections[nftContract][tokenId].price = 0;

        itemsSold.increment();

        emit ProductSold(
        nftContract,
        tokenId,
        payable(address(0)),
        payable(msg.sender),
        msg.value
        );
    }


    // Transfer and Distribute Value
    function transferValues(address nftContract, uint256 tokenId, uint256 serviceFees, uint256 sellerAmount) internal {
        (bool serviceTransferSuccess, ) = serviceFeesAddress.call{value: serviceFees}("");
        require(serviceTransferSuccess, "Failed to deduct service fees");
        (bool sellerTransferSuccess, ) = collections[nftContract][tokenId].seller.call{value: sellerAmount}("");
        require(sellerTransferSuccess, "Failed to send value to seller");
    }


    // REMOVE FIXED ITEM FROM MARKET
    function removeFixedItemFromMarket(address nftContract, uint256 tokenId) public {
        require(collections[nftContract][tokenId].seller == msg.sender, "You are not the seller of this token");
        require(collections[nftContract][tokenId].isFixedSale == true, "Item is not listed on market");

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        collections[nftContract][tokenId].owner = payable(msg.sender);
        collections[nftContract][tokenId].seller = payable(address(0));
        collections[nftContract][tokenId].sold = true;
        collections[nftContract][tokenId].isFixedSale = false;
        collections[nftContract][tokenId].price = 0;

    }

    // REMOVE AUCTION ITEM FROM MARKET
    function removeAuctionItemFromMarket(address nftContract, uint256 tokenId) public {
        require(collections[nftContract][tokenId].seller == msg.sender, "You are not the seller of this token");
        require(collections[nftContract][tokenId].isAuctionOpen == true, "Item is not listed on market");
        require(bids[nftContract][tokenId].bidPlacedBy == address(0), "Bidding is already active now, you can't remove it when there is already a bid");

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        collections[nftContract][tokenId].owner = payable(msg.sender);
        collections[nftContract][tokenId].seller = payable(address(0));
        collections[nftContract][tokenId].sold = true;
        collections[nftContract][tokenId].auctionBasePrice = 0;
        collections[nftContract][tokenId].auctionEnds = 0;
        collections[nftContract][tokenId].isAuctionOpen = false;
    }

    function updateTokenList(address nftContract ,uint256 tokenId) internal {
        bool found = false;
        for(uint i =0 ; i<listedTokens[nftContract].length;i++){
            if(listedTokens[nftContract][i] == tokenId){
                found = true;
            }
        }
        if(!found){
        listedTokens[nftContract].push(tokenId);
        }
    }

    //FETCH SINGLE NFT DETAILS
    function fetchSingleItem(address nftContract, uint256 tokenId) public view returns (marketItem memory)
    {
        return collections[nftContract][tokenId];
    }

    //FETCH SINGLE NFT BID DETAILS
    function fetchSingleBid(address nftContract, uint256 tokenId) public view returns (bid memory)
    {
        return bids[nftContract][tokenId];
    }

    // GET LISTED ITEMS IDS OF SINGLE COLLECTION
    function getListedIds(address nftContract) public view returns (uint256[] memory){
        return listedTokens[nftContract];
    }


    // GET MY PURCHASED NFTS
    // function getMyNFTPurchased() public view returns (marketItem[] memory) {
    //     uint256 totalItemCount = itemId.current();
    //     uint256 myItemCount = 0; //10
    //     uint256 myCurrentIndex = 0;

    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (nftItems[i + 1].owner == msg.sender) {
    //             myItemCount += 1;
    //         }
    //     }

    //     marketItem[] memory nftItems = new marketItem[](myItemCount); //list[3]
    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (nftItems[i + 1].owner == msg.sender) {
    //             //[1,2,3,4,5]
    //             uint256 currentId = i + 1;
    //             marketItem storage currentItem = nftItems[currentId];
    //             nftItems[myCurrentIndex] = currentItem;
    //             myCurrentIndex += 1;
    //         }
    //     }

    //     return nftItems;
    // }

    // SET SERVICE FEES ADDRESS
    function setServiceFeesAddress(address _serviceFeesAddress) public {
        serviceFeesAddress = _serviceFeesAddress;
    }

    // GET BLOCK TIMESTAMP
    function getBlockTimeStamp() public view returns(uint256) {
        return block.timestamp;
    }

}