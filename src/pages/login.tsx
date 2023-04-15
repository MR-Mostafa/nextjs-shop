import MainLayout from '@/layouts/MainLayout';
import { LoginForm } from '@/features';
import { getCsrfToken, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

const LoginPage = () => {
	return (
		<MainLayout shouldShowHeader={false}>
			<div className="flex min-h-screen flex-col place-items-center items-center justify-center py-6">
				<h1 className="w-full pb-1 text-center text-2xl font-bold">Login To Site</h1>
				<p className="w-full pb-2 text-center text-base text-[#131822B2]">Please enter your username and password</p>

				<LoginForm />
			</div>
		</MainLayout>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession({ req: context.req });

	// The user is logged in
	if (session) {
		return {
			redirect: {
				destination: '/',
				permananet: false,
			},
		};
	}

	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}

export default LoginPage;
