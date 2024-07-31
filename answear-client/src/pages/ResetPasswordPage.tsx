import ResetPasswordForm from "components/form/ResetPasswordForm.tsx";
import { Attention } from "components/ui";
import { useSearchParams } from "react-router-dom";

import React from "react";

const ResetPasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const rawToken = searchParams.get("token");
    const rawEmail = searchParams.get("email");

    if (!rawToken || !rawEmail) {
        return <Attention>Неправильне посилання для скидання пароля.</Attention>;
    }

    const token = decodeURIComponent(rawToken.replace(/ /g, "+"));
    const email = decodeURIComponent(rawEmail);

    return (
        <div className="flex items-center justify-center min-h-screen py-2">
            {token && email && <ResetPasswordForm token={token} email={email} />}
        </div>
    );
};

export default ResetPasswordPage;
