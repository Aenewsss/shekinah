import Link from "next/link";

export default function WhatsApp() {
    return (
        <div className="fixed bottom-6 right-6 z-50" >
            <Link href={process.env.NEXT_PUBLIC_WPP} className="block bg-[#25D366] p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5522 2.63234 20.9666 3.76401 23.0742L2.28601 29.714L9.05998 28.2701C11.1146 29.3426 13.4746 30 16 30Z"
                        fill="white"
                    />
                    <path
                        d="M23 20.2C22.7 20.05 21.15 19.3 20.9 19.2C20.6 19.1 20.4 19.05 20.2 19.35C20 19.65 19.4 20.35 19.25 20.55C19.1 20.75 18.9 20.8 18.65 20.65C18.4 20.5 17.35 20.15 16.15 19.1C15.2 18.25 14.55 17.2 14.35 16.95C14.2 16.7 14.3 16.55 14.45 16.4C14.55 16.3 14.7 16.1 14.8 15.95C14.9 15.8 14.95 15.7 15.05 15.5C15.15 15.3 15.1 15.15 15.05 15C15 14.85 14.35 13.3 14.1 12.8C13.85 12.3 13.6 12.4 13.45 12.4C13.3 12.4 13.1 12.35 12.9 12.35C12.7 12.35 12.4 12.4 12.15 12.65C11.9 12.9 11.1 13.65 11.1 15.2C11.1 16.75 12.2 18.25 12.35 18.45C12.5 18.65 14.35 21.45 17.15 22.8C17.85 23.1 18.4 23.3 18.85 23.45C19.55 23.7 20.2 23.65 20.7 23.6C21.25 23.55 22.5 22.9 22.75 22.3C23 21.7 23 21.2 22.95 21.1C22.9 21 22.7 20.95 22.4 20.8C22.1 20.65 22.1 20.65 22.1 20.65C22.1 20.65 23.3 20.35 23 20.2Z"
                        fill="#25D366"
                    />
                </svg>
            </Link>
        </div >
    )
}