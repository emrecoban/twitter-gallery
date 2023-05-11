import Image from "next/image";

export default function LoadingSkeleton() {
    return (
        <a href={`/`} className="group block" target="_blank">
            <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden relative border border-slate-200">
                <Image
                    alt="placeholder"
                    src="https://bit.ly/placeholder-img"
                    fill={true}
                    className={cn(
                        'hover:opacity-75 object-cover',
                        isLoading
                            ? 'scale-110 blur-2xl grayscale'
                            : 'scale-100 blur-0 grayscale-0'
                    )}
                    onLoadingComplete={() => setLoading(false)}
                />
            </div>
            <p className="mx-2 mt-4 text-sm text-gray-500">yazııı</p>
        </a>
    )
}