import { forwardRef, ReactNode } from 'react';
import { BaseTwProps } from '@/types';
import { DivProps } from 'react-html-props';
import { twMerge } from 'tailwind-merge';

interface ICardBody extends BaseTwProps, DivProps {
	children: ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, ICardBody>((props, ref) => {
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

	const bodyClass = twMerge(
		'Card-body',
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
		<div ref={ref} className={bodyClass} {...rest}>
			{children}
		</div>
	);
});

CardBody.displayName = 'CardBody';

CardBody.defaultProps = {};
