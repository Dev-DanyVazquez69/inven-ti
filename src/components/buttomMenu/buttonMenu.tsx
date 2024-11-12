import Link from "next/link"
import Image from "next/image"

interface ButtonMenuProps {
    title: string,
    pathImage: string,
    descriptionImage: string,
    patchLink: string,
}

export const ButtonMenu: React.FC<ButtonMenuProps> = (props) => {
    return (
        <Link
            href={props.patchLink}
            className="size-24 sm:size-32 lg:size-36 bg-blue justify-center flex flex-col p-3 rounded-xl border-2 border-black shadow-sm">
            <div className="relative flex-1 items-center justify-center">
                <Image
                    src={props.pathImage}
                    alt={props.descriptionImage}
                    fill
                    className="object-contain"
                />
            </div>
            <p className="text-center text-xs md:text-base font-semibold text-background">{props.title}</p>
        </Link>
    )
}