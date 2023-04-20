import cx from 'classnames';
import { ReactNode, forwardRef, useId } from 'react';
import { InputProps } from 'react-html-props';
import { CgAsterisk } from 'react-icons/cg';

interface ITextField extends Omit<InputProps, 'className'> {
	label?: string;
	hasError?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	rootClassName?: string;
	inputClassName?: string;
	labelClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, ITextField>((props, ref) => {
	const { label, hasError, leftIcon, rightIcon, rootClassName, inputClassName, labelClassName, ...rest } = props;

	const rootClass = cx('TextField-wrapper', rootClassName, {
		'TextField-error': hasError,
	});

	const inputClass = cx('TextField-input', inputClassName, {
		'TextField-input--left-icon': !!leftIcon,
		'TextField-input--right-icon': !!rightIcon,
	});

	const labelClass = cx('TextField-label', labelClassName);

	return (
		<div className={rootClass}>
			{label && (
				<label htmlFor={rest.id} className={labelClass}>
					{label} {rest.required && <CgAsterisk className="asterisk-icon" />}
				</label>
			)}

			<div className="relative">
				{leftIcon && <div className="TextField-icon TextField-icon--left">{leftIcon}</div>}

				<input ref={ref} className={inputClass} date-invalid={hasError ? `${hasError}` : undefined} {...rest} />

				{rightIcon && <div className="TextField-icon TextField-icon--right">{rightIcon}</div>}
			</div>
		</div>
	);
});

TextField.displayName = 'TextField';

TextField.defaultProps = {
	type: 'text',
};
