import * as assert from 'assert';
import * as util from '../../util';


suite("Slugify function.", () => {
    const headings = {
        "foo _italic_ bar": "foo-italic-bar",
        // "foo_foo_bar": "foo_foo_bar",
        "`a.b` c": "ab-c",
        "Via [remark-cli][]": "via-remark-cli",
        "1. not a list": "1-not-a-list"
    }

    const headings_github = {
        "foo _italic_ bar": "foo-italic-bar",
        "foo_foo_bar": "foo_foo_bar",
        "`a.b` c": "ab-c",
        "Via [remark-cli][]": "via-remark-cli",
        "1. not a list": "1-not-a-list",
        "1) not a list": "1-not-a-list",
        "foo & < >  \"foo\"": "foo---foo"
    }

    const headings_gitlab = {
        "foo _italic_ bar": "foo-italic-bar",
        "foo_foo_bar": "foo_foo_bar",
        "`a.b` c": "ab-c",
        "Via [remark-cli][]": "via-remark-cli",
        "1. not a list": "1-not-a-list",
        "1) not a list": "1-not-a-list",
        "foo & < >  \"foo\"": "foo-foo",
        "1": "anchor-1" // GitLab adds "anchor-" before digit-only IDs
    }

    for (const heading of Object.keys(headings)) {
        const slug = headings[heading];
        test(`(VSCode) ${heading} → ${slug}`, () => {
            assert.strictEqual(util.slugify(heading, "vscode"), slug);
        });
    }

    for (const heading of Object.keys(headings_github)) {
        const slug = headings_github[heading];
        test(`(GitHub) ${heading} → ${slug}`, () => {
            assert.strictEqual(util.slugify(heading, "github"), slug);
        });
    }

    for (const heading of Object.keys(headings_gitlab)) {
        const slug = headings_gitlab[heading];
        test(`(GitLab) ${heading} → ${slug}`, () => {
            assert.strictEqual(util.slugify(heading, "gitlab"), slug);
        });
    }
});
