import Header from './Header'
import Head from 'next/head'

const layoutStyle = {
  margin: 20,
  padding: 20,
}

const Layout = (props) => (
  <div style={{ margin : '-8px'}}>
    <Head>
      <title>PCP {props.page ? `| ${props.page}` : ''}</title>
    </Head>
    <Header user={props.user}/>
    <div style={layoutStyle}>
      {props.children}
    </div>
  </div>
)

export default Layout