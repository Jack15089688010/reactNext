// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const sp = require('superagent');
// const cheerio = require('cheerio');


export default async function  handler(req, res) {
  // const html = await sp.get('http://www.baidu.com/')
  // console.log(html.text, '=======getStaticProps');
  // res.status(200).json({ name: html.text })
  res.status(200).json({ name: 'hello world' })
}
