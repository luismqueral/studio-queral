every few weeks i need to submit a recording request for a meeting at work. it's a servicenow form with about a dozen fields, most of which are the same every time. approver, app, legal question, two consent checkboxes. the only things that change are the event title and the date/time.

the form lives at a URL i can never remember, on a portal i rarely visit. every time i fill it out i think "i should automate this." and every time i close the tab and forget.

this time i didn't forget.

## the constraint

chrome extensions aren't allowed at work (or at least, not easily). so the usual approach — build a little extension that talks to google calendar and fills the form — was off the table.

i also didn't want to build anything that required hosting, authentication, or maintenance. i wanted something i could set up once and forget about.

## what i tried first

**URL parameters.** some servicenow forms let you pre-populate fields by appending query parameters to the URL. i found the internal variable names by inspecting the DOM:

- `vc_event_title` for the event title
- `vc_req_date_time` for the start date
- `vc_req_end_date_time` for the end date
- `checkbox_agreement` and `checkbox_agreement2` for the consent boxes

appended `&vc_event_title=Test+Recording` to the URL. loaded the page. field was empty. the service portal doesn't support URL parameter pre-fill.

**servicenow REST API.** tried hitting `/api/sn_sc/servicecatalog/items/{sys_id}` directly from the browser console. got a 401. the API requires separate authentication that the portal session doesn't provide.

## what worked: two bookmarklets

a bookmarklet is just javascript saved as a bookmark URL. you click it like any other bookmark, but instead of navigating somewhere, it runs code on the current page. no extension needed. no install permissions. just a bookmark.

the problem is cross-origin: a bookmarklet running on google calendar can't reach into a servicenow tab and fill fields. so i split it into two:

**bookmarklet 1: "grab event"**

this one runs on a google calendar event in edit mode. it scrapes three things from the page:

- the event title (from the input with `aria-label="Title"`)
- the start date and time (`aria-label="Start date"`, `aria-label="Start time"`)
- the end time (`aria-label="End time"`)

it joins them with pipe delimiters, copies the string to the clipboard, and opens the servicenow form in a new tab.

**bookmarklet 2: "fill form"**

this one runs on the servicenow form. it reads the clipboard, splits on pipes, and fills in:

- **event title** — straight text input
- **start and end datetimes** — parsed from google calendar's format (`Apr 17, 2026` + `11:35am`) into servicenow's format (`2026-04-17 11:35:00`)
- **both consent checkboxes** — clicked
- **requested for** — "Luis Queral" via select2 search
- **approver** — "Tracie Lee" via select2 search
- **app** — "Google Meet (includes Live Stream)" via select2 dropdown
- **provide details** — "Other" via select2 dropdown
- **legal permission** — "No" via select2 dropdown
- **"please specify" field** — focused and ready to type

the select2 fields were the hardest part. servicenow's service portal uses select2 widgets for dropdowns and people-lookup fields. you can't just set `.value` on the underlying input — you have to open the dropdown, type into the search box, wait for results to load, then simulate a click on the matching option. each one takes about 2 seconds, and only one can be open at a time, so they're staggered with timeouts.

the whole fill takes about 12 seconds. i type the reason in the "please specify" field, hit submit, and i'm done.

## the flow

1. open the calendar event i want to record
2. click "grab event" in my bookmarks bar
3. servicenow opens in a new tab
4. click "fill form" in my bookmarks bar
5. type the reason
6. submit

two clicks and a sentence. the form that used to take a few minutes of copy-pasting and clicking now takes about 15 seconds.

## what i learned

the DOM is the API. when the actual API is locked down and extensions aren't allowed, inspecting form fields and writing targeted javascript is often enough. servicenow's portal uses angular under the hood, so setting values requires dispatching `input` and `change` events to trigger the digest cycle. for select2 widgets, you have to speak select2's language — `jQuery.trigger("mouseup")` on result elements, not `click`.

bookmarklets are underrated. they're the simplest form of browser automation: no build step, no permissions, no review process. they live in your bookmarks bar and just work. the tradeoff is that they're fragile — if servicenow changes a field ID or google calendar changes an aria-label, they break. but for an internal tool you use a few times a month, that's fine. you fix it when it breaks.

the clipboard is a good bridge between origins. you can't reach across tabs, but you can write to the clipboard on one page and read it on another. `navigator.clipboard.writeText()` and `navigator.clipboard.readText()` are the glue that makes the two-bookmarklet pattern work.
