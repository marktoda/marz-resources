import React from 'react';
import { Box, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import './plots.css';

const useStyles = makeStyles((inputTheme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    },
    box: {
        background: 'linear-gradient( -140deg, #2c2c2c 0%, #111 100%)',
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, &input::-webkit-inner-spin-button': {
            display: 'none',
        },
        borderRadius: 20,
        padding: '20px 40px 20px 40px',
        margin: '20px 40px 20px 40px',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
    },
    digButton: {
        flexGrow: 1,
        width: '100%',
        margin: 6,
        borderRadius: 12,
        color: 'black',
        backgroundColor: '#ffffff',
    },
    label: {
        fontFamily: "'Press Start 2P'",
        marginLeft: 6,
        marginRight: 6,
    },
    plotName: {
        fontSize: 'medium',
    },
    image: {
        margin: 10,
        imageRendering: 'pixelated',
        border: 'solid 2px',
    },
}));

interface PlotsProps {
  /**
   * Is this the principal call to action on the page?
   */
  plots?: number[];
  /**
   * Optional click handler
   */
  onDig?: (plotId: number) => void;
}

/**
 * Primary UI component for user interaction
 */
export const Plots = ({
  plots = [],
  onDig = (plotId: number) => {
    console.log('clicked');
  },
}: PlotsProps) => {
    const classes = useStyles();

    const plotComponents = plots.map((plot) => 
    <div key={plot}>
        <Box
            className={classes.box}>
            <img className={classes.image} src={`https://api.marz.farm/images/map_tile_${plot}.jpg`} width={100} height={100} alt={"token preview"}/>
            <div className={classes.plotName}>
                Marz Plot #{plot}
            </div>
            <Button classes={{root: classes.digButton, label: classes.label}} key={plot} onClick={() => onDig(plot)}>
                Dig
            </Button>

        </Box>
    </div>

    );

  return (
      <div className={classes.root}>
        {plotComponents}
      </div>
  );
};
