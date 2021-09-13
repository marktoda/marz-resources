import React, {useState} from 'react';
import { Box, Button, createStyles, Dialog, makeStyles, TextField, Theme } from "@material-ui/core";
import { RESOURCES } from '../resources';

const useStyles = makeStyles((inputTheme: Theme) => createStyles({
  root: {
    borderRadius: 20,
    padding: '20px 40px 20px 40px',
    background: 'linear-gradient( -140deg, #2c2c2c 0%, #111 100%)',
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
    alignItems: 'center',
    color: 'white',
    textAlign: 'center'
  },
  claimButton: {
    flexGrow: 1,
    width: '100%',
    margin: 6,
    borderRadius: 12,
    backgroundColor: '#7AC143'
  },
  redeemButton: {
    flex: 1,
    flexGrow: 1,
    margin: 6,
    borderRadius: 12,
    backgroundColor: 'blue'
  },
  label: {
    fontFamily: "'Press Start 2P'",
    marginLeft: 6,
    marginRight: 6
  },
  redeemPrompt: {
    color: 'blue',
    margin: 6,
  },
  image: {
    margin: 10,
    imageRendering: 'pixelated', //crisp-edges doesn't work on chrome?
    border: 'solid 2px',
  },
  textField: {
    flex: 2,
    borderColor: 'white',
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
        borderColor: 'white',
      }
    }
  },
  resourceTileContainer: {
      display: 'flex',
      flexDirection: 'row',
  },
  resourceTile: {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 10px 10px 10px',
  }
}));

interface DigModalProps {
  /**
   * plotId
   */
  plotId: number;
  /**
   * Open
   */
  open: boolean;
  /**
   * Resources found at the plot
   */
  resources: number[];
  /**
   * callback to redeem plot as a lootholder
   */
  mineCallback: (plotId: number) => void;
  /**
  /**
   * callback to close dialog
   */
  closeCallback: () => void;
}

export function DigModal ({ resources, plotId, open, mineCallback, closeCallback }: DigModalProps) {
  const classes = useStyles();
  const resourceTiles = resources.map((resource) => 
      <div className={classes.resourceTile}>
        <img className={classes.image} src={`https://api.marzmining.xyz/images/${resource}.png`} width={100} height={100} alt={"Mars Resource Preview"} style={{borderColor: 'green'}}/>
      </div>
  );

  return (
    <Dialog
      open={open}
      onBackdropClick={() => closeCallback()}
      scroll={'body'}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      flexWrap="nowrap"
    >
      Set up mining rig on plot #{plotId}?

      <div className={classes.resourceTileContainer}>
        {resourceTiles}
      </div>

      <Button
        classes={{root: classes.claimButton, label: classes.label}}
        onClick={() => {
          mineCallback(plotId);
          closeCallback();
        }}
      >
        Mine!
      </Button>
    </Box>
    </Dialog>
  );
}
