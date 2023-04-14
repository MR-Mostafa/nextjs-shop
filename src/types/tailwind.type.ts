import type {
	TPseudoClassVariants,
	TFontWeight,
	TFontSize,
	TTextAlign,
	TTextColor,
	TPadding,
	TMargin,
	TWidth,
	TMinWidth,
	TMaxWidth,
	THeight,
	TMinHeight,
	TMaxHeight,
	TBorderRadius,
	TBackgroundColor,
	TOpacity,
	TTextOpacity,
} from 'tailwindcss-classnames';

export type TwType<T extends string> = T | `!${T}` | `${TPseudoClassVariants}${T}` | `${TPseudoClassVariants}!${T}`;

type Width = TWidth & TMinWidth & TMaxWidth;
type Height = THeight & TMinHeight & TMaxHeight;
type Opacity = TOpacity & TTextOpacity;

export interface BaseTwProps {
	fontWeight?: TwType<TFontWeight>;
	fontSize?: TwType<TFontSize>;
	textAlign?: TwType<TTextAlign>;
	textColor?: TwType<TTextColor>;
	padding?: TwType<TPadding> | TwType<TPadding>[];
	margin?: TwType<TMargin> | TwType<TMargin>[];
	width?: TwType<Width> | TwType<Width>[];
	height?: TwType<Height> | TwType<Height>[];
	rounded?: TwType<TBorderRadius>;
	backgroundColor?: TwType<TBackgroundColor>;
	opacity?: TwType<Opacity> | TwType<Opacity>[];
}
