describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const headerText = await page.$eval('header > h1', el => el.textContent);
    expect(headerText).toBe("Entry 1");
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
     let correct = true;
     const entry = await page.$('entry-page');
     let data = await entry.getProperty('entry');
     let plainValue = await data.jsonValue();
     let title = 'You like jazz?';
     let date = '4/25/2021';
     let content = 
          'According to all known laws of aviation, there is no way a bee should be able to fly. '
          +'Its wings are too small to get its fat little body off the ground. '
          +'The bee, of course, flies anyway because bees don\'t care what humans think is impossible.';
     let image_src = 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455';
     let image_alt = 'bee with sunglasses';

        if(plainValue.title != title) { correct = false; }
        if(plainValue.date != date) { correct = false };
        if(plainValue.content != content) { correct = false };
        if(plainValue.image.src != image_src) { correct = false };
        if(plainValue.image.alt != image_alt) { correct = false };
        expect(correct).toBe(true);

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const classBodyText = await page.$eval('body', el => el.classList);
    expect(classBodyText[0]).toBe("single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    expect(page.url()).toBe('http://127.0.0.1:5500/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const settingsHeaderText = await page.$eval('header > h1', el => el.textContent);
    expect(settingsHeaderText).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const settingsClassBodyText = await page.$eval('body', el => el.classList);
    expect(settingsClassBodyText[0]).toBe("settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user is on the homepage, the header title should be “Journal Entries', async() => {
    const homeHeaderText = await page.$eval('header > h1', el => el.textContent);
    expect(homeHeaderText).toBe("Journal Entries");
  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute' , async() => {
  const homeClassBodyText = await page.$eval('body', el => el.classList);
  expect(homeClassBodyText[0]).toBe(undefined);
  });
  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    await page.click('journal-entry:nth-of-type(2)');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry2');
    });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    const secondHeaderText = await page.$eval('header > h1', el => el.textContent);
    expect(secondHeaderText).toBe("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
     let correct = true;
     const entry = await page.$('entry-page');
     let data = await entry.getProperty('entry');
     let plainValue = await data.jsonValue();
     let title = 'Run, Forrest! Run!';
     let date = '4/26/2021';
     let content = 
          "Mama always said life was like a box of chocolates. You never know what you're gonna get.";
     let image_src = "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg";
     let image_alt = 'forrest running';

        if(plainValue.title != title) { correct = false; }
        if(plainValue.date != date) { correct = false };
        if(plainValue.content != content) { correct = false };
        if(plainValue.image.src != image_src) { correct = false };
        if(plainValue.image.alt != image_alt) { correct = false };
        expect(correct).toBe(true);

  }, 10000);

  // create your own test 17
  it('Test17: check if clicking header title goes back to home page', async () => {
    await page.click('h1');
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  // create your own test 18
  it('Test18: Verify the url is correct when clicking on the fifth entry', async () => {
    await page.click('journal-entry:nth-of-type(5)');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry5');
  });

  // create your own test 19
  it('Test19: Verify the entry page contents is correct when clicking on the fifth entry', async () => {
    let correct = true;
    const entry = await page.$('entry-page');
    let data = await entry.getProperty('entry');
    let plainValue = await data.jsonValue();
    let title = "We know each other! He’s a friend from work!";
    let date = '4/29/2021';
    let content = 
         "There was one time when we were children. He transformed himself into a snake, and he knows that I love snakes. So I went to pick up the snake to admire it, and he transformed back into himself and he was like, ‘Blech, it’s me!’ And he stabbed me. We were 8 at the time.";
    let image_src = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F07%2Fthorragnarok5974d7a5729ab-2000.jpg";
    let image_alt = 'four friends looking at front camera';

       if(plainValue.title != title) { correct = false; }
       if(plainValue.date != date) { correct = false };
       if(plainValue.content != content) { correct = false };
       if(plainValue.image.src != image_src) { correct = false };
       if(plainValue.image.alt != image_alt) { correct = false };
       expect(correct).toBe(true);

 }, 10000);

  // create your own test 20
  it('Test20: On Entry 4 page - checking page header title', async () => {
    const entryFiveHeaderText = await page.$eval('header > h1', el => el.textContent);
    expect(entryFiveHeaderText).toBe("Entry 5");
  });
});
