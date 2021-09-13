// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract MockMarz is ERC721Upgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdTracker;

    function initialize() external initializer {
        __ERC721_init("Marz", "PLOT");
    }

    function mint() external {
        _mint(_msgSender(), _tokenIdTracker.current());
        _tokenIdTracker.increment();
    }
}
