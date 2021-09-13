import React, {useContext} from 'react';
import Web3Context from "../../contexts/Web3Context";
import {Box, Button, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import fireball from '../../assets/fireball.gif';

const useStyles = makeStyles((inputTheme: Theme) => createStyles({
  root: {
    padding: 12,
    backgroundColor: inputTheme.palette.background.default
  },
  walletButton: {
    flexGrow: 1,
    margin: 6,
    borderRadius: 12,
  },
  label: {
    fontFamily: "'Press Start 2P'",
  },
  title: {
    justifyContent: 'space-around',
    flex: 2,
    height: '100%'
  },
  wrapper: {
    justifyContent: 'center',
    flex: 1,
  },
}));

interface HeaderProps {
}

function walletButtonText(walletAddress: string|null|undefined): string {
  return walletAddress ? `${walletAddress.substr(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet';
}

export function Header ({  }: HeaderProps) {
  const classes = useStyles();
  const {selectWallet, disconnectWallet, address} = useContext(Web3Context);



  return (
    <header>
      <Box
        className={classes.root}
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
      >
        <div className={classes.wrapper} />
        <Box className={classes.title} display="flex" alignItems="center" flexDirection="row" >
          <img src={fireball} alt={'fireball'} style={{height: 64}}/>
          <Typography variant="h3" style={{ textAlign: 'center' }}>
          MARZ Resources
          </Typography>
          <img src={fireball} alt={'fireball'} style={{height: 64}}/>
        </Box>
        <Box className={classes.wrapper} display="flex" flexDirection="column" alignItems="flex-end" justifyContent="stretch">
          <Button
            variant="contained"
            color="secondary"
            classes={{root: classes.walletButton, label: classes.label}}
            onClick={() => { if (address) { disconnectWallet(); } else selectWallet(); }}
          >
            {walletButtonText(address)}
          </Button>
        </Box>
      </Box>
    </header>
  );
}
