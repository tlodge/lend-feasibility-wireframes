You are designing low-fidelity, clean, accessible wireframes for a web-based intervention for people living with dementia and their carers.

The wireframes will be used by a developer as part of a wider technical specification. They do not need to be visually polished, branded, or final UI designs. The priority is clarity, simplicity, accessibility, and completeness of user flow.

Do not create glossy marketing-style screens. Create practical, developer-friendly wireframes with clear screen structure, labels, navigation, and behaviour notes.

## Terminology

Use **“story”** in user-facing labels and screen text.

Use **“narrative”** only in technical/design annotations if needed.

For example:

* User-facing: “Choose the stories you would like to see”
* Technical note: “Story metadata will be matched against narrative tags”

## Design principles

Design for users who may have cognitive, sensory, memory, attention, or confidence-related difficulties.

Use a mobile-first approach. Assume most users will access the intervention on a phone. Only provide desktop/tablet layout notes where the layout meaningfully changes.

The interface should be:

* Very simple
* Calm and uncluttered
* Easy to understand without explanation
* Accessible for people with dementia and carers
* Suitable for older users
* Clear enough for a developer to implement
* Consistent across screens

Use:

* Large touch targets
* Large readable text
* High contrast
* Plain English
* Clear headings
* One main action per screen where possible
* Simple back/next navigation
* Progress indicators where helpful
* Clear confirmation messages
* Minimal scrolling on key decision screens
* Forgiving interactions, so users can go back and change their choices

Avoid:

* Dense forms
* Small controls
* Hidden menus
* Complex interactions
* Reliance on icons alone
* Reliance on colour alone
* Decorative UI that makes the wireframes harder to interpret

## Output required

Create wireframes for three parts of the intervention:

1. Story selection
2. Story browsing
3. Story consumption

For each part, provide:

* The main screens
* The navigation between screens
* Key states, including default, selected, summary, confirmation, and uncertain/error states where relevant
* Mobile-first layout
* Desktop/tablet notes only where useful
* Short annotations explaining important interaction behaviour

Where there are choices, design the screens so that participants see **one question at a time**.

Where users are making selections, show:

* The question
* The possible options
* Whether one or many options can be selected
* Clear selected/unselected states
* A clear “Next” button
* A “Back” option
* A way to choose “Don’t know” or “Don’t mind” where provided

For multi-select screens, “Don’t know” and “Don’t mind” should behave as exclusive options unless otherwise stated.

## Important instruction about assumptions

Do not silently invent complex clinical, research, or technical logic.

Where something is unclear, mark it as a design or implementation question.

In particular, flag any uncertainty around:

* WhatsApp setup
* Returning users to the app that opened the link
* How “Other” free-text avoidance preferences should be handled
* The final wording and handling of identity-related story preferences
* Whether sample story recommendations are generated dynamically or manually selected
* Whether all story metadata will always be available

## Part 1: Story selection

Design the story selection area as a simple setup process.

The starting screen should show three sections:

1. Stories I would like to see
2. Stories I would not like to see
3. How and when my stories are delivered

Each section should show the current choice or default choice next to it.

Example default/current state:

* Stories I would like to see: Any
* Stories I would not like to see: None
* How and when my stories are delivered: Mid-morning every Monday, texted to my phone

Each section should be tappable/clickable and should take the user into a simple question-by-question flow.

At the bottom of the starting screen, include a primary button:

“I’m happy with these choices”

When pressed, show a confirmation message appropriate to the selected choices, for example:

“Thank you. You are all set up. The next story will be sent to your phone on Monday morning.”

### Story preference flow: “Stories I would like to see”

Design a one-question-per-screen flow using the supplied questions and options.

Users should be able to move backwards and forwards between screens.

After question L5 and question L9, show a sample story screen with two story summaries based on the user’s selections.

For each sample story, show:

* Story title
* Short summary
* Format: video, audio, text, or image
* Approximate length, if available
* Key tags, if useful
* A button to watch, read, or listen
* A clear option to continue without opening the sample

At the end of the flow, show a summary screen of all selections. Each item should be editable.

The summary screen should be simple and readable. Avoid showing too many dense tags in one block.

### Avoidance flow: “Stories I would not like to see”

Design a one-question flow using the supplied options.

At the end, show a summary screen. Each item should be editable.

If the user enters free text in “Other”, the summary must include the following warning:

