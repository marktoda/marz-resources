import React from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import fireball from '../assets/fireball.gif';
import twitter from '../assets/twitter.png';
import discord from '../assets/discord.png';
import opensea from '../assets/opensea.png';
import etherscan from '../assets/etherscan.png';

const useStyles = makeStyles((inputTheme: Theme) => createStyles({
  root: {
    padding: 12,
    backgroundColor: inputTheme.palette.background.default,
    alignItems: 'center'
  },
  fireball: {
    height: 16,
    marginLeft: 3,
    marginRight: 3,
  },
  icon: {
    height: 36,
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 3,
  }
}));

interface FooterProps {}

export function Footer ({  }: FooterProps) {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div>
          <a href="https://twitter.com/marzplots" target="_blank">
              <img className={classes.icon} src={twitter} alt={'twitter'}/>
          </a>
          <a href="https://discord.gg/GDytXJpg" target="_blank">
              <img className={classes.icon} src={discord} alt={'discord'}/>
          </a>
          <a href="https://etherscan.io/address/0xd0ba8b19b0f5e25c11ed233302e75794c9d3142b" target="_blank">
              <img className={classes.icon} src={etherscan} alt={'etherscan'}/>
          </a>
          <a href="https://opensea.io/collection/plots-on-marz" target="_blank">
              <img className={classes.icon} src={opensea} alt={'opensea'}/>
          </a>
      </div>

      <div>
          <img className={classes.fireball} src={fireball} alt={'fireball'} />
          <a href="https://prl.one" rel="noreferrer">
              prl.one
          </a>
      </div>
    </footer>
  );
}
