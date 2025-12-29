import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useValidator, notEmptyValidator } from '../hooks/useValidator';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { useMutation } from '@tanstack/react-query';

export function ForgottenPasswordScreen() {
    const { forgottenPassword } = useApi();

    const [username, setUsername] = useState<string>('');

    const [
        usernameDirty,
        usernameError,
        usernameMessage,
        usernameValidate,
        setDirtyUsername
    ] = useValidator(username, [notEmptyValidator]);

    const sendCode = async () => {
        if (usernameValidate()) {
            await forgottenPassword(username);
        } else {
            // showToast('error', 'There are errors in the form');
        }
    };

    const { mutate: onSendCode, isPending: isLoading } = useMutation({
        mutationFn: sendCode,
        onSuccess: () => {
            // showToast('success', 'The code was succesfully sent!');
        },
        onError: () => {
            // showToast('error', 'There was an error sending the new code');
        }
    });

    const disabledButton = isLoading || usernameError;
    return (
        <Layout isPublic>
            <PublicFormLayout onSubmit={onSendCode} title={'Reset password'}>
                <input
                    placeholder="Username"
                    value={username}
                    onBlur={() => setDirtyUsername()}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && usernameDirty ? (
                    <span className="text-error-600">{usernameMessage}</span>
                ) : (
                    <></>
                )}
                <button type="submit" disabled={disabledButton}>
                    {isLoading ? 'Loading...' : 'Reset password'}
                </button>
            </PublicFormLayout>
        </Layout>
    );
}
