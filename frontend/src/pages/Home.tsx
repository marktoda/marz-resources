import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Divider, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import {QueryResult, useQuery} from "@apollo/client";
import Web3Context from '../contexts/Web3Context';
import { GET_TOKENS, Tokens } from "../queries/token";
import { Plots } from '../components/Plots/Plots';
import { getResources, mine } from '../transactions';
import { DigModal } from '../components/DigModal';
import { SuccessModal } from '../components/SuccessModal';

const useStyles = makeStyles((inputTheme: Theme) => createStyles({
  root: {
    paddingRight: 120,
    paddingLeft: 120,
    paddingBottom: 24,
    backgroundColor: inputTheme.palette.background.default
    // background: 'linear-gradient( -140deg, #2c2c2c 0%, #111 100%)',
    // '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    //   display: 'none',
    // },
  },
  textBody: {
    textAlign: 'left',
    lineHeight: 1.6,
  },
  centeredText: {
    textAlign: 'left',
    lineHeight: 1.6,
  },
  leftText: {
    textAlign: 'left',
    lineHeight: 1.6,
    display: 'flex',
    flex: 1
  },
  filler: {
    flex: 1
  },
  subtitle: {
    display: 'flex',
    alignSelf: 'stretch',
  }
}));

function Home() {
  const classes = useStyles();
  const [tokens, setTokens] = useState<number[]>([]);
  const { address, signer } = useContext(Web3Context);
  const [txProcessing, setTxProcessing] = useState<boolean>(false);
  const [digPlot, setDigPlot] = useState<number>(-1);
  const [resources, setResources] = useState<number[]>([]);
  const [successResources, setSuccessResources] = useState<number[]>([]);

  const {
    loading,
    error,
    data,
  }: QueryResult<Tokens> = useQuery<Tokens>(GET_TOKENS, { variables: { address }});

  const digCallback = useCallback((plotId) => {
      if (!signer) {
          alert('Connect Wallet');
          return;
      }

      setDigPlot(plotId);
      getResources(plotId, signer).then((resources) => {
          setResources(resources.map((r) => parseInt(r.toString())));
      });
  }, [signer]);

  const mineCallback = useCallback((plotId) => {
      if (!signer) {
          alert('Connect Wallet');
          return;
      }

      setTxProcessing(true);
      setSuccessResources(resources);
      mine(plotId, signer).then((output) => {
          if (output) {
            setResources([]);
            setTxProcessing(false);
          }
      }, (error) => {
          console.log(error);
      });
  }, [signer, resources]);

  useEffect(() => {
    const ownedTokenIds = data?.tokens?.map((token) => parseInt(token.id, 16));
    if(ownedTokenIds && ownedTokenIds.length) {
      ownedTokenIds.sort((a, b) => a - b);
      setTokens(ownedTokenIds);
    }
  }, [data])

    return useMemo(() =>
    <div className={classes.root}>
        <DigModal
            plotId={digPlot}
            open={resources.length > 0}
            resources={resources}
            mineCallback={mineCallback}
            closeCallback={() => setResources([])}
        />
        <SuccessModal
            plotId={digPlot}
            open={successResources.length > 0}
            loading={txProcessing}
            resources={successResources}
            closeCallback={() => setSuccessResources([])}
        />

        <Typography variant="h5" style={{ textAlign: 'center' }}>
            Plots
            <Plots plots={tokens} onDig={digCallback}></Plots>
        </Typography>

        <br/><br/>
        <Divider/>
        <br/><br/>

        <Typography variant="h5" style={{ textAlign: 'center' }}>
            Resources
        </Typography>
    </div>
    , [tokens, resources, successResources, txProcessing, classes.root, digCallback, mineCallback]);
}

export default Home;
