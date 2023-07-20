"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.main = void 0;
var core_1 = require("@actions/core");
var github_1 = require("@actions/github");
var getInputs = function () {
    var branchName = process.env.GITHUB_HEAD_REF;
    if (!branchName) {
        throw new Error('Unable to retrieve the branch name.');
    }
    var githubToken = (0, core_1.getInput)('github-token') || process.env.GITHUB_TOKEN;
    if (!githubToken) {
        throw new Error('Unable to retrieve the GitHub token.');
    }
    return {
        atlassianDomain: (0, core_1.getInput)('atlassian-domain'),
        branchName: branchName,
        githubToken: githubToken
    };
};
var getIssueId = function (_a) {
    var branchName = _a.branchName;
    var regex = new RegExp("^[A-Z,a-z]{2,}-\\d{1,}");
    var result = regex.exec(branchName);
    if (!result) {
        return undefined;
    }
    return result[0];
};
var getCommentArguments = function (_a) {
    var atlassianDomain = _a.atlassianDomain, issueId = _a.issueId;
    var _b = github_1.context.payload, pullRequest = _b.pull_request, repository = _b.repository;
    var issueNumber = pullRequest === null || pullRequest === void 0 ? void 0 : pullRequest.number;
    if (!issueNumber) {
        throw new Error('Unable to retrieve the pull request number.');
    }
    if (!repository || !repository.full_name) {
        throw new Error('Unable to retrieve the repository name.');
    }
    var _c = repository.full_name.split('/'), owner = _c[0], repo = _c[1];
    return {
        body: "JIRA issue: ".concat(atlassianDomain, "/browse/").concat(issueId),
        issueNumber: issueNumber,
        owner: owner,
        repo: repo
    };
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, atlassianDomain, branchName, githubToken, issueId, _b, body, issueNumber, owner, repo, octokit, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = getInputs(), atlassianDomain = _a.atlassianDomain, branchName = _a.branchName, githubToken = _a.githubToken;
                issueId = getIssueId({
                    branchName: branchName
                });
                if (!issueId) {
                    (0, core_1.info)("Could not extract the issue ID from branch: ".concat(branchName));
                    return [2 /*return*/];
                }
                _b = getCommentArguments({
                    atlassianDomain: atlassianDomain,
                    issueId: issueId
                }), body = _b.body, issueNumber = _b.issueNumber, owner = _b.owner, repo = _b.repo;
                octokit = (0, github_1.getOctokit)(githubToken);
                return [4 /*yield*/, octokit.rest.issues.createComment({
                        body: body,
                        issue_number: issueNumber,
                        owner: owner,
                        repo: repo
                    })];
            case 1:
                _c.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                if (error_1 instanceof Error) {
                    (0, core_1.setFailed)(error_1);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.main = main;
if (process.env.NODE_ENV !== 'test') {
    void (0, exports.main)();
}
