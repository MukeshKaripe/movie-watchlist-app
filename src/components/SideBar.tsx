import React from 'react';
import { makeStyles } from '@mui/styles';
import { bgColors } from '../utils/colorTheme';

const useStyles = makeStyles({
    containersidebar: {
    padding:'20px',
    }
});

const SideBar: React.FC  = () => {
    const classes = useStyles();
    return (
        <div className={classes.containersidebar} >
            <div>
                <h1>Watchlists</h1>
                <div>
                    <input type='text' />
                </div>
                <hr />
                <h6>My Lists</h6>
            </div>
            <div>
                GUEST
            </div>
        </div>
    )
}
export default SideBar;