import Head from "next/head"
import Settings from "../core/settings"

interface HeaderProps {
    title?: string
}

const Header = ({ title }: HeaderProps) => {
    return (
        <Head>
            <title>{(title ? `${title} - ${Settings.appName}` : `${Settings.appName}`)}</title>
        </Head>
    )
}

export default Header