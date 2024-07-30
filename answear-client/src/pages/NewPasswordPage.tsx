import NewPasswordForm from "components/form/NewPasswordForm.tsx";

import React from "react";

const NewPasswordPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen py-2">
            <NewPasswordForm />
        </div>
    );
};

export default NewPasswordPage;
