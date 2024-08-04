import SignUpForm from "components/form/SignUpForm.tsx";

import React from "react";

const SignUpPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;
