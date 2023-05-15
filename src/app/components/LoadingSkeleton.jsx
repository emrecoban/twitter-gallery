import { memo } from "react";
import Image from "next/image";

export default memo(function LoadingSkeleton() {
    return (
        <a href="/" className="group block animate-pulse" target="_blank">
            <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden relative border border-slate-200">
                <Image
                    alt="placeholder"
                    src="/placeholder.jpeg"
                    fill={true}
                    className="hover:opacity-75 object-cover"
                />
            </div>
            <p className="mt-4 w-full bg-gray-100 h-6 rounded-md"></p>
        </a>
    )
})