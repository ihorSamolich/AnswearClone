import React, { useState } from 'react';
import { Input, InputPassword, Label, Link } from "components/ui";
import { IconBrandGoogle, IconEye } from '@tabler/icons-react';
import Button from "components/ui/Button.tsx";

const SignInPage: React.FC = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="w-full max-w-xl p-8 space-y-8">
                <h2 className="text-2xl font-bold">Я маю Акаунт</h2>
                {showForgotPassword ? (
                    <form className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
                        <h3 className="text-base font-bold">Не пам'ятаю пароль</h3>
                        <p className="text-xs text-[#6b6b6b]">Введи e-mail, вказаний Тобою під час реєстрації, і ми відразу ж надішлемо Тобі інструкцію, як змінити пароль.</p>
                        <div>
                            <Label>Введіть коректний адрес електронної пошти*</Label>
                            <Input />
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <Button size="full" className="text-white">Вислати</Button>
                        </div>
                    </form>
                ) : (
                    <form className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
                        <div>
                            <div>
                                <Label>електронна пошта*</Label>
                                <Input />
                            </div>
                            <div>
                                <Label>Пароль*</Label>
                                <InputPassword icon={<IconEye />} />
                            </div>
                            <div className="flex justify-end text-xs">
                                <Link variant="underline" size="span" onClick={() => setShowForgotPassword(true)}>
                                    Забули пароль?
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button size="full" className="text-white">Увійдіть</Button>
                        </div>
                    </form>
                )}
                <div className="flex items-center justify-center mt-6 space-x-4">
                    <p className="text-sm font-bold">Або продовжити за допомогою</p>
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <Link variant="icon" size="iconlg">
                        <img className="w-6 h-6" src="/assets/googleFlag.png"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
