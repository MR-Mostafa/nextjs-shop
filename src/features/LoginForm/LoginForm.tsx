/* eslint-disable github/no-then */
import { TextField, Button } from '@/components';
import { _UsernameRegex } from '@/constants';
import { useEffect, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export const LoginForm = () => {
	const router = useRouter();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [hasError, setHasError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleLogin = () => {
		if (loading) return;

		setLoading(true);
		setHasError(false);

		return signIn('credentials', {
			redirect: false,
			username,
			password,
		})
			.then((res) => {
				setHasError(!!res?.error);

				if (res?.ok) {
					router.push('/');
				}

				return res;
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		return () => {
			setUsername('');
			setPassword('');
			setShowPassword(false);
			setHasError(false);
			setLoading(false);
		};
	}, []);

	return (
		<>
			<TextField
				type="text"
				name="username"
				id="username"
				label="username"
				placeholder="Enter your Username"
				rootClassName="w-full"
				pattern={_UsernameRegex.toString().slice(1, -2)}
				autoComplete="off"
				inputMode="email"
				value={username}
				onChange={(e) => {
					const value = e.target.value;
					setUsername(value);
				}}
				tabIndex={1}
				autoFocus
				required
			/>

			<TextField
				type={showPassword ? 'text' : 'password'}
				name="password"
				id="password"
				label="Password"
				placeholder="Enter your Password"
				rootClassName="w-full"
				autoComplete="off"
				inputMode="text"
				value={password}
				onChange={(e) => {
					const value = e.target.value;
					setPassword(value);
				}}
				rightIcon={<Button onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <BiShow /> : <BiHide />}</Button>}
				tabIndex={2}
				required
			/>
			<Button variant="link" className="self-end bg-transparent" tabIndex={3}>
				Forgot password?
			</Button>

			{hasError && <p className="pb-2 font-bold text-rose-600">Invalid username or password</p>}

			<Button
				variant="primary"
				className="mt-3 block w-full text-center"
				tabIndex={4}
				onClick={handleLogin}
				isLoading={loading}
				// disabled={username.length === 0 || !_UsernameRegex.test(username) || password.length === 0}
			>
				Log in
			</Button>
		</>
	);
};
