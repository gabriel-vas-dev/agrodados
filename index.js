const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const getData = async (url) => {
    await page.goto(url);
    const result = await page.evaluate(() => {
      return ({
        name: document.querySelector("#sigla_moeda_azul").innerText,
        date: document.querySelector("#snipet-div span").innerText,
        value: document.querySelector(".text-verde").value
      })
    });

    return result
  }

  const comodities = ['cafe', 'tilapia', 'boi', 'soja', 'milho', 'ovo', 'acucar', 'algodao', 'bezerro', 'citros', 'frango', 'leite', 'mandioca', 'ovino', 'suino', 'trigo']

  let resultData = {}

  for (let comodity of comodities) {
    const result = await getData(`https://www.melhorcambio.com/${comodity}-hoje`);
    resultData = { ...resultData, [comodity]: result }
  }

  await browser.close();

  console.log(resultData)
})();