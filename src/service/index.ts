import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

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
      date: item.regDate,
    });
  });

  return list;
};

// 당근 크롤링
const danggn = async (keyword: string) => {
  const danggnList: SearchDataType[] = [];

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: chromium.args,
    // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.goto(`https://www.daangn.com/search/${keyword}`, {
    waitUntil: 'load',
    timeout: 0,
  });

  const listEl = await page.$$('#flea-market-wrap > article');

  await Promise.all(
    listEl.map(async (el) => {
      const imgEl = await el.$('.card-photo > img');
      const titleEl = await el.$('.article-title');
      const anchorEl = await el.$('a[class=flea-market-article-link]');
      const image = (await page.evaluate((tag) => tag?.src, imgEl)) as string;
      const title = (await page.evaluate(
        (tag) => tag?.textContent,
        titleEl
      )) as string;
      const link = (await page.evaluate(
        (tag) => tag?.href,
        anchorEl
      )) as string;

      danggnList.push({
        platform: 5,
        image,
        title,
        link,
      });
    })
  );

  await page.close();

  return danggnList;
};

// 중고나라 크롤링
const joongna = async (keyword: string) => {
  const joongnaList: SearchDataType[] = [];

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();

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
      const imgEl = await el.$('.rounded-md > img');
      const titleEl = await el.$('.w-full > h2.text-heading');
      const image = (await page.evaluate((tag) => tag?.src, imgEl)) as string;
      const title = (await page.evaluate(
        (tag) => tag?.textContent,
        titleEl
      )) as string;
      const link = (await page.evaluate((tag) => tag?.href, el)) as string;

      joongnaList.push({
        platform: 2,
        image,
        title,
        link,
      });
    })
  );

  await page.close();

  return joongnaList;
};

export { danggn, joongna, chilten };
