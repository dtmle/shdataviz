import { Button, Container, Drawer } from '@mui/material';
import { Fragment, FunctionComponent, useState } from 'react';
import { Devices } from '../types/Devices';
import GroupedMultiSelect from './GroupedMultiSelect';

const FilterDrawer: FunctionComponent = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Fragment>
            <Button onClick={toggleDrawer}>Filter</Button>
            <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer}>
                {children}
            </Drawer>
        </Fragment>
    );
};

export default FilterDrawer;
