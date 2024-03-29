# So you want to delete your old tweets

Great! The setup process may seem like a lot of steps, but it's not that hard and should only take you 15-20 minutes. Unfortunately, that's the trade-off of doing things yourself instead of letting a service to do it for you. It's mostly just filling out forms and clicking buttons, though, so don't worry.

If you look at the left you'll see a list of files. Most of them are the code necessary to make this app work – you can ignore those (unless you're interested!). You'll also see `README.md` highlighted. That's the instructions file that you're looking at right now, and the highlight means it's open.

Sometimes these instructions will link out to a page for you to go and do things. I recommend you open all links in a new tab so you always have the instructions open. If you forget, though, you can always use the back button in your browser, or go to <a href="https://glitch.com" target="_blank">glitch.com</a> and click the "Resume Coding" button in the top right. That will bring you back here again.

If you have any issues or questions, feel free to reach out to me on Twitter <a href="https://twitter.com/ryangiglio" target="_blank">@ryangiglio</a> and I'll help you out.

## Setup

### (Optional) Sign up for Glitch

You _can_ setup and run this app without signing up for Glitch, but if there's an issue and you need to come back later and resume deleting, making an account will make sure your stuff is saved and that it picks up from where it left off. Up to you!

1. Click Sign In at the top of this page

2. Log in with Facebook or Github. If you don't have either one, it's very quick to sign up for Github on the Free plan.
   _If your Twitter is anonymous, don't worry, your login account won't be linked to it in any way._

### Register with Twitter as a developer

_If you're already registered as a developer, skip to the next section._

1. Go to the <a href="https://developer.twitter.com" target="_blank">Twitter developer portal</a>

2. Click "Apply" in the top right, and then the "Apply For A Developer Account" button
   _You need to have a developer account in order to access Twitter's API, which is how this app deletes your tweets._

3. If you don't have a verified phone number on your account, Twitter will ask you to add one.
   _Twitter requires developers to have a verified phone number to have a point of contact in case of abuse. If you're not comfortable giving them your real phone number, there are a number of services that let you generate temporary phone numbers, although I can't vouch for any of them and it seems risky to permanently tie your account to a burner number. Your best bet is probably to add your real phone number and then if you want, remove it from your account when you're done using this app._

4. Click "Continue" to associate your current username.

5. Select "I am requesting access for my own personal use." Fill in your Twitter username and select your country. Click "Continue".

6. Select "Other" as your use case. In the "Describe in your own words what you're building" box, feel free to enter your own explanations or erase the pre-filled numbers and copy/paste this text that already meets their minimum text requirement. These are true answers to the four questions they ask you:

   ```
   1. I'm using Twitter's API to programmatically delete my own Twitter archive.
   2. I do not plan to analyze Tweets, Twitter users, or their content.
   3. I will not be Tweeting, Retweeting, or liking content.
   4. I will not be displaying any data, I'm just using the API for programmatic access to my own tweets.
   ```

   Choose "No" for the question about information being available to government entities.

7. Scroll through and accept the terms and conditions. If you feel like reading them, they're actually pretty plain English.

8. Twitter will now send you a verification email to complete your application. When you recieve it, click the "Confirm your email" button.

### Create an app and add the credentials to this project

1. Go to Twitter's <a href="https://developer.twitter.com/en/apps/create" target="_blank">create an app</a> page

   _The values you enter for steps 2, 3, and 4 don't actually matter for the functionality of this app, you're just naming a few things._

2. Enter `(your username here) archive deleter` as the App name

3. Enter `Glitch Twitter archive deleter credentials` as the Application description

4. Enter `https://twitter.com` as the website URL

5. Scroll to the bottom of the page and copy/paste this text in the "Tell us how this app will be used" field

   ```
   This app will be used to generate credentials that let me use the Twitter API on behalf of my own account.
   ```

6. Press Create, and then press Create again on the popup

7. Click on the "Keys and tokens" tab at the top. Under the "Access token & access token secret" section, click the Create button

