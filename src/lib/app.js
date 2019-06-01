import React, { Component, Fragment } from 'react';
import { Box, render } from 'ink';

import Logo from './logo';
import stats from './stats';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            total: 0,
        };

        const { wallet } = props;
        const r = /(NQ[0-9]{2}\s(?:[a-zA-Z0-9]{4}\s?){8})/;
        const res = r.exec(wallet);

        if (!res || res.length === 0) {
            throw new Error("wallet address does not match pattern");
        }
    }

    componentDidMount() {
        this.fetch();
        this.timer = setInterval(this.fetch.bind(this), 30000);
    }

	componentWillUnmount() {
		clearInterval(this.timer);
    }
    
    async fetch() {
        const { wallet } = this.props;

        const { devices, total_hashrate } = await stats(wallet)
            .catch(console.error);

        this.setState({ devices: devices.filter((d) => d.online_status === 1), total: total_hashrate });
    }

    humanize(hashes) {
        let thresh = 1000;

        if (Math.abs(hashes) < thresh) {
            return hashes + ' H/s';
        }

        let units = ['kH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s', 'YH/s'];
        let u = -1;
        do {
            hashes /= thresh;
            ++u;
        } while (Math.abs(hashes) >= thresh && u < units.length - 1);

        return hashes.toFixed(1) + ' ' + units[u];
    }

    render() {
        const { wallet } = this.props;
        const { devices, total } = this.state;

        return (
            <Fragment>
                <Logo/>
                <Box width="100%">
                    <Box textWrap="truncate">Wallet: </Box>
                    <Box textWrap="truncate-middle">{wallet}</Box>
                </Box>
                <Box>Total hashrate: {this.humanize(total)}</Box>

                <Box width="100%">
                    <Box textWrap="truncate" width="25%">Device Name</Box>
                    <Box textWrap="truncate" width="25%">Hashrate</Box>
                    <Box textWrap="truncate" width="25%">Valid Shares</Box>
                    <Box textWrap="truncate" width="25%">Invalid Shares</Box>
                </Box>
                {
                    devices && devices.length > 0 &&
                    devices.map((d) => (
                        <Box width="100%">
                            <Box textWrap="truncate" width="25%">{d.name}</Box>
                            <Box textWrap="truncate" width="25%">{this.humanize(d.hashrate)}</Box>
                            <Box textWrap="truncate" width="25%">{d.validShares}</Box>
                            <Box textWrap="truncate" width="25%">{d.invalidShares}</Box>
                        </Box>
                    ))
                }
            </Fragment>
        );
    }
}

render(<App wallet={process.argv[2]}/>);