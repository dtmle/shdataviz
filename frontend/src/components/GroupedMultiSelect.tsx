import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { Devices } from '../types/Devices';

const GroupedMultiSelect = ({
    groups,
    selected,
    toggleSelected,
    toggleAggregated,
}: {
    groups: Devices;
    selected: Array<string>;
    toggleSelected: Function;
    toggleAggregated: Function;
}) => {
    const [allSelected, setAllSelected] = useState(true);

    useEffect(() => {
        let isAllSelected = true;

        Object.keys(groups).forEach((serial) => {
            if (!selected.includes(`aggregate_${serial}`)) {
                isAllSelected = false;
            }
        });

        setAllSelected(isAllSelected);
    }, [groups, selected]);

    return (
        <Fragment>
            <Box sx={{ my: 2 }}>
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <Typography fontWeight="bold">
                            Display all serials aggregated
                        </Typography>
                    }
                    checked={allSelected}
                    onChange={() => toggleAggregated('all')}
                />
            </Box>
            {Object.keys(groups).map((serial, i) => {
                return (
                    <FormControl key={serial} sx={{ m: 0, minWidth: 150 }}>
                        <FormLabel>
                            <Typography fontWeight="800">{serial}</Typography>
                        </FormLabel>
                        <FormControlLabel
                            control={<Checkbox />}
                            label={
                                <Typography fontWeight="bold">
                                    Display aggregate
                                </Typography>
                            }
                            checked={
                                selected.indexOf(`aggregate_${serial}`) > -1
                            }
                            onChange={() => toggleAggregated(serial)}
                        />
                        <FormGroup row={true} sx={{ m: 2 }}>
                            <Grid container spacing={1}>
                                {/* 
                                Todo: implement a select all
                                <Grid item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked
                                                inputProps={{
                                                    'aria-label': 'controlled',
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography fontWeight="bold">
                                                All
                                            </Typography>
                                        }
                                    />
                                </Grid> */}
                                {groups[serial].devices.map((deviceId) => (
                                    <Grid item xs={3} key={deviceId}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        selected.indexOf(
                                                            deviceId
                                                        ) > -1
                                                    }
                                                    inputProps={{
                                                        'aria-label':
                                                            'controlled',
                                                    }}
                                                    onChange={() =>
                                                        toggleSelected(
                                                            serial,
                                                            deviceId
                                                        )
                                                    }
                                                />
                                            }
                                            label={deviceId}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </FormGroup>
                    </FormControl>
                );
            })}
        </Fragment>
    );
};

export default GroupedMultiSelect;
