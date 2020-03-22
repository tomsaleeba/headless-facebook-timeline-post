#!/usr/bin/env node
// Usage:
// Login manually, saving your authenticated session in the "data/" directory:
// $ ./fbpost --login
//
// Now you can post whatever you want via argument:
// $ ./fbpost "Hello world, this is a post!"
//
;(async () => {
  const puppeteer = require('puppeteer')
  const arg = process.argv[2]
  const browser = await puppeteer.launch({
    headless: arg !== '--login',
    userDataDir: 'data',
  })
  const page = (await browser.pages())[0]
  await page.goto('https://www.facebook.com')
  if (arg === '--login') {
    // wait for homepage to load after a manual login
    await page.waitFor('div[aria-label="Create a post"]', { timeout: 180000 })
  } else {
    // use keyboard shortcut to open and focus on create new post
    await page.keyboard.press('KeyP')
    // wait for emoji icon as proxy for "loaded and post ready"
    await page.waitFor(
      'div[aria-label="Create a post"] a[aria-label="Insert an emoji"]',
    )
    // keyboard shortcut put focus in place so we can just type
    await page.keyboard.type(arg)
    // click submit
    await page.keyboard.down('Control')
    await page.keyboard.press('Enter')
    await page.keyboard.up('Control')
    // can’t find reliable way to detect that it posted successfully,
    // but if we close too soon it won’t finish the post request
    await new Promise(res => setTimeout(res, 2000))
  }
  await browser.close()
})()
