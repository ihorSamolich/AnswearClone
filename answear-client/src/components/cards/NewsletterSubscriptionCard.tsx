import { zodResolver } from "@hookform/resolvers/zod";
import Attention from "components/ui/Attention.tsx";
import Button from "components/ui/Button.tsx";
import InputEmail from "components/ui/InputEmail.tsx";
import Link from "components/ui/Link.tsx";
import { NewsletterSchema, NewsletterSchemaType } from "interfaces/zod/user.ts";
import { useForm } from "react-hook-form";

import React from "react";

const NewsletterSubscriptionCard: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewsletterSchemaType>({ resolver: zodResolver(NewsletterSchema) });

    const onSubmit = (data: NewsletterSchemaType) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col py-6 px-24 bg-gray-100 max-w-2xl">
            <div className="flex items-center ml-4">
                <h2 className="text-2xl font-bold">
                    <span className="font-bold text-3xl bg-white px-[6.4px] mr-2">-15%</span>знижки на першу покупку** за підписку
                    на розсилку.
                </h2>
            </div>

            <div className="ml-4">
                <p className="text-sm mt-4">
                    Приєднуйтеся до нашої спільноти, щоб отримувати інформацію про найновіші акції та товари.
                </p>
                <p className="text-xs text-[#6e6e6e] mt-4">
                    **Знижка є одноразовою, діє лише на новинки (товари з "чорними" цінниками) при мінімальному кошику 1500 грн.
                    Промокод не поєднується з іншими акціями, а деякі товари можуть бути виключені з його дії. Деталі за
                    посиланням:
                    <Link variant="underline" size="span" className="text-xs text-[#6e6e6e]" href="#">
                        виключення з акції.
                    </Link>
                </p>
            </div>

            <div className="flex items-center ml-4 mt-8 space-x-4">
                <div className="w-full max-w-[400px]">
                    <InputEmail
                        placeholder="Введіть адресу e-mail"
                        className="bg-gray-100 h-[44px] max-h-[44px] w-full"
                        {...register("email")}
                    />
                    {errors.email && <Attention>{errors.email.message}</Attention>}
                </div>
                <Button className="max-w-[200px]" type="submit">
                    Підписатися
                </Button>
            </div>
        </form>
    );
};

export default NewsletterSubscriptionCard;
