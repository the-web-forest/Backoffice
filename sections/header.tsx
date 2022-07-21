import Head from "next/head"
import Settings from "../core/settings"

interface HeaderProps {
    title?: string
}

const Header = ({ title }: HeaderProps) => {

    const isDevelopment = Settings.get().isDevelopment()
    const firstTitle = title ? `${title} - ${Settings.get().appName()}` : Settings.get().appName()
    const finalTitle = isDevelopment ? `[DEV] ${firstTitle}` : firstTitle

    return (
        <Head>
            <title>{finalTitle}</title>
        </Head>
    )
}

export default Header