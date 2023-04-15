import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { postFetcher } from '@/services';
import { SuccessAuth } from '@/types';
import { AxiosError } from 'axios';

const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/login',
		signOut: '/',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {
				username: { type: 'text' },
				password: { type: 'text' },
			},
			async authorize(credentials, req) {
				const payload = {
					username: credentials?.username || '',
					password: credentials?.password || '',
				};

				try {
					const res = await postFetcher<SuccessAuth>('/auth/login', payload);

					return {
						...res.data,
						name: `${res.data.firstName} ${res.data.lastName}`,
						id: res.data.id.toString(),
					};
				} catch (error: any) {
					throw new Error(error instanceof AxiosError ? error.response?.data?.message : error);
				}
			},
		}),
	],
	secret: process.env.JWT_SECRET,
	callbacks: {},
	debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
