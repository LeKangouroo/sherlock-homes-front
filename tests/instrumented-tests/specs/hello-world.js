import { assert } from 'chai';
import webdriver from 'selenium-webdriver';

const builder = new webdriver.Builder()
  .forBrowser('firefox');

const driver = builder.build();
const By = webdriver.By;
const until = webdriver.until;

describe('A Hello World test suite', () => {

  it('opens Google Search homepage', (done) => {

    driver.get('https://google.fr');
    driver.wait(until.elementLocated(By.css('body')), 10000);
    driver.getTitle().then(

      (title) => {
        assert.strictEqual(title, 'Google');
        done();
      },
      (err) => {
        done(err);
      }
    );
  });

  it('types "Hello world" in the search input', () => {

    const input = driver.findElement(By.name('q'));

    input.sendKeys('Hello world');
  });
});
