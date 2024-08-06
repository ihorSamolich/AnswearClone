import Button from "components/ui/Button.tsx";

import React from "react";

const DiscountAnswearClubCard: React.FC = () => {
    return (
        <div className="flex-col py-[65px] px-24 bg-gray-100 max-w-2xl ">
            <div className="flex items-center ml-4">
                <div className="flex items-center justify-center w-8 h-8 p-4 rounded-full border-3 border-black text-black font-bold text-lg">
                    AC
                </div>
                <h2 className="text-2xl font-bold ml-3">Answear Club</h2>
            </div>

            <div className="ml-4 ">
                <p className="text-sm mt-4">
                    Отримуй <span className="font-bold bg-white px-[2.8px]">5%</span> від вартості кожного замовлення та знижуй
                    ціну на товари до -50%!
                </p>
                <Button className="mt-8  max-w-[200px]">Дізнатися більше</Button>
            </div>
        </div>
    );
};

export default DiscountAnswearClubCard;
