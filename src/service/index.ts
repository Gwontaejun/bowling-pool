import utils from '@src/util';
import puppeteer, { Browser } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import _ from 'lodash';

import { ChiltenResDataType, SearchDataType } from '@src/app/api/getList/type';

// 칠텐 api 호출
const chilten = async (keyword: string) => {
  const list: SearchDataType[] = [];

  const obj: ChiltenResDataType[] = await fetch(
    `https://api.chilten.com/v2/markets/posts?keyword=${
      keyword ?? '거래'
    }&page=1`
  ).then((r) => r.json());

  obj.forEach((item) => {
    if (!item.filePath) {
      return;
    }

    list.push({
      id: item.id,
      platform: 1,
      link: `https://www.chilten.com/markets/${item.id}`,
      title: item.title,
      image: item.filePath.includes('https://')
        ? item.filePath
        : `https://175f8cbde885d84d.kinxzone.com${item.filePath}`,
      date: utils.calcDate(item.regDate),
    });
  });

  return list;
};

// 당근 크롤링
// const danggn = async (keyword: string, browser: Browser) => {
//   const danggnList: SearchDataType[] = [];

//   const page = await browser.newPage();

//   await page.setRequestInterception(true);

//   page.on('request', (req) => {
//     if (
//       req.resourceType() === 'image' ||
//       req.resourceType() === 'font' ||
//       req.resourceType() === 'stylesheet'
//     ) {
//       // 만약 요청 타입이 '이미지' or 'CSS' or '폰트' 라면
//       req.abort(); // 거부
//     } else {
//       // 이미지가 아니라면
//       req.continue(); // 수락
//     }
//   });

//   await page.goto(`https://www.daangn.com/search/${keyword}`, {
//     waitUntil: 'load',
//     timeout: 0,
//   });

//   const listEl = await page.$$('#flea-market-wrap > article');

//   await Promise.all(
//     listEl.map(async (el) => {
//       const imgEl = await el.$('.card-photo > img');
//       const titleEl = await el.$('.article-title');
//       const anchorEl = await el.$('a[class=flea-market-article-link]');
//       const image = (await page.evaluate((tag) => tag?.src, imgEl)) as string;
//       const title = (await page.evaluate(
//         (tag) => tag?.textContent,
//         titleEl
//       )) as string;
//       const link = (await page.evaluate(
//         (tag) => tag?.href,
//         anchorEl
//       )) as string;

//       danggnList.push({
//         platform: 5,
//         image,
//         title,
//         link,
//       });
//     })
//   );

//   await page.close();

//   return danggnList;
// };

// 중고나라 크롤링
const joongna = async (keyword: string, browser: Browser) => {
  const joongnaList: SearchDataType[] = [];

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (req) => {
    // 만약 요청 타입이 '폰트' or 'CSS'
    if (req.resourceType() === 'font' || req.resourceType() === 'stylesheet') {
      req.abort(); // 거부
    } else {
      req.continue(); // 수락
    }
  });

  await page.goto(
    `https://web.joongna.com/search/${keyword}?sort=RECENT_SORT`,
    {
      waitUntil: 'load',
      timeout: 0,
    }
  );

  const listEl = await page.$$('ul.search-results > li a.group');

  await Promise.all(
    listEl.map(async (el) => {
      const imgEl = await el.$('.rounded-md > img.rounded-md');
      const titleEl = await el.$('.w-full > h2.text-heading');
      const dateEl = await el.$('.w-full > .my-1 > :nth-child(3)');
      const image = (await page.evaluate((tag) => tag?.src, imgEl)) as string;
      const title = (await page.evaluate(
        (tag) => tag?.textContent,
        titleEl
      )) as string;
      const link = (await page.evaluate((tag) => tag?.href, el)) as string;
      const date = (await page.evaluate(
        (tag) => tag?.textContent,
        dateEl
      )) as string;

      joongnaList.push({
        platform: 2,
        image,
        title,
        link,
        date: utils.calcDate(date),
      });
    })
  );

  await page.close();

  return joongnaList;
};

