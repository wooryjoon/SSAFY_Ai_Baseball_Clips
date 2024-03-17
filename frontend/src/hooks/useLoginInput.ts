import { LoginFormValues } from '@/pages/Login/type';
import { ChangeEvent, useCallback, useState } from 'react';

export default function useLoginInput(loginInfo: LoginFormValues) {
    const [loginFormValues, setLoginFormValues] = useState(loginInfo);

    const handleLoginFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLoginFormValues((prev: LoginFormValues) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);

    return { loginFormValues, handleLoginFormValues };
}
