import {useState} from "react";
import {IItem} from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [inputValue, setInputValue] = useState('');
	
	return (
		<ul>
			{props.initialData
				.sort((first, second) => {
					return props.sorting === 'ASC'
						? first.id - second.id
						: second.id - first.id;
				})
				.map((item: IItem) => {
					if (item.id === currentIndex) {
						return (
							<input
								value={inputValue}
								key={item.id}
								onChange={(event) => {
									setInputValue(event.target.value);
								}}
								onKeyDown={(event) => {
									switch (event.key) {
										case 'Enter':
											item.name = inputValue;
											setCurrentIndex(-1);
											break;
										case 'Escape':
											setCurrentIndex(-1);
											break;
									}
								}}
							/>
						);
					} else {
						return (
							<li
								key={item.id}
								onClick={(_event) => {
									setCurrentIndex(item.id);
									setInputValue(item.name);
								}}
							>
								{item.name}
							</li>
						);
					}
				})}
		</ul>
	);
}
