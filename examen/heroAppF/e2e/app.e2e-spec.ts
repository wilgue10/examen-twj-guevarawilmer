import { HeroAppFPage } from './app.po';

describe('hero-app-f App', () => {
  let page: HeroAppFPage;

  beforeEach(() => {
    page = new HeroAppFPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
