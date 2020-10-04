import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to add/remove item', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const addBookToReadingList = $$('[data-testing="book-item"] button').filter(
      async (book) => {
        return (await book.getAttribute('disabled')) !== 'true';
      }
    );
    await addBookToReadingList.first().click();
    await $('[data-testing="toggle-reading-list"]').click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    const readingListLength = await $$('.mat-warn').count();
    const removeBookFromReadingList = await $$('.mat-warn').last();
    const titleToRemove = await $$('.reading-list-item--details--title')
      .last()
      .getText();
    await removeBookFromReadingList.click();

    const remainingBooksInReadingList = await $$(
      '.reading-list-item--details--title'
    ).filter(async (book) => {
      const title = await book.getText();
      return title === titleToRemove;
    });
    expect(await $$('.mat-warn').count()).toEqual(readingListLength - 1);
    expect(remainingBooksInReadingList).toEqual([]);
  });

  it('Then: I should be able finish a reading list item', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const addBookToReadingList = $$('[data-testing="book-item"] button').filter(
      async (book) => {
        return (await book.getAttribute('disabled')) !== 'true';
      }
    );
    await addBookToReadingList.first().click();
    await $('[data-testing="toggle-reading-list"]').click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    const lastBookDetails = await $$('.reading-list-item').last();
    const markAsFinishedButton = await lastBookDetails.$('.mat-icon-no-color');
    await markAsFinishedButton.click();

    expect(
      await lastBookDetails.$('.reading-list-item--details--finished').getText()
    ).toBeTruthy();
  });
});
