import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import GalverseLogo from 'public/home/logos/brand-logo.svg'
import { getCssText } from '../stitches.config'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <link rel="stylesheet" href="/utils/css/custom-font.css" />
        </Head>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Meta tags */}
        <meta name="keywords" content="nft, ethereum, protocol" />
        <meta name="keywords" content="NFT, API, Protocol" />

        {/* Favicon */}
        <link
          rel="shortcut icon"
          type="image/ico"
          href="/favicon.ico"
        />

        {/* Reservoir meta tags */}
        <meta property="reservoir:title" content="Shinsei Galverse - Gallery" />
        <meta property="reservoir:icon" content="/brand-logo.svg" />
        <meta
          property="reservoir:token-url-mainnet"
          content="/ethereum/asset/${contract}:${tokenId}"
        />
        <meta
          property="reservoir:token-url-goerli"
          content="/goerli/asset/${contract}:${tokenId}"
        />
        <meta
          property="reservoir:token-url-polygon"
          content="/polygon/asset/${contract}:${tokenId}"
        />
        <meta
          property="reservoir:token-url-arbitrum"
          content="/arbitrum/asset/${contract}:${tokenId}"
        />
        <meta
          property="reservoir:token-url-optimism"
          content="/optimism/asset/${contract}:${tokenId}"
        />
        <meta
          property="reservoir:token-url-zora"
          content="/zora/asset/${contract}:${tokenId}"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
