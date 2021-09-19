// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./MarzResources.sol";

contract MarzMint {
    address private marz;

    constructor(address _marz) {
        marz = _marz;
    }

    function mine(uint256[] calldata plotIds) external {
        MarzResources _marz = MarzResources(marz);

        for (uint256 i = 0; i < plotIds.length; i++) {
            _marz.mine(plotIds[i]);
        }
    }
}
