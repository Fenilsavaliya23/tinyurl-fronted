export const formatDate = (dataString) => {
    const date = new Date(dataString);
    return " " + date.toLocaleTimeString("en-IN", 
            { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata', day: "numeric", month: "short", year:"numeric" });
};  

export const shortenUrl = (text, maxLength = 60) => {
    if(!text) return '';
    
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export const capitalize = (text) => {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatRole = (role) => {
    return capitalize(role);
};

export const formatClicks = (count) => {
    return `${count} ${count === 1 ? "click" : "clicks"}`;
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN").format(number);
};