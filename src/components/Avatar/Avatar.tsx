/* eslint-disable @next/next/no-img-element */
import cx from 'classnames';
import { ImgProps } from 'react-html-props';
import { forwardRef } from 'react';

interface IAvatar extends Omit<ImgProps, 'className'> {
	rootClassName?: string;
	imageClassName?: string;
}

export const Avatar = forwardRef<HTMLImageElement, IAvatar>((props, ref) => {
	const { rootClassName, imageClassName, alt = 'user avatar', ...rest } = props;

	const rootClass = cx('avatar-wrapper', rootClassName);
	const imageClass = cx('avatar-image', imageClassName);

	return (
		<span className={rootClass}>
			<img ref={ref} className={imageClass} alt={alt} {...rest} />
		</span>
	);
});

Avatar.displayName = 'Avatar';

Avatar.defaultProps = {
	src: '/avatar.jpg',
	width: 24,
	height: 24,
	rootClassName: 'w-[24px] h-[24px]',
};