“You have said you do not like stories about [other]. We will use this information for the follow-on study. However, the current study has not been designed to filter out this specific content, so there is still a risk that you will receive stories about or containing [other].”

This warning should be clear but not alarming.

### Delivery flow: “How and when my stories are delivered”

Design a simple question-by-question flow covering:

* Delivery method
* WhatsApp setup, only if WhatsApp is selected
* Time of day
* Day or days of the week

Users can choose up to three days per week.

At the end, show a summary screen of all delivery choices. Each item should be editable.

## Part 2: Story browsing

Design a browsing interface where users can search, filter, and open stories.

The screen should include:

* A search bar
* A simple filter area
* A list or grid of story cards
* Each story card should include:

  * Title
  * Short summary
  * Format tag: video, audio, text, or image
  * Key tags, such as dementia type, stage, tone, and region
  * Thumbnail where available
  * Generic placeholder image for text stories

The filters should correspond to the story discovery questions and include:

* Format
* Type of dementia
* Stage of dementia
* Tone
* Gender
* Sexual identity
* Ethnicity
* Region

On mobile, avoid a complex filter panel. Use a simple “Filter stories” button that opens a clear filter screen or drawer.

The filter interface should show active filters clearly and make it easy to remove them.

When a user opens a story, show a story detail screen before consumption. This should include:

* Story title
* Summary
* Trigger warnings, if any
* Format
* Approximate length, if available
* Tags
* Primary button to watch, read, or listen
* Secondary option to go back

During or after viewing a story, users should be able to give simple feedback:

* More like this
* Avoid in the future

If the user selects “Avoid in the future”, show a follow-up question asking what they did not like. This should be simple, non-judgemental, and easy to skip.

## Part 3: Story consumption

Design screens for consuming a story received by link, such as by text message, WhatsApp, or email.

The website is responsive, but assume the user is usually on a mobile device.

Design the following screens:

### C1: Summary screen

This is the first screen shown when the user opens a story link.

It should show:

* Story title
* Short summary
* Format
* Approximate length
* Trigger warnings, if any
* Primary action to continue
* Secondary action to not continue / return

The screen should help the user decide whether they want to consume the story.

### C2: Narrative screen

This screen displays the actual story.

The story may be:

* Video
* Audio
* Text
* Image

For video and audio, show a simple player with large controls. If autoplay is possible, it may start automatically. If autoplay is blocked, show a clear play button.

For text, show the story in large readable text. If the story is long, it may be split over multiple screens/pages.

For image, show the image clearly with any accompanying caption or text.

The user should always have a visible way to give feedback while the story is visible or playing.

Feedback options:

* More like this
* Avoid in the future

### C3: Feedback screen

If the user selects “Avoid in the future”, ask for more information.

The screen should ask:

“What would you like us to avoid in future stories?”

Provide simple selectable options where possible and an optional free-text box.

The tone should be supportive and neutral.

After feedback is submitted, show a simple confirmation.

If technically possible, after completion the user should be returned to where the link was triggered, such as their text message inbox, WhatsApp, or email app. If this is not possible, provide a simple completion screen.

## Accessibility requirements

The wireframes should demonstrate:

* Plain language
* Large buttons
* Clear focus order
* Clear page titles
* Consistent navigation
* No reliance on colour alone
* Avoidance of unnecessary icons
* No hidden critical actions
* Clear selected states
* Simple confirmation messages
* Ability to go back
* Forgiving interaction design
* Minimal cognitive load

Also show or annotate:

* How selected options are visually indicated
* How error or limit states are handled, for example choosing more than three delivery days
* How exclusive options work, for example “Don’t know” clearing other selected choices
* How users can recover if they make a mistake
* How trigger warnings are shown without overwhelming the user

## Deliverable format

Provide the wireframes as a structured set of screens.

For each screen, include:

* Screen name
* Purpose
* Main content
* Primary action
* Secondary action
* Notes for interaction behaviour
* Accessibility notes
* Any unresolved design or implementation questions

Also provide a simple user-flow map showing how the main screens connect.

Keep the wireframes practical and implementable. The goal is not to impress visually, but to make the intervention easy to understand, easy to build, and safe for the intended users.

## Detailed questions, options and selection rules

Use the detailed questions, options, and selection rules provided below as the source material for the setup flows.

Do not invent additional questions or options unless clearly marked as a suggestion.

[PASTE DETAILED QUESTIONS, OPTIONS AND SELECTION RULES HERE]
