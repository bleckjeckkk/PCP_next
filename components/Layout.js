import Header from './Header'
import Head from 'next/head'

const layoutStyle = {
  margin: 20,
  padding: 20,
}

const Layout = (props) => (
  <div style={{ 
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    zIndex: 10,
    backgroundImage: "url('static/lmao.png')",
    backgroundSize : 'cover',
    }}>
    <Head>
      {props.loading ? (
        <title>Loading...</title>
      ) : (
        <title>PCP {props.page ? `| ${props.page}` : ''}</title>
      )}
      <meta charSet="utf-8" />
      {/* Use minimum-scale=1 to enable GPU rasterization */}
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      {/* PWA primary color */}
      <link
        rel="stylesheet"
        src="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
    </Head>
    {props.noHeader ? (
        <div></div>
      ) : (
        <Header user={props.user}/>
      )
    }
    <div style={layoutStyle}>
      {props.children}
    </div>
  </div>
)

export default Layout