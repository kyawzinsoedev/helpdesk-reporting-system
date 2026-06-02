import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Login" />

            <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">HelpDesk System</h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to your account
                    </p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="space-y-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <div>
                                <Label htmlFor="email">Email Address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className="mt-2"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>

                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className="mt-2"
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" name="remember" />

                                    <Label htmlFor="remember">
                                        Remember me
                                    </Label>
                                </div>

                                {canResetPassword && (
                                    <TextLink href={request()}>
                                        Forgot Password?
                                    </TextLink>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Sign In
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

// Login.layout = {
//     title: 'Welcome from HelpDesk',
//     description: 'Enter your email and password below to log in',
// };
