import Image from "next/image";

export default function Header() {
    return (
        <div className="flex mb-16">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-x-1">
                    <Image src="/twitter.svg" width="24" height="24" alt="twitter" />
                    <Image src="/gallery.svg" width="24" height="24" alt="gallery" />
                    <h1 className="text-lg text-slate-800">Twitter Gallery</h1>
                </div>
                <div className="text-xs md:text-sm text-slate-500">
                    Crafted by <a href="https://github.com/emrecoban" target="_blank" className="hover:text-slate-700 hover:underline-offset-4 hover:underline"><Image src="/github.svg" width="19" height="19" alt="github" className="inline-block" /> emrecoban</a>
                </div>
            </div>
        </div>
    )
}