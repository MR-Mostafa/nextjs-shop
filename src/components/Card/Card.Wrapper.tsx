import { forwardRef, ReactNode } from 'react';
import { BaseTwProps } from '@/types';
import { DivProps } from 'react-html-props';
import { twMerge } from 'tailwind-merge';

interface ICard extends BaseTwProps, DivProps {
	children: ReactNode;
}

export const CardWrapper = forwardRef<HTMLDivElement, ICard>((props, ref) => {
	const {
		children,
		className,
		fontWeight,
		fontSize,
		textAlign,
		textColor,
		padding,
		margin,
		width,
		height,
		rounded,
		backgroundColor,
		opacity,
		...rest
	} = props;

	const rootClass = twMerge(
		'Card-wrapper',
		fontWeight,
		fontSize,
		textAlign,
		textColor,
		padding,
		margin,
		width,
		height,
		rounded,
		backgroundColor,
		opacity,
		className
	);

	return (
		<div ref={ref} className={rootClass} {...rest}>
			{children}
		</div>
	);
});

CardWrapper.displayName = 'CardWrapper';

CardWrapper.defaultProps = {};
