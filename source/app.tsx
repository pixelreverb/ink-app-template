import React, {PropsWithChildren, useState} from 'react';
import {Box, Text, useApp} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import SelectInput from 'ink-select-input';
import {Item} from '../node_modules/ink-select-input/build/SelectInput.js';

const navItems: Item<string>[] = [
	{label: 'Pane 1', value: 'pane_one'},
	{label: 'Pane 2', value: 'pane_two'},
	{label: 'Exit', value: 'exit'},
];

export default function App() {
	const [currentNavItem, setCUrrentNavItem] = useState(navItems[0]);
	const {exit} = useApp();

	const onNavItemSlected = (item: Item<string>) => {
		if (item.value === 'exit') {
			exit();
		} else {
			setCUrrentNavItem(item);
		}
	};

	return (
		<MainLayout>
			<SideBar navItems={navItems} onSelect={onNavItemSlected} />
			{currentNavItem?.value === 'pane_one' && <ContentPaneOne />}
			{currentNavItem?.value === 'pane_two' && <ContentPaneTwo />}
		</MainLayout>
	);
}

function MainLayout({children}: PropsWithChildren) {
	return <Box>{children}</Box>;
}

type SideBarProps = {
	navItems: Array<Item<string>>;
	onSelect: (item: Item<string>) => void;
};

function SideBar({navItems, onSelect}: SideBarProps) {
	return (
		<Box
			borderStyle={'single'}
			height={'100%'}
			width={40}
			paddingTop={1}
			paddingBottom={1}
			paddingLeft={2}
			paddingRight={2}
		>
			<SelectInput items={navItems} onSelect={onSelect} />
		</Box>
	);
}

function ContentPaneOne() {
	return (
		<Box
			borderStyle={'single'}
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			paddingLeft={4}
			paddingRight={4}
		>
			<Gradient name={'retro'}>
				<BigText text={'Pane 1'} />
			</Gradient>
			<Text>Im' the content area one</Text>
		</Box>
	);
}

function ContentPaneTwo() {
	return (
		<Box
			borderStyle={'single'}
			height={'100%'}
			width={'100%'}
			flexDirection={'column'}
			paddingLeft={4}
			paddingRight={4}
		>
			<Gradient name={'rainbow'}>
				<BigText text={'Pane 2'} />
			</Gradient>
			<Text>Im' the content area two</Text>
		</Box>
	);
}
