Adblock Plus for Chrome, Opera, Microsoft Edge and Firefox
==========================================================

This repository contains the platform-specific Adblock Plus source code for
Chrome, Opera, Microsoft Edge and Firefox. It can be used to build
Adblock Plus for these platforms.

Building
---------

### Building the extension

Run the following command in the project directory:

    npx gulp build -t {chrome|firefox} [-c development] [-m 3]

This will create a build with a name in the form
_adblockpluschrome-n.n.n.zip_ or _adblockplusfirefox-n.n.n.xpi_. These builds
are unsigned. They can be submitted as-is to the extension stores, or if
unpacked loaded in development mode for testing (same as devenv builds below).

You can pass the `-m 3` argument to generate a build that's compatible with
WebExtensions Manifest version 3. If omitted, it will generate a build for
Manifest version 2.

### Development environment

To simplify the process of testing your changes you can create an unpacked
development environment. For that run one of the following command:

    npx gulp devenv -t {chrome|firefox}

This will create a _devenv.*_ directory in the project directory. You can load
the directory as an unpacked extension under _chrome://extensions_ in
Chromium-based browsers, and under _about:debugging_ in Firefox. After making
changes to the source code re-run the command to update the development
environment, and the extension should reload automatically after a few seconds.

### Source distribution

In order to build a source distribution `.tar.gz` file, run the following
command:

        npx gulp source

### Customization

If you wish to create an extension based on our code and use the same
build tools, we offer some customization options.

This can be done by:

 - Specifying a path to a new configuration file relative to `gulpfile.js`
(it should match the structure found in `build/config/`).

        npx gulp {build|devenv} -t {chrome|firefox} --config config.js

 - Specifying a path to a new `manifest.json` file relative to `gulpfile.js`.
You should check `build/manifest.json` and `build/tasks/manifest.js` to see
how we modify it.

        npx gulp {build|devenv} -t {chrome|firefox} -p manifest.json

Running tests
-------------

### Unit tests

To verify your changes you can use the unit test suite located in the
`test/unit-tests` directory of the repository. In order to run the unit tests
go to the extension's Options page, open the JavaScript Console and type in:

    location.href = "tests/index.html";

The unit tests will run automatically once the page loads.

### External test runner

There is also an external test runner that can be invoked from the
command line in order to run the unit tests along some integration
tests on different browsers, and automatically run the linter as well.

On Windows, in order to use the test runner, in addition to setting up a Linux
environment as outlined above, you need to have Node.js installed in your native
Windows environment. Then run the commands below from within PowerShell or
cmd.exe (unlike when building the extension which needs to be done from Bash).

On Linux, newer versions of Chromium require `libgbm`.

Make sure the required packages are installed and up-to-date:

    npm install

Start the testing process for all browsers:

    npm test

Start the testing process in one browser only:

    npm test -- -g <Firefox|Chromium|Edge>

In order to run other test subsets, please check `-g` option on
[Mocha's documentation](https://mochajs.org/#-grep-regexp-g-regexp).

By default it downloads (and caches) and runs the tests against the
oldest compatible version and the latest release version of each browser.
In order to run the tests against a different version set the `CHROMIUM_BINARY`,
`FIREFOX_BINARY` or `EDGE_BINARY` environment variables. Following values are
accepted:

* `installed`
  * Uses the version installed on the system.
* `path:<path>`
  * Uses the binary located at the given path.
* `download:<version>`
  * Downloads the given version (for Firefox the version must be in the
    form `<major>.<minor>`, for Chromium this must be the revision number).
    This option is not available for Edge.

Filter tests subset uses [ABP Test pages](https://testpages.adblockplus.org/).
In order to run those tests on a different version of the test pages, set
the _TEST_PAGES_URL_ environment variable. Additionally, in order to accept
insecure `https` certificates set the _TEST_PAGES_INSECURE_ environment variable
to `"true"`.

[Edge Chromium](https://www.microsoft.com/en-us/edge/business/download) needs to
be installed before running the Edge tests.
