import BenefitsOfRegistrationCard from "components/cards/BenefitsOfRegistrationCard.tsx";
import SignUpForm from "components/form/SignUpForm.tsx";

import React from "react";

const SignUpPage: React.FC = () => {
    return (
        <div className="flex justify-center py-2">
            <BenefitsOfRegistrationCard />
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;
