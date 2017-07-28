import { TwitterSentimentAnalysisPage } from './app.po';

describe('twitter-sentiment-analysis App', () => {
  let page: TwitterSentimentAnalysisPage;

  beforeEach(() => {
    page = new TwitterSentimentAnalysisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
