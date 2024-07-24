import { IconBrandGoogle, IconEye, IconHeart } from "@tabler/icons-react";
import { Input, InputPassword, Label, Link } from "components/ui";

const HomePage = () => {
  return (
    <>
      <div className="inline-flex gap-2 bg-sky-300 w-full p-10">
        <Link href="/">Default</Link>
        <Link variant="primary">Primary</Link>
        <Link size="full">Full</Link>
      </div>
      <div className="inline-flex gap-2 bg-sky-300 w-full p-10">
        <Link variant="underline" size="span">
          Underline
        </Link>
        <Link variant="icon" size="iconsm">
          <IconHeart />
        </Link>

        <Link variant="icon" size="iconlg">
          <IconBrandGoogle />
        </Link>
      </div>

      <div className="flex flex-col  bg-sky-300 w-full p-10">
        <Label>електронна пошта*</Label>
        <Input />

        <Label>Пароль*</Label>
        <InputPassword icon={<IconEye />} />
      </div>
    </>
  );
};

export default HomePage;
