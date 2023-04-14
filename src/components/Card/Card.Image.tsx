import { forwardRef, ReactNode } from 'react';
import { BaseTwProps } from '@/types';
import { DivProps } from 'react-html-props';
import { twMerge } from 'tailwind-merge';

interface ICardImage extends BaseTwProps, DivProps {
	children: ReactNode;
}

export const CardImage = forwardRef<HTMLDivElement, ICardImage>((props, ref) => {
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

	const imageClass = twMerge(
		'Card-image',
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
		<div ref={ref} className={imageClass} {...rest}>
			{children}
		</div>
	);
});

CardImage.displayName = 'CardImage';

CardImage.defaultProps = {};
