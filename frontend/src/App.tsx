import { Container, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import GroupedMultiSelect from './components/GroupedMultiSelect';
import { getDevices } from './services/Readings.service';
import { Devices } from './types/Devices';

const App = () => {
    const [devices, setDevices] = useState<Devices>({});

    useEffect(() => {
        const fetchDevices = async () => {
            const { data } = await getDevices();

            setDevices(data);
        };

        fetchDevices();
    }, []);

    return (
        <div className="App">
            <header>
                <Link href="#">SmartHome Devices</Link>
            </header>
            <Container maxWidth="xl" className="chart_container">
                <GroupedMultiSelect groups={devices} />
            </Container>
        </div>
    );
};

export default App;
