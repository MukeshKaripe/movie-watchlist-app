import React from 'react';

import { makeStyles } from '@mui/styles';
import { ThreeDots } from 'react-loader-spinner';
import { bgColors } from '../../src/utils/colorTheme';

// import { bgColors } from '../utils/bgColors';

const useStyles = makeStyles({
    appLoaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

interface ISpinner{
    color: string;
    height:string;
  }

const LoadingComponent: React.FC<ISpinner> = ({ color = bgColors.blue, height }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.appLoaderContainer}
      style={{
        height: height ? height : '100vh'
      }}
    >
      <ThreeDots height="60" width="60" radius="7" color={color} ariaLabel="three-dots-loading" visible={true} />
    </div>
  );
};

export default LoadingComponent;