import { IconEye } from "@tabler/icons-react";
import { Button, InputPassword, Label } from "components/ui";

const NewPasswordForm = () => {
    return (
        <div className="flex items-center justify-center ">
            <div className="w-full max-w-xl p-8 space-y-8 ">
                <h2 className="text-2xl font-bold text-left">Створити новий пароль</h2>
                <form className="mt-8 space-y-4">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="password">Новий пароль</Label>
                            <InputPassword id="password" icon={<IconEye />} />
                        </div>
                        <div>
                            <Label htmlFor="passwordRepeat">Повторіть новий пароль</Label>
                            <InputPassword id="passwordRepeat" icon={<IconEye />} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button size="full">Ок</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordForm;
