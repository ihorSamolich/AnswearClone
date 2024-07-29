export const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Не вказано";
    const date = new Date(dateString);
    return (
        date.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }) +
        " " +
        date.toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
        })
    );
};
