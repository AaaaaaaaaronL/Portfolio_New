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

## WakaTime

Update `wakatime.profileUrl` / embed if your share URL changes.
