import { Button } from '@/components';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { memo } from 'react';

interface CounterProps {
	value: number;
	setValue: (value: number) => void;
	maxValue: number;
	minValue?: number;
}

export const Counter = memo(({ value, setValue, maxValue, minValue = 0 }: CounterProps) => {
	return (
		<div className="inline-flex flex-row-reverse items-center justify-start">
			<Button
				type="button"
				variant="link"
				className="bg-#fff overflow-hidden rounded-full p-0"
				disabled={maxValue <= value}
				onClick={() => setValue(1)}
			>
				<BsPlusCircle className="text-[22px]" />
			</Button>

			<p className="px-2 text-lg font-bold">{value}</p>

			<Button
				type="button"
				variant="link"
				className="bg-#fff overflow-hidden rounded-full p-0"
				disabled={minValue >= value}
				onClick={() => setValue(-1)}
			>
				<BsDashCircle className="text-[22px]" />
			</Button>
		</div>
	);
});

Counter.displayName = 'Counter';
