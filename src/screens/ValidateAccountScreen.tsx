import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { ApiError, ErrorCode } from '../types/types';
import StatusCode from 'status-code-enum';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { BiCheck } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { useMutation } from '@tanstack/react-query';

export function ValidateAccountScreen() {
    const navigate = useNavigate();
    const { validateAccount, sendValidationCode } = useApi();
    const [step, setStep] = useState<number>(1);
    const { code, username } = useParams();
    const [codeError, setCodeError] = useState<string>('');

    //Avoid problems of double validation (strict mode)
    const alreadyValidatedRef = useRef(false);

    useEffect(() => {
        if (alreadyValidatedRef.current) {
            return;
        }
        onValidateAccount();
        alreadyValidatedRef.current = true;
    }, []);

    const validate = async () => {
        await validateAccount(username!, code!);
    };

    const { mutate: onValidateAccount, isPending: isLoading } = useMutation({
        mutationFn: validate,
        onSettled: () => {
            setStep(2);
        },
        onError: (e) => {
            if (e instanceof ApiError) {
                if (e.statusCode === StatusCode.ClientErrorConflict) {
                    setCodeError('The code has already been used');
                    return;
                }
                if (e.statusCode === StatusCode.ClientErrorGone) {
                    setCodeError('The code has expired');
                    return;
                }
                if (
                    e.statusCode === StatusCode.ClientErrorUnauthorized &&
                    e.code === ErrorCode.INCORRECT_VALIDATION_CODE
                ) {
                    setCodeError('The code is invalid');
                    return;
                }
            }
            setCodeError('An internal error occurred');
        }
    });

    const sendCode = async () => {
        await sendValidationCode(username!);
    };

    const { mutate: onResendCode } = useMutation({
        mutationFn: sendCode,
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
            // showToast('error', 'There was an error sending the new code');
        }
    });

    return (
        <Layout isPublic>
            <PublicFormLayout title={'Email validation'}>
                {step === 1 ? (
                    <div className="ml-auto mr-auto mt-2 flex flex-col items-center gap-4">
                        <span className="mb-4">{'Validating...'}</span>
                    </div>
                ) : (
                    <>
                        {codeError ? (
                            <>
                                <div className="flex gap-2">
                                    <IoMdClose className="text-3xl text-error" />
                                    <span className="mb-4">{codeError}</span>
                                </div>
                                <span className="flex">
                                    {isLoading ? (
                                        <span>{'Sending...'}</span>
                                    ) : (
                                        <>
                                            <span>{`Try to`}</span>
                                            <a
                                                className="text-blue-500"
                                                onClick={() => onResendCode()}
                                            >
                                                {' send another code'}
                                            </a>
                                        </>
                                    )}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <BiCheck className="text-3xl text-success" />
                                    <span className="mb-4">
                                        {'Your email has been validated'}
                                    </span>
                                </div>
                                <span className="flex">
                                    <span>{`Now you can `}</span>
                                    <a
                                        className="text-blue-500"
                                        onClick={() => navigate('/login')}
                                    >
                                        {' sign in'}
                                    </a>
                                </span>
                            </>
                        )}
                    </>
                )}
            </PublicFormLayout>
        </Layout>
    );
}
