const WhyShouldRegisterCard = () => {
    return (
        <>
            <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
                <p className="font-bold text-xl mb-4">Чому варто зареєструватися?</p>

                <div className="flex items-center mb-4">
                    <div
                        className="bg-orange-200 text-gray-800 w-12 h-12 flex items-center justify-center rounded-full mr-1 flex-shrink-0">1
                    </div>
                    <p className="ml-4">Накопичуєш бали за кожне замовлення</p>
                </div>

                <div className="flex items-center mb-4">
                    <div
                        className="bg-orange-200 text-gray-800 w-12 h-12 flex items-center justify-center rounded-full mr-1 flex-shrink-0">2
                    </div>
                    <p className="ml-4">Приєднуйтесь до ANSWEAR.Club та купуйте дешевше!</p>
                </div>

                <div className="flex items-center">
                    <div
                        className="bg-orange-200 text-gray-800 w-12 h-12 flex items-center justify-center rounded-full mr-1 flex-shrink-0">3
                    </div>
                    <p className="ml-4">Швидші покупки, завдяки вже збереженим особистим даним.</p>
                </div>
            </div>
        </>
    );
};
export default WhyShouldRegisterCard;