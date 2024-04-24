/* eslint-disable @typescript-eslint/no-var-requires */
// const { https } = require('firebase-functions');
// const { default: next } = require('next');

import { https } from 'firebase-functions';
import next from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/prefer-default-export
export const nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