8. Open your `.env` file from the list on the left (it's the one with the little key). Copy your Consumer API Key, Consumer API Secret Key, Access Token, and Access Token Secret from the Twitter app page and paste them into the `.env` file after each `=`. It should look like this, with your values filled in:

   ```
   TWITTER_CONSUMER_API_KEY=Pqhe6a6rSFb4vfCun7sYyDWOA
   TWITTER_CONSUMER_API_SECRET_KEY=HfTfQc0lFm33T3Ixfv4cCmRj0k6daT9iSa6DF2n3H6qwZ4lWai
   TWITTER_ACCESS_TOKEN=12345678-AzNwMwPGtNehMvf86ChlhYuowX95Bw7BBbpmFm2qw
   TWITTER_ACCESS_TOKEN_SECRET=ym62oXokuSH5f7jqw18Mr7LuwCaifQHaFIQUtcoeC8QZL
   ```

### Download your Twitter archive

_NOTE: As of July 2019, Twitter has started rolling out "New Twitter" to the public along with a new archive format. The steps to download it and upload to the app are slightly different. "New Twitter" will have a `tweets.js` file in the archive, and "Old Twitter" will have a `tweets.csv`. This app works with both._

#### New Twitter

1. Go to your <a href="https://twitter.com/settings/account" target="_blank">Twitter account settings</a>

2. Under "Data and Permissions" click on "Your Twitter Data"

3. Under "Download your data" click the "Request Data" button next to "Twitter"

4. Wait to get an email from Twitter. It takes longer if you have a lot of tweets, but in my experience not usually more than an hour

5. Follow the download link in your email and download your data from the page

6. Unzip the archive (it'll have a long name of letters and numbers) and open the folder

7. Drag and drop the `tweet.js` file into this window. You'll see what looks like a bunch of code – that's the archive. You'll also see `tweet.js` show up in the sidebar to the left.

#### Old Twitter

1. Go to your <a href="https://twitter.com/settings/account" target="_blank">Twitter account settings</a>

2. Scroll down to "Your Tweet archive" and click the "Request your archive" button

3. Wait to get an email from Twitter. It takes longer if you have a lot of tweets, but in my experience not usually more than an hour

4. Follow the link in your email and download your archive from the page

5. Unzip the archive (it'll have a long name of letters and numbers) and open the folder

_Some users have noticed an issue with uploading `tweets.csv` on Windows, so I've added two workaround steps here. If you are using Mac or Linux, feel free to skip steps 6 and 8 (although it'll work just fine if you do them anyway)_

6. **(Windows only)** Rename `tweets.csv` to `tweets.txt`

7. Drag and drop the `tweets.csv` (or `tweets.txt` if you renamed it) file into this window. You'll see a bunch of numbers and symbols – that's the content of the csv. You'll also see `tweets.csv` (or `tweets.txt`) show up in the sidebar to the left.

8. **(Windows only)** In the sidebar on the left, hover over `tweets.txt` and click the down arrow to the right of the name. Click Rename, and change the name of the file back to `tweets.csv`.

### (Optional) Specify any tweets you don't want deleted

If you have some Tweets you just can't bear to part with, you can add them as exceptions so they don't get deleted along with the rest.

1. Go to the tweet on <a href="https://twitter.com" target="_blank">twitter.com</a> and click on it.

2. In the URL bar at the top of your browser, you should see `https://twitter.com/username/status/#####`. Copy all of those numbers at the end - this is the Tweet ID.

3. Open the file `config/default.js` in the list of files on the left.

4. Inside the `[ ]` brackets, add a new line with the Tweet ID in single quotes followed by a comma at the end, the same as `'1234567890',`.

5. Repeat for as many Tweets as you want to save. The final file should look like this:
   ```
   module.exports = {
     savedTweets: [
       '1234567890',
       '###########',
       '###########',
       '###########',
     ],
   }
   ```

### You're done with setup!

Hopefully that wasn't too hard! Once you're done with setup, click the `Show` button at the top of this page next to the cool sunglasses to move on to the last step.

Once you press `Delete My Tweets` and the code starts running, you'll need to leave this window open. Glitch automatically puts projects to sleep if they're not being accessed by anyone, but keeping this editor window open will make sure it stays awake until it's finished.

If you press the Logs button in the upper left of the page a panel will appear at the bottom of the screen. Once the deleter is running, you'll see your tweets streaming by as they get deleted. It's kind of fun to watch!