const bunjang = async (keyword: string, browser: Browser) => {
  const bunjangList: SearchDataType[] = [];

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (req) => {
    if (
      req.resourceType() === 'image' ||
      req.resourceType() === 'font' ||
      req.resourceType() === 'stylesheet'
    ) {
      // 만약 요청 타입이 '이미지' or 'CSS' or '폰트' 라면
      req.abort(); // 거부
    } else {
      // 이미지가 아니라면
      req.continue(); // 수락
    }
  });

  await page.goto(
    `https://m.bunjang.co.kr/search/products?order=date&q=${keyword}&redirect_global=false`,
    {
      waitUntil: 'load',
      timeout: 0,
    }
  );

  const listEl = await page.$$('a[data-pid]');

  await Promise.all(
    listEl.map(async (el) => {
      const imgEl = await el.$(':scope > :nth-child(1) > img');
      const titleEl = await el.$(':scope > :nth-child(2) > :nth-child(1)');
      const dateEl = await el.$(
        ':scope > :nth-child(2) > :nth-child(2) > :nth-child(2)'
      );
      const image = (await page.evaluate((tag) => tag?.src, imgEl)) as string;
      const title = (await page.evaluate(
        (tag) => tag?.textContent,
        titleEl
      )) as string;
      const link = (await page.evaluate((tag) => tag?.href, el)) as string;
      const date = (await page.evaluate(
        (tag) => tag?.textContent,
        dateEl
      )) as string;

      bunjangList.push({
        platform: 3,
        image,
        title,
        link,
        date: utils.calcDate(date),
      });
    })
  );

  await page.close();

  return bunjangList;
};

const ggammani = async (keyword: string, browser: Browser) => {
  const ggammaniList: SearchDataType[] = [];

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (req) => {
    if (
      req.resourceType() === 'image' ||
      req.resourceType() === 'font' ||
      req.resourceType() === 'stylesheet'
    ) {
      // 만약 요청 타입이 '이미지' or 'CSS' or '폰트' 라면
      req.abort(); // 거부
    } else {
      // 이미지가 아니라면
      req.continue(); // 수락
    }
  });

  await page.goto(
    `https://m.cafe.daum.net/bowlingevent/search?query=${keyword}`,
    {
      waitUntil: 'load',
      timeout: 0,
    }
  );

  const listEl = await page.$$('ul.list_cafe > li > a.link_cafe');

  await Promise.all(
    listEl.map(async (el) => {
      const imgEl = await el.$('.cafe_thumb > img');
      const titleEl = await el.$('.info_cafe > .tit_info');
      const dateEl = await el.$('.info_cafe > .txt_info .created_at');
      const image = (await page.evaluate((tag) => tag?.src, imgEl)) as string;
      const title = (await page.evaluate(
        (tag) => tag?.textContent,
        titleEl
      )) as string;
      const link = (await page.evaluate((tag) => tag?.href, el)) as string;
      const date = (await page.evaluate(
        (tag) => tag?.textContent,
        dateEl
      )) as string;

      if (!image) {
        return;
      }

      ggammaniList.push({
        platform: 4,
        image,
        title,
        link,
        date: utils.calcDate(`20${date}`),
      });
    })
  );

  await page.close();

  return ggammaniList;
};

export const getCrawlList = async (keyword: string) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
    ],
    executablePath:
      process.env.NODE_ENV === 'development'
        ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
        : await chromium.executablePath(),
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const result = await Promise.all([
    chilten(keyword),
    joongna(keyword, browser),
    bunjang(keyword, browser),
    ggammani(keyword, browser),
    // danggn(keyword, browser),
  ]).then((r) => {
    return _.flattenDeep(r);
  });

  await browser.close();

  return _.sortBy(
    result.filter((item) => !Number.isNaN(item.date as number)),
    'date'
  ).reverse();
};

export default getCrawlList;
