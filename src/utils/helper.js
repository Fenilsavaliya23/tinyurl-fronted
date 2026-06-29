import { toast } from "react-toastify";

export const copyToClipboard = async (
    text,
    successMessage = "Copied to clipboard!"
) => {
    
    try {
            await navigator.clipboard.writeText(text);

            toast.success(successMessage);

            return true;

    } catch (error) {

            console.error(error);

            toast.error("Failed to copy.");

            return false;
    }
};

export const openInNewTab = (url) => {

    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");

};

export const getInitials = (name = "") => {

    return name
        .trim()
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

};

export const generateShortUrl = (shortCode) => {

    return `${window.location.origin}/r/${shortCode}`;

};

export const isAdmin = (user) => {

    return user?.role === "ADMIN";

};

export const sleep = (ms) => {

    return new Promise(resolve => setTimeout(resolve, ms));

};