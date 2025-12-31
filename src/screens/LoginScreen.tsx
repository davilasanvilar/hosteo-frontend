import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useValidator, notEmptyValidator } from '../hooks/useValidator';
import { ApiError, ErrorCode } from '../types/types';
import { PublicFormLayout } from '../components/organism/publicformlayout/PublicFormLayout';
import { Layout } from '../components/organism/layout/Layout';
import StatusCode from 'status-code-enum';
import { useMutation } from '@tanstack/react-query';
import { Button, Checkbox, TextInput } from '@mantine/core';
import { showNotificationError } from '../utils/notifUtils';

export function LoginScreen() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const [
        usernameDirty,
        usernameError,
        usernameMessage,
        usernameValidate,
        setDirtyUsername
    ] = useValidator(username, [notEmptyValidator]);
    const [
        passwordDirty,
        passwordError,
        passwordMessage,
        passwordValidate,
        setDirtyPassword
    ] = useValidator(password, [notEmptyValidator]);

    const login = async () => {
        const usernameValid = usernameValidate();
        const passwordValid = passwordValidate();

        if (usernameValid && passwordValid) {
            await auth.authenticate(username, password, rememberMe);
        } else {
            showNotificationError('There are errors in the form');
        }
    };

    const { mutate: onLogin, isPending: isLoading } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate('/');
        },
        onError: (e) => {
            if (e instanceof ApiError) {
                if (
                    e.statusCode === StatusCode.ClientErrorUnauthorized &&
                    e.code === ErrorCode.INVALID_CREDENTIALS
                ) {
                    showNotificationError('Wrong credentials');
                    return;
                }
            }
            if (e instanceof Error) {
                showNotificationError('Internal error');
                return;
            }
        }
    });

    const disabledButton = isLoading || usernameError || passwordError;

    return (
        <Layout isPublic>
            <PublicFormLayout onSubmit={() => onLogin()} title={'Sign in'}>
                <TextInput
                    label="Username"
                    variant="filled"
                    value={username}
                    onBlur={() => setDirtyUsername()}
                    onChange={(e) => setUsername(e.target.value)}
                    withAsterisk
                    error={
                        usernameError && usernameDirty
                            ? usernameMessage
                            : undefined
                    }
                />

                <TextInput
                    label="Password"
                    variant="filled"
                    type="password"
                    onBlur={() => setDirtyPassword()}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    withAsterisk
                    error={
                        passwordError && passwordDirty
                            ? passwordMessage
                            : undefined
                    }
                />

                <Checkbox
                    mt={'0.5rem'}
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Button
                    mt={'0.75rem'}
                    w={'100%'}
                    type="submit"
                    disabled={disabledButton}
                    loading={isLoading}
                >
                    {'Sign in'}
                </Button>
            </PublicFormLayout>
        </Layout>
    );
}
