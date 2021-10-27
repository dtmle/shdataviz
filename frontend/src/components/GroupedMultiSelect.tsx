import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    ListSubheader,
    MenuItem,
    Select,
} from '@mui/material';
import { Devices } from '../types/Devices';

const GroupedMultiSelect = ({ groups }: { groups: Devices }) => {
    console.log(groups);
    return (
        <FormControl sx={{ m: 0, minWidth: 150 }}>
            <InputLabel htmlFor="grouped-select">Devices</InputLabel>
            <Select defaultValue="all" id="grouped-select" label="Grouping">
                <MenuItem value="all">
                    <em>All Devices</em>
                </MenuItem>
                {Object.keys(groups).map((id, i) => {
                    const devices = groups[id].devices.map(
                        (id: string, i: number) => (
                            <MenuItem key={id} value={id}>
                                <Checkbox checked={false} />
                                <ListItemText primary={id} />
                            </MenuItem>
                        )
                    );

                    devices.unshift(
                        <MenuItem key={id} value={`all_${id}`}>
                            <ListItemText primary={id} secondary="Select all" />
                        </MenuItem>
                    );

                    return devices;
                })}
            </Select>
        </FormControl>
    );
};

export default GroupedMultiSelect;
