import cx from 'classnames';
import { BaseTwProps } from '@/types';
import { ReactNode, forwardRef, ElementType } from 'react';
import { ButtonProps } from 'react-html-props';
import { twMerge } from 'tailwind-merge';
import { ImSpinner8 } from 'react-icons/im';

interface IButton extends BaseTwProps, ButtonProps {
	as?: 'a' | 'button';
	children: ReactNode;
	variant?: 'primary';
	isLoading?: boolean;
	href?: string;
}

export const Button = forwardRef<HTMLButtonElement, IButton>((props, ref) => {
	const {
		as,
		children,
		variant,
		isLoading,
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

	const Component = (as === 'a' && rest.href ? 'a' : 'button') as ElementType;

	const defaultClass = cx('btn', {
		'btn-primary': variant === 'primary',
		'btn-disable': rest.disabled,
		'btn-loading': isLoading,
	});

	const classNames = twMerge(
		defaultClass,
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
		<Component ref={ref} className={classNames} {...rest}>
			{isLoading && <ImSpinner8 strokeWidth="1px" fill="#fff" className="spinner" />}

			{children}
		</Component>
	);
});

Button.displayName = 'Button';

Button.defaultProps = {
	as: 'button',
};
