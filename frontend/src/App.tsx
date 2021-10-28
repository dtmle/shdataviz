import { Container, Link, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import FilterDrawer from './components/FilterDrawer';
import GroupedMultiSelect from './components/GroupedMultiSelect';
import { getDevices } from './services/Readings.service';
import { Devices } from './types/Devices';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DatePicker } from '@mui/lab';
import { pull } from 'lodash';

const App = () => {
    const [fetchedDevices, setFetchedDevices] = useState(false);
    const [devices, setDevices] = useState<Devices>({});
    const [date, setDate] = useState<Date | null>(new Date('2019-04-29'));
    const [selected, setSelected] = useState<Array<string>>([]);

    useEffect(() => {
        const fetchDevices = async () => {
            const { data }: { data: Devices } = await getDevices();

            setDevices(data);

            const selectedDevicesList: Array<string> = [];

            for (const [serial, value] of Object.entries(data)) {
                selectedDevicesList.push(`aggregate_${serial}`);
            }

            setSelected(selectedDevicesList);

            setFetchedDevices(true);
        };

        if (!fetchedDevices) {
            fetchDevices();
        }
    }, [fetchedDevices, selected, date]);

    const toggleSelected = (serial: string, deviceId: string) => {
        const copy: Array<string> = [...selected].filter((val) => {
            return !val.includes('aggregate');
        });

        const deviceIndex = copy.indexOf(deviceId);

        if (deviceIndex > -1) {
            copy.splice(deviceIndex, 1);
        } else {
            copy.push(deviceId);
        }

        setSelected(copy);

        return copy;
    };

    const toggleAggregated = (serial: string) => {
        const copy: Array<string> = [...selected];

        if (serial === 'all') {
            let isAllSelected = true;
            let aggregateList: Array<string> = [];

            Object.keys(devices).forEach((serial) => {
                if (!selected.includes(`aggregate_${serial}`)) {
                    isAllSelected = false;
                }

                aggregateList.push(`aggregate_${serial}`);
            });

            if (isAllSelected) {
                setSelected([]);
            } else {
                setSelected(aggregateList);
            }

            return;
        } else {
            const aggregateIndex = copy.indexOf(`aggregate_${serial}`);

            if (aggregateIndex > -1) {
                copy.splice(aggregateIndex, 1);
            } else {
                copy.push(`aggregate_${serial}`);
            }

            pull(copy, ...devices[serial].devices);

            setSelected(copy);

            return copy;
        }
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <div className="App">
                <header>
                    <Link href="#">SmartHome Devices</Link>
                </header>
                <Container maxWidth="xl" className="chart_container">
                    <FilterDrawer>
                        <Container sx={{ m: 5 }}>
                            {/*
                                todo: restrict to only between first and last entry date.
                             */}
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={(newValue: Date | null) => {
                                    setDate(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                            <GroupedMultiSelect
                                groups={devices}
                                selected={selected}
                                toggleSelected={toggleSelected}
                                toggleAggregated={toggleAggregated}
                            />
                        </Container>
                    </FilterDrawer>
                </Container>
            </div>
        </LocalizationProvider>
    );
};

export default App;
