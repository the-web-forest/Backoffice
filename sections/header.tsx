import Head from "next/head"
import Settings from "../core/settings"

interface HeaderProps {
    title?: string
}

const Header = ({ title }: HeaderProps) => {

    const isDevelopment = Settings.get().isDevelopment()
    const firstTitle = title ? `${Settings.get().appName()} - ${title}` : Settings.get().appName()
    const finalTitle = isDevelopment ? `[DEV] ${firstTitle}` : firstTitle

    const renderTags = () => {
        const noIndex = (
          <>
            <meta key="robots" name="robots" content="noindex,follow" />
            <meta key="googlebot" name="googlebot" content="noindex,follow" />
          </>
        );
    
        return Settings.get().isDevelopment() ? noIndex : null;
      };

    return (
        <Head>
            {renderTags()}
            <title>{finalTitle}</title>
        </Head>
    )
}

export default Header