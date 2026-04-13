---
name: e-invoicing-mandate-tracker
description: Daily scan for global e-invoicing mandate changes — updates the tracker dashboard and logs any differences from the previous day.
---

You are maintaining a daily-updated Global E-Invoicing Mandate Tracker. Your job is to check for any changes to e-invoicing mandates worldwide, update the tracker, and post a summary to Slack.

## IMPORTANT: File Locations
The tracker files are stored in the user's local folder, which MUST be mounted before reading/writing. Use the request_cowork_directory tool to mount this path:
  /Users/jfeit/einvocing-country-overview

After mounting, the files will be accessible at the VM mount path. The folder contains:
- e-invoicing-tracker.jsx — the interactive React dashboard with all country data
- e-invoicing-changelog.md — running log of all changes

## What to do

### Step 1: Mount the folder and read the current tracker
First, mount the user's folder using request_cowork_directory with path "/Users/jfeit/einvocing-country-overview". Then read the e-invoicing-tracker.jsx file. This is a React component containing a `countries` data array with every tracked country's e-invoicing mandate details (status, effective dates, formats, platforms, summaries, etc.). There are currently 79 countries tracked across 6 regions (Europe, Middle East, Asia-Pacific, Latin America, Africa, North America).

### Step 2: Research latest changes
Run web searches for the latest e-invoicing mandate news and changes. Use queries like:
- "e-invoicing mandate changes [current month] [current year]"
- "e-invoicing new country mandates [current year]"
- "e-invoicing deadline updates [current month] [current year]"
- "VATupdate e-invoicing news this week"
- "global e-invoicing regulatory updates"

Focus on finding:
- New countries announcing e-invoicing mandates
- Changes to existing mandate timelines (delays, accelerations)
- New phases going live
- Changes to formats, platforms, or penalties
- New legislation passed or proposed

### Step 3: Compare and identify differences
Compare what you found against the current data in the tracker file. Identify:
- Countries whose status should change (e.g., "Upcoming" → "Live")
- Updated effective dates or next milestones
- New countries to add
- Changed summaries, formats, platforms, or penalty information

### Step 4: Update the tracker file
If there are ANY changes:
1. Edit the countries array in e-invoicing-tracker.jsx to reflect the updates
2. Update the LAST_UPDATED constant at the top of the file to today's date
3. Regenerate e-invoicing-tracker.html from the updated JSX data (same standalone HTML format as before — self-contained with React via CDN, all country data embedded inline)
4. Copy e-invoicing-tracker.html to index.html
5. Append a change log entry to e-invoicing-changelog.md in this format:

```
## [Today's Date]

### Changes detected:
- **[Country]**: [What changed] (Source: [URL])
- **[Country]**: [What changed] (Source: [URL])
```

If there are NO changes, still update LAST_UPDATED, regenerate the HTML, copy to index.html, and append:
```
## [Today's Date]
No mandate changes detected today. [Number] sources checked.
```

### Step 5: Post daily Slack message to #einvoicing-changes-tracker
Send a SINGLE Slack message to channel ID C0AS712CM9B every run. Do NOT post thread replies or multiple messages — everything goes in one message.

The message MUST contain:

**Section 1 — Changes (or "no changes")**
If changes were found:
```
:rotating_light: *E-Invoicing Mandate Changes — [Today's Date]*

Changes detected today:
• *[Country]*: [Brief description of what changed]

Sources: [list URLs]
```

If no changes:
```
:white_check_mark: *E-Invoicing Mandate Update — [Today's Date]*

No mandate changes detected today. [Number] sources checked.
```

**Section 2 — Links**
Always include:
```
:clipboard: Full tracker: <https://jeremyfeit-spec.github.io/einvoicing-tracker/|Live Dashboard> | Interactive dashboard: open `e-invoicing-tracker.jsx` in Cowork
```

IMPORTANT: Send exactly ONE message. Do NOT send thread replies. Do NOT post a full country status list — just the changes and links above.

### Step 6: GitHub push — HANDS OFF
**DO NOT run any git commands from the sandbox.** The sandbox cannot push to GitHub (the token is blocked by the egress proxy), and any failed git operations leave stale lock files that also block the local push script.

The GitHub push is handled automatically by a separate launchctl job on Jeremy's Mac that runs `github-push.sh` after the Cowork task updates the files. That script already includes lock file cleanup.

Just confirm in your summary that the local files (JSX, HTML, index.html, changelog) were updated successfully — the push will happen automatically.

### Step 7: Summary
Provide a brief summary of what was found, updated, and posted to Slack.

## Important notes
- Always update the LAST_UPDATED date in the JSX file, even if no mandate data changed
- Preserve the exact React component structure — only modify the data and the date
- Be conservative: only update data when you find credible sources (government portals, KPMG, VATupdate, Basware, official tax authority announcements)
- If a source is ambiguous or unconfirmed, note it in the changelog but don't update the tracker until confirmed
- ALWAYS send the Slack message, even on days with no changes
- ALWAYS read the tracker file to build the country list dynamically — never use a stale hardcoded list
- ALWAYS mount /Users/jfeit/einvocing-country-overview first before trying to read/write files
- NEVER run git commands — this is critical. Git operations from the sandbox leave lock files that break the local push script.
