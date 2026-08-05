# Editable content

All site copy, links, and structured data live in **`site.ts`**.

## Resumes

Place PDF files here:

- `resumes/Aaron_Lwi_Resume_IT.pdf`
- `resumes/Aaron_Lwi_Resume_CS.pdf`

Then sync to the public folder (required for downloads):

```bash
npm run sync:resumes
```

## WhatsApp

When ready, set `social.whatsapp` in `site.ts` to your `https://wa.me/...` link.

## Certificates

Update `certificates.items[].href` for credential links. LCCI stays `null` (display only).

## Photos

- Portrait used in dossier: `content/images/aaron-portrait.png`
- Also serve from: `public/images/aaron-portrait.png`
- Path in `site.ts`: `about.photo`
