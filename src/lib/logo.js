import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

module.exports = () => (
	<Gradient colors={[
		{color: '#0e0e0e', pos: 0.0},
		{color: '#0e0e0e', pos: 0.5},
		{color: '#ffffff', pos: 0.53},
		{color: '#ffffff', pos: 1.0}
	]}>
		<BigText text="sushipool"/>
	</Gradient>
);