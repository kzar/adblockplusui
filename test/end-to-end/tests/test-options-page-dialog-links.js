/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

const {afterSequence, beforeSequence} = require("../helpers");
const {expect} = require("chai");
const FooterChunk = require("../page-objects/footer.chunk");
const AboutDialogChunk = require("../page-objects/aboutDialog.chunk");
const AcceptableAdsDialogChunk =
  require("../page-objects/acceptableAdsDialog.chunk");
const HeartDialogChunk = require("../page-objects/heartDialog.chunk");
const GeneralPage = require("../page-objects/general.page");
const dataLinks = require("../test-data/data-links");

describe("test options page dialog links", () =>
{
  beforeEach(async() =>
  {
    await beforeSequence();
  });

  afterEach(async() =>
  {
    await afterSequence();
  });

  it("should open privacy policy page", async() =>
  {
    const footerChunk = new FooterChunk(browser);
    await footerChunk.clickAboutABPLink();
    const aboutDialogChunk = new AboutDialogChunk(browser);
    await aboutDialogChunk.clickPrivacyPolicyLink();
    await aboutDialogChunk.switchToPrivacyPolicyTab();
    expect(await aboutDialogChunk.getCurrentUrl()).to.equal(
      dataLinks.privacyPolicyUrl);
  });

  it("should open imprint page", async() =>
  {
    const footerChunk = new FooterChunk(browser);
    await footerChunk.clickAboutABPLink();
    const aboutDialogChunk = new AboutDialogChunk(browser);
    await aboutDialogChunk.clickEyeoGmbhLink();
    await aboutDialogChunk.switchToImprintTab();
    expect(await aboutDialogChunk.getCurrentUrl()).to.equal(
      dataLinks.imprintUrl);
  });

  it("should open webstore page", async() =>
  {
    const footerChunk = new FooterChunk(browser);
    await footerChunk.clickHeartButton();
    const heartDialogChunk = new HeartDialogChunk(browser);
    await heartDialogChunk.clickRateUsButton();
    if (browser.capabilities.browserName == "firefox")
    {
      await heartDialogChunk.switchToAddonsTab();
      expect(await heartDialogChunk.getCurrentUrl()).to.include(
        dataLinks.addonsUrl);
    }
    else if (browser.capabilities.browserName == "chrome")
    {
      await heartDialogChunk.switchToWebstoreCookiesAgreementTab();
      await browser.keys("Tab");
      await browser.keys("Tab");
      await browser.keys("Tab");
      await browser.keys("Tab");
      await browser.keys("Enter");
      expect(await heartDialogChunk.getCurrentUrl()).to.include(
        dataLinks.webstoreUrl);
    }
  }, 2);

  it("should open donate page", async() =>
  {
    const footerChunk = new FooterChunk(browser);
    await footerChunk.clickHeartButton();
    const heartDialogChunk = new HeartDialogChunk(browser);
    await heartDialogChunk.clickDonateButton();
    await heartDialogChunk.switchToDonateTab();
    expect(await heartDialogChunk.getCurrentUrl()).to.equal(
      dataLinks.donateUrl);
  }, 2);

  it("should open aa survey page", async() =>
  {
    const generalPage = new GeneralPage(browser);
    await generalPage.clickAllowAcceptableAdsCheckbox();
    const acceptableAdsDialogChunk = new AcceptableAdsDialogChunk(browser);
    await acceptableAdsDialogChunk.clickGoToSurveyButton();
    await acceptableAdsDialogChunk.switchToAASurveyTab();
    expect(await acceptableAdsDialogChunk.getCurrentUrl()).to.equal(
      dataLinks.aaSurveyUrl);
  }, 2);
});
