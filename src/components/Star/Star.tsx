import cx from 'classnames';
import { forwardRef } from 'react';
import { AiFillStar } from 'react-icons/ai';

interface IStar {
	rate: number | string;
	rootClassName?: string;
	rateClassName?: string;
	iconClassName?: string;
}

export const Star = forwardRef<HTMLSpanElement, IStar>((props, ref) => {
	const { rate, rootClassName, rateClassName, iconClassName, ...rest } = props;

	const rootClass = cx('Star-wrapper', rootClassName);
	const rateClass = cx('Star-rate', rateClassName);
	const iconClass = cx('Star-icon', iconClassName);

	return (
		<div className={rootClass} {...rest}>
			<AiFillStar className={iconClass} />
			<span ref={ref} className={rateClass}>
				{rate}
			</span>
		</div>
	);
});

Star.displayName = 'Star';

Star.defaultProps = {};
