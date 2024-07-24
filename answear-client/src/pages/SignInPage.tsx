import LoginForm from "components/form/LoginForm.tsx";

import React from "react";

const SignInPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <LoginForm />
    </div>
  );
};

export default SignInPage;
