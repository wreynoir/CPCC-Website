# Schedule Update Guide

This guide shows you how to update the schedule section with different event descriptions, statuses, and RSVP links.

## Three Status Types

### 1. **Coming Soon** (RSVPs not open yet)
```html
<span class="schedule-status upcoming">Coming Soon</span>
```

### 2. **RSVP Now** (RSVPs are open - clickable link)
```html
<a href="https://partiful.com/e/YOUR_EVENT_LINK" target="_blank" rel="noopener" class="schedule-status open">RSVP Now</a>
```

### 3. **Event Complete** (event has passed)
```html
<span class="schedule-status completed">Event Complete</span>
```

## How to Update Events

### Example: Opening RSVPs for April 25 event

**Before:**
```html
<div class="schedule-item">
    <div class="schedule-info">
        <span class="schedule-date">April 25</span>
        <span class="schedule-label">Season Opener</span>
    </div>
    <span class="schedule-status upcoming">Coming Soon</span>
</div>
```

**After (with Partiful link):**
```html
<div class="schedule-item">
    <div class="schedule-info">
        <span class="schedule-date">April 25</span>
        <span class="schedule-label">Season Opener</span>
    </div>
    <a href="https://partiful.com/e/abc123xyz" target="_blank" rel="noopener" class="schedule-status open">RSVP Now</a>
</div>
```

### Example: Marking an event as complete

**After event has passed:**
```html
<div class="schedule-item">
    <div class="schedule-info">
        <span class="schedule-date">April 25</span>
        <span class="schedule-label">Season Opener</span>
    </div>
    <span class="schedule-status completed">Event Complete</span>
</div>
```

## Changing Event Descriptions

Simply update the text inside `<span class="schedule-label">`:

```html
<span class="schedule-label">Your new description here</span>
```

### Current Events (ready for your custom descriptions):
- April 25 - Season Opener
- May 30 - Spring Match
- June 27 - Summer Match
- July 25 - Midsummer Match
- August 22 - Late Summer Match
- September 19 - Fall Match
- October 17 - Autumn Match
- November 14 - Season Finale

## Visual Guide

| Status | Appearance | Use When |
|--------|-----------|----------|
| `upcoming` | Neutral beige badge | RSVPs haven't opened yet |
| `open` | Green badge with hover effect | RSVPs are open (clickable) |
| `completed` | Gray badge | Event has already happened |

## Quick Tips

1. **Always use `target="_blank" rel="noopener"`** when adding Partiful links for security
2. Change status from `upcoming` → `open` → `completed` as events progress
3. You can change event descriptions anytime by editing the `schedule-label` text
4. All dates remain the same - only descriptions and statuses change
