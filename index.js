const {Octokit} = require("@octokit/rest");
const {throttling} = require("@octokit/plugin-throttling");
const prompt = require("co-prompt");

const { exportIssues } = require("./export.js");
const co = require("co");
const options = require("./options");

co(function* () {
    const retObject = {};
    retObject.githubUrl =
        options.github_enterprise || "https://api.github.com";
    retObject.token = options.token || "";
    if (retObject.token === "") {
        retObject.token = yield prompt(
            "Token (get from https://github.com/settings/tokens): "
        );
    }
    retObject.exportFileName = options.exportFileName || false;
    retObject.exportAttributes = options.exportAttributes || false;
    if (retObject.exportAttributes) {
        retObject.exportAttributes = retObject.exportAttributes
            .split(",")
            .map((i) => i.trim());
    }
    retObject.exportComments = options.exportComments || false;
    retObject.exportAll = options.exportAll || false;
    retObject.verbose = options.verbose || false;

    retObject.userOrOrganization = options.organization || "";
    if (retObject.userOrOrganization === "") {
        retObject.userOrOrganization = yield prompt("User or organization: ");
    }

    retObject.repo = options.repository || "";
    if (retObject.repo === "") {
        retObject.repo = yield prompt("Repository: ");
    }

    retObject.filterAttributes = options.filterAttributes || false;
    if (retObject.filterAttributes) {
        retObject.filterAttributes = retObject.filterAttributes
            .split(",")
            .map((i) => i.trim());
    }

    retObject.state = options?.state ?? "all";
    retObject.labels = options?.labels ?? null;
    retObject.since = options?.since ?? null;

    console.log("Config:")
    console.log(retObject);

    return retObject;
}).then(
    function (values) {
        const ThrottledOctokit = Octokit.plugin(throttling);
        const octokit = new ThrottledOctokit({
            auth: values.token,
            userAgent: "github-csv-tools",
            baseUrl: values.githubUrl,
            throttle: {
                onRateLimit: (retryAfter, options) => {
                    console.warn(
                        `Request quota exhausted for request ${options.method} ${options.url}`
                    );

                    if (options.request.retryCount === 0) {
                        // only retries once
                        console.log(`Retrying after ${retryAfter} seconds!`);
                        return true;
                    }
                },
                onAbuseLimit: (retryAfter, options) => {
                    // does not retry, only logs a warning
                    console.warn(
                        `Abuse detected for request ${options.method} ${options.url}`
                    );
                },
            },
        });
        exportIssues(octokit, values);
    },
    function (err) {
        console.error("ERROR", err);
    }
);