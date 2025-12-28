# Multi-Language Implementation Test Checklist

## Test URLs

### Landing Page

- [ ] `/` → Should redirect to detected locale (likely `/en`)
- [ ] `/en` → English landing page
- [ ] `/zh` → Chinese landing page
- [ ] `/es` → Spanish landing page
- [ ] `/fr` → French landing page
- [ ] `/de` → German landing page
- [ ] `/ja` → Japanese landing page
- [ ] `/pt` → Portuguese landing page
- [ ] `/ru` → Russian landing page

### Editor Pages

- [ ] `/en/test-note` → English editor for "test-note"
- [ ] `/zh/test-note` → Chinese editor for "test-note"
- [ ] `/fr/test-note` → French editor for "test-note"
- [ ] `/de/test-note` → German editor for "test-note"

### Pro Page

- [ ] `/en/pro` → English Pro/Roadmap page
- [ ] `/zh/pro` → Chinese Pro/Roadmap page
- [ ] `/fr/pro` → French Pro/Roadmap page
- [ ] `/es/pro` → Spanish Pro/Roadmap page

## Functional Tests

### Language Switcher

- [ ] Language switcher appears in header on all pages
- [ ] Clicking language switcher shows all 8 languages
- [ ] Current language is highlighted in the dropdown
- [ ] Switching language on landing page works (e.g., `/en` → `/fr`)
- [ ] Switching language on editor page preserves note name (e.g., `/en/test` → `/fr/test`)
- [ ] Switching language on pro page works (e.g., `/en/pro` → `/zh/pro`)
- [ ] Language preference is stored in localStorage
- [ ] Browser language detection works on first visit

### Translation Coverage

- [ ] Landing page: All text is translated (hero, features, FAQ, footer)
- [ ] Editor page: All UI elements are translated (buttons, tooltips, dialogs)
- [ ] Pro page: Feature descriptions and form labels are translated
- [ ] Password gate: Create/unlock messages are translated
- [ ] Toast notifications: Success/error messages are translated
- [ ] Dialogs: Delete confirmation, password change, version history are translated

### SEO & Metadata

- [ ] Page title shows in correct language in browser tab
- [ ] Meta description is localized
- [ ] `<html lang="...">` attribute matches selected locale
- [ ] Alternate language links in HTML `<head>` (hreflang tags)
- [ ] Open Graph tags show localized title/description
- [ ] Canonical URL includes locale path

### URL Structure

- [ ] All pages follow `/[locale]/...` pattern
- [ ] Invalid locale (e.g., `/xx`) redirects to `/en`
- [ ] Root `/` redirects to detected or default locale
- [ ] Trailing slashes handled correctly
- [ ] Editor note URLs work across all locales

### Browser Compatibility

- [ ] Chrome: Language switcher and translations work
- [ ] Firefox: Language switcher and translations work
- [ ] Safari: Language switcher and translations work
- [ ] Edge: Language switcher and translations work

### PWA Manifest

- [ ] Manifest includes default `lang: "en"`
- [ ] PWA installs correctly (if testing on mobile/desktop)
- [ ] App name displays correctly after installation

### Edge Cases

- [ ] Invalid site name shows 404 in correct language
- [ ] Switching language during editor session preserves content
- [ ] Password gate error messages are localized
- [ ] Date/time formatting respects locale (version history, last saved)
- [ ] Number formatting respects locale (character counts, etc.)

## Build & Deployment Checks

- [x] Production build compiles successfully (with warnings, no critical errors)
- [x] All locale files are included in build
- [x] Static generation works for all locale pages
- [ ] Vercel deployment preview shows correct routing
- [ ] Environment variables set correctly for production

## Known Issues / Notes

- Type errors in `crypto.ts` are pre-existing and not related to i18n changes
- ESLint warnings for `react-hooks/exhaustive-deps` and `@typescript-eslint/no-explicit-any` are acceptable
- Build compiles successfully despite type-checking warnings

## Next Steps (Post-Implementation)

- [ ] Add missing translations for any placeholder text
- [ ] Test on actual devices/browsers
- [ ] Monitor analytics for locale usage patterns
- [ ] Consider adding more languages based on user feedback
- [ ] Optimize bundle size per locale (if needed)
- [ ] Add language-specific SEO optimizations
