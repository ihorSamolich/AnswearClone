import { IconUser } from "@tabler/icons-react";
import { IUserCard } from "interfaces/user";
import { getRandomColor } from "utils/getRandomColor.ts";

import React from "react";

const UserCard: React.FC<{ user: IUserCard }> = ({ user }) => {
    const initials = user.firstName && user.lastName ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : null;

    const displayName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email;

    const circleContent = initials ? (
        <span className="text-white">{initials}</span>
    ) : (
        <IconUser className="text-white" size={14} />
    );

    return (
        <div className="flex items-center p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ml-3">
            <div className={`flex items-center justify-center w-5 h-5 text-[10px] rounded-full ${getRandomColor()}`}>
                {circleContent}
            </div>
            <div className="ml-2">
                <p className="text-xs font-semibold">{displayName}</p>
            </div>
        </div>
    );
};

export default UserCard;
