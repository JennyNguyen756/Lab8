# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)  
   1. Within a Github action that runs whenever code is pushed 
   
2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.  
No, I wouldn't use unit testing to test the "message" feature because the feature seems to have more than one part such as writing and sending. Unit tests would be best to use for testing individual parts and features.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters.  
I would use a unit test to test the “max message length” feature of a messaging application because you can test that specific feature of the messaging application. You can test whether or not the “max message length” feature prevents the user from typing more than 80 characters.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?  
    We won't be able to see the browser UI during the tests.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?  
```
    beforeEach(async () => {
        await page.goto('http://127.0.0.1:5500/#settings');
});
  ```

