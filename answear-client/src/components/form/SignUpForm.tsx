import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, Input, InputPassword, Label } from "components/ui";
import CheckBox from "components/ui/CheckBox.tsx";
import Link from "components/ui/Link.tsx";
import { IErrorResponse } from "interfaces/index.ts";
import { UserRegisterSchema, UserRegisterSchemaType } from "interfaces/zod/user.ts";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSignInMutation } from "services/user.ts";
import { setLocalStorageItem } from "utils/localStorageUtils.ts";

import React, { useState } from "react";

const SignUpForm: React.FC = () => {
    const [signIn, { isLoading: signInIsLoading }] = useSignInMutation();
    const [showMore, setShowMore] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterSchemaType>({ resolver: zodResolver(UserRegisterSchema) });

    const onSubmit = async (data: UserRegisterSchemaType) => {
        try {
            // const response = await signIn(data).unwrap();
            // setLocalStorageItem("authToken", response.token);
            toast("Wow so easy!");
        } catch (error) {
            const errorResponse = error as IErrorResponse;
            toast(errorResponse.data.message);
        }
    };

    return (
        <div className="w-full max-w-xl p-8 space-y-8">
            <h2 className="text-2xl font-bold">Я не маю Акаунту</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 bg-[#f4f4f4] p-8">
                <div>
                    <div className="mb-4">
                        <Label htmlFor="email">Вкажіть свою електронну пошту*</Label>
                        <Input type="email" id="email" {...register("email")} className="w-full mt-2" />
                        {errors.email && <Attention>{errors.email.message}</Attention>}
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">Введіть пароль*</Label>
                        <InputPassword id="password" {...register("password")} icon={<IconEye />} className="w-full mt-2" />
                        {errors.password && <Attention>{errors.password.message}</Attention>}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center">
                        <CheckBox id="terms" {...register("terms")} className="mt-1 mr-2" />
                        <Label htmlFor="terms" className="flex-1">
                            Погоджуюсь з{" "}
                            <Link className="text-xs text-[#585858]" variant="underline" size="span" href="#">
                                Правилами магазину
                            </Link>
                            *
                        </Label>
                    </div>
                    {errors.terms && <Attention>{errors.terms.message}</Attention>}
                </div>
                <div className="mb-4  ">
                    <div className="flex items-center">
                        <CheckBox id="newsletter" className="mt-1 mr-2" />
                        <div className="flex-1 ">
                            <Label htmlFor="newsletter" className="text-[#585858]">
                                Хочу отримувати комерційні пропозиції магазину на вказаний вище email.
                            </Label>
                            {showMore && (
                                <Label htmlFor="newsletter" className="text-[#585858]">
                                    Ви завжди можете відписатися від розсилки за посиланням, зазначеним в одержуваному newsletter.
                                </Label>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="underline"
                        onClick={() => setShowMore(!showMore)}
                        className="mt-1 px-8 flex justify-start text-[#585858] text-xs"
                    >
                        {showMore ? "ПРИХОВАТИ" : "БІЛЬШЕ"}
                    </Button>
                </div>
                <div className="mb-4 flex items-center text-[#585858] text-[10px]">
                    Адміністратором персональних даних є Answear S.A. з офісом, зареєстрованим у м. Кракові, 31-564, вул. Aleja
                    Pokoju 18, під контролем окружного суду у м. Кракові, XI Фінансового відділу Національного судового реєстру,
                    KRS № 0000816066.
                </div>

                <div className="flex items-center justify-center">
                    <Button size="full">{signInIsLoading ? <IconLoader2 className="animate-spin" /> : "Створити Акаунт"}</Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
