# Admin Gallery Guide

## Upload latest work
1. Open `https://YOUR-DOMAIN/admin`.
2. Sign in with the `ADMIN_DASHBOARD_TOKEN` configured for the deployment.
3. Open **Gallery**.
4. Choose the category.
5. Select one or more JPEG, PNG, or WebP images.
6. Review the selected count.
7. Click **Publish to gallery**.

Images are resized in the browser to a maximum edge of 2400 px and encoded as WebP before upload. The server stores them in the configured Supabase Storage bucket and creates a matching `gallery_images` row.

## Gallery categories
- Weddings
- Maternity
- Engagement
- Lifestyle & Birthdays
- Newborn, Kids & Family
- Christmas & Season
- Models & Boudoir
- Events
- Editorial
- Commercial
- Other

## Managing existing work
Use the gallery library to:
- Publish / unpublish an image
- Mark an image as featured
- Delete an image from Storage and the gallery database

Public pages only render images marked `is_published = true`.
