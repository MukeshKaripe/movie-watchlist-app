import { makeStyles } from "@mui/styles";
import { bgColors } from '../utils/colorTheme';

export const useSharedStyles = makeStyles({
  reactionWrapper: {
    padding: '5px',
    display: 'flex',
    justifyContent: 'right',
  },
  customText: {
    textAlign: 'center',
    fontWeight: 'bold !important',
    fontSize: '30px  !important',
    color: 'red',
  },
  menuButton: {
    display: 'none !important',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  cardWrapper: {
    position: 'relative',
    maxHeight: '400px',
    height: '400px',
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  svgEmojiPosition: {
  },
  cardBlock: {
    padding: '10px'
  },
  actionsIcon: {
    position: 'absolute',
    top: '5px',
    left: '5px',
    cursor: 'pointer',
  },
  actionsIconWacthed: {
    position: 'absolute',
    top: '5px',
    right: '10px',
    cursor: 'pointer',
  },
  actionsIconWacthedSvg: {
    width: '25px',
    height: '25px'
  },
  actionsIconSub: {
    position: 'absolute',
    top: '7px',
    left: '7px',
    cursor: 'pointer'
  },
  posterTitle: {
    fontSize: '14px !important  '
  },
  posterYear: {
    fontSize: '12px',
    color: `${bgColors.gray3}`
  },
  imageMainWrapper: {
    height: '250px',
  },
  editIcon: {
    paddingLeft: '7px',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  textlorep: {
    color: `${bgColors.gray1}`,
    fontWeight: 'normal !important',
    fontSize: '13px !important',
    marginBottom: '2rem !important'
  },
  createAdd:{
    width: '100%',
    padding:'10px',
    backgroundColor:`${bgColors.blue} !important `,
    margin: '1rem 0px !important',
    color:`${bgColors.white} !important `,
  }
});