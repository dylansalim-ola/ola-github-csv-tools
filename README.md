## Ola Github project to CSV
### Benefits of this over the original repo
- Support multiple filtering
- Do not need to re-input into the command line everytime we need to generate something else

### Usage
Prerequisite: [Install Node.js](https://nodejs.org/en/), then run this to install:
```bash
    npm install
```

Then, Update the option in options.js
```
{
    token: "YOUR_GITHUB_TOKEN",
    repository: "veeka",
    organization: "OlaChat",
    filterAttributes: "milestone: 2.1.0, assignee: dylansalim-ola", // Generated fields filtering
    labels: false, // Bug OR Story
    state: "closed", // all OR open OR closed
    since: false, // YYYY-MM-DD
}
```

Then, run the following to generate the CSV
```bash
    npm run generate-csv 
```


### Filtering criteria are as follows:
#### All fields are case-sensitive
| Filtering criteria | Default | Notes                                                                                                                                        | Sample Data                                 | 
|--------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| filterAttributes   | ""      | Filter attributes according to the Field and correspond value to filter, Comma-separated list of attributes (columns), <br/> Sample fields:  | "milestone: 2.1.0, assignee: dylansalim-ola" |
| labels             | false   | A list of comma separated label names.                                                                                                       | "Bug" OR "Story"                            |
| state              | "all"   | The state of the milestone. Either open, closed, or all.                                                                                     | "open" OR "closed" OR "all"               |
| since              | false   | Only show notifications updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.                          | "2022-09-10"                                |


### filterAttributes available fields

| Filtering criteria | Notes           | Sample Data                                 | 
|--------------------|-----------------|---------------------------------------------|
| number             | Issue number    | "milestone: 2.1.0, assignee: dylansalim-ola" |
| title              | Issue Title     | "Flutter 3 - FlatButton, RaisedButton, and OutlineButton Migration"                                 |
| milestone          | Issue milestone | "2.1.0"                                     |
| user               | Issue creator   | "junwei-ola"                                |
| assignee           | Issue assignee  | "dylansalim-ola"                            |

### Tokens

For all actions, the tool will ask you to input a GitHub token. To obtain this token:

1. Go to <https://github.com/settings/tokens>
2. Click "Generate New Token"
3. Check on `repo`
4. Copy/paste the token provided when the tool asks for it.

### What's next
H5 display and CSV generator

https://github.com/olachat/veeka/issues/4564