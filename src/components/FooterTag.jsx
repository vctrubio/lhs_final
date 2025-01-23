import { Mail, Send, Download, Phone } from "lucide-react";

export function FooterTagShare() {
    const buttons = [
        {
            icon: Mail,
            label: "Contact",
            onClick: () => alert("Contact button clicked!"),
        },
        {
            icon: Send,
            label: "Send",
            onClick: () => alert("Send button clicked!"),
        },
        {
            icon: Download,
            label: "Download",
            onClick: () => alert("Download button clicked!"),
        },
        {
            icon: Phone,
            label: "Call",
            onClick: () => alert("Call button clicked!"),
        },
    ];

    return (
        <div className="flex justify-around p-4">
            {buttons.map(({ icon: Icon, label, onClick }) => (
                <button
                    key={label}
                    onClick={onClick}
                    className="group flex flex-col items-center text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"
                >
                    <div className="flex items-center justify-center w-14 h-14 bg-background rounded-full group-hover:bg-gray-200 transition duration-300 ease-in-out">
                        <Icon className="w-6 h-6" />
                    </div>
                    <span className="mt-2 text-sm font-medium"></span>
                </button>
            ))}
        </div>
    );
}

