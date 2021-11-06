import {Box, createStyles, Dialog, makeStyles, Theme} from "@material-ui/core";
import Loader from 'react-loader-spinner';

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
  label: {
    fontFamily: "'Press Start 2P'",
    marginLeft: 6,
    marginRight: 6
  },
  openseaLink: {
    color: 'blue',
    margin: 6,
  },
  image: {
    margin: 10,
    imageRendering: 'pixelated',
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
    },
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

export interface SuccessModalProps {
  /**
   * plotId
   */
  plotId: number;
  /**
   * plotId
   */
  resources: number[];
  /**
   * Open
   */
  open: boolean;
  /**
   * Open
   */
  loading: boolean;
  /**
   * callback to close dialog
   */
  closeCallback: () => void;
}

export function SuccessModal ({ plotId, resources, open, loading, closeCallback }: SuccessModalProps) {
  const classes = useStyles();

  const resourceTiles = resources.map((resource, i) => 
  <div key={`${resource}-${i}`} className={classes.resourceTile}>
      <a href={`https://opensea.io/assets/0x75376c8b1afc6a6d7cd18617cf2ada431d50b3fa/${resource}`}>
          <img className={classes.image} src={`https://api.marzmining.xyz/images/${resource}.jpg`} width={100} height={100} alt={"Mars Resource Preview"} style={{borderColor: 'green'}}/>
      </a>
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

    {loading ? 
    <Box
        className={classes.root}
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
    >
        Waiting for transaction confirmation...
        <br/>
        <Loader
            type="Rings"
            color="#00BFFF"
        />
    </Box>
        :
        <Box
            className={classes.root}
            display="flex"
            flexDirection="column"
            flexWrap="nowrap"
        >
            Successfully started mining #{plotId}!

            <div className={classes.resourceTileContainer}>
                {resourceTiles}
            </div>
        </Box>
    }
</Dialog>
  );
}
