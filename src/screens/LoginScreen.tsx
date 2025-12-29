import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useValidator, notEmptyValidator } from '../hooks/useValidator';
import { ApiError, ErrorCode } from '../types/types';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { IoMdClose } from 'react-icons/io';
import StatusCode from 'status-code-enum';
import { useApi } from '../hooks/useApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function LoginScreen() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { sendValidationCode } = useApi();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [notValidatedAccount, setNotValidatedAccount] =
        useState<boolean>(false);

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

    const resendCode = async () => {
        await sendValidationCode(username);
    };

    const { mutate: onResendCode } = useMutation({
        mutationFn: resendCode,
        onSuccess: () => {
            // showToast('success', 'The code was succesfully sent!');
        },
        onError: (e) => {
            if (e instanceof ApiError) {
                if (e.statusCode === StatusCode.ClientErrorConflict) {
                    // showToast('error', 'The account is already validated');
                    return;
                }
            }
            if (e instanceof Error) {
                // showToast('error', 'Internal error');
                return;
            }
        }
    });

    const login = async () => {
        const usernameValid = usernameValidate();
        const passwordValid = passwordValidate();

        if (usernameValid && passwordValid) {
            await auth.authenticate(username, password, rememberMe);
        } else {
            // showToast('error', 'There are errors in the form');
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
                    e.statusCode === StatusCode.ClientErrorForbidden &&
                    e.code === ErrorCode.NOT_VALIDATED_ACCOUNT
                ) {
                    setNotValidatedAccount(true);
                    return;
                }
                if (
                    e.statusCode === StatusCode.ClientErrorUnauthorized &&
                    e.code === ErrorCode.INVALID_CREDENTIALS
                ) {
                    // showToast('error', 'Wrong credentials');
                    return;
                }
            }
            if (e instanceof Error) {
                // showToast('error', 'Internal error');
                return;
            }
        }
    });

    const disabledButton = isLoading || usernameError || passwordError;

    return (
        <Layout isPublic>
            <PublicFormLayout onSubmit={() => onLogin()} title={'Sign in'}>
                {!notValidatedAccount ? (
                    <>
                        <input
                            placeholder="Username"
                            value={username}
                            onBlur={() => setDirtyUsername()}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameDirty && usernameError ? (
                            <span className="text-error-600">
                                {usernameMessage}
                            </span>
                        ) : (
                            <></>
                        )}

                        <input
                            placeholder="Password"
                            type="password"
                            onBlur={() => setDirtyPassword()}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordDirty && passwordError ? (
                            <span className="text-error-600">
                                {passwordMessage}
                            </span>
                        ) : (
                            <></>
                        )}
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />
                            {'Remember me'}
                        </label>
                        <button type="submit" disabled={disabledButton}>
                            {isLoading ? 'Loading...' : 'Sign in'}
                        </button>
                        <a
                            className="mt-2"
                            onClick={() => navigate('/recover-password')}
                        >
                            {'I have forgotten my password'}
                        </a>
                        <span className="flex mt-5">
                            <span>{`New here? ${'\u00A0'}`}</span>
                            <a onClick={() => navigate('/register')}>
                                {'Sign up'}
                            </a>
                        </span>
                    </>
                ) : (
                    <>
                        <div className="flex gap-2">
                            <IoMdClose className="text-3xl text-error" />
                            <span className="mb-4">
                                {'Your account has not been validated'}
                            </span>
                        </div>
                        <span className="mb-4">{`In order to validate the account you should follow the instructions we sent you via email`}</span>
                        <span>
                            <span>{`You can't see the email? Try to `}</span>
                            <a
                                className="text-blue-500"
                                onClick={() => onResendCode()}
                            >
                                {'send another code'}
                            </a>
                        </span>
                    </>
                )}
            </PublicFormLayout>
        </Layout>
    );
}
