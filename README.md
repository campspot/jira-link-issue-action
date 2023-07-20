# jira-link-issue-action 

[GitHub action](https://github.com/features/actions) for linking
[Jira](https://www.atlassian.com/software/jira) issues as a comment.

## Usage

```yaml
on:
  pull_request:
    types: [opened]

jobs:
  link-jira-issue:
    name: Link Jira Issue
    runs-on: ubuntu-latest
    steps:
      - name: Link Jira Issue
        uses: johnmarriott/jira-link-issue-action@v1.0.0
        with:
          atlassian-domain: 'https://jira.atlassian.net'
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Name               | Type   | Required? | Description                      |
| ------------------ | ------ | --------- | -------------------------------- |
| `atlassian-domain` | string | yes       | The domain of your Atlassian app |
| `github-token`     | string | yes       | The GitHub token for API access  |

## Notes

- This action works with pull requests only as it requires the branch name to
  determine the issue ID.

## License

[MIT](LICENSE)
