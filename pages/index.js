import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomeIndex from '../components/Home'


export default function Home({ defaultLinks }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <HomeIndex defaultLinks={defaultLinks}/>
		</div>
	);
}



export async function getStaticProps() {
  const quickLinks = [
    {
      name: "百度一下",
      link: "https://www.baidu.com/",
      icon: "https://www.baidu.com/favicon.ico",
    },
    {
      name: "Google",
      link: "https://www.google.com",
      icon: "https://www.google.com/favicon.ico",
    },
  ];
	// 返回 props
	return {
		props: {
			defaultLinks: quickLinks,
		},
	};
}