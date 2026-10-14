# GarhKumo Platform (PHP + MySQL)

This is a new premium GarhKumo layer added without modifying your existing old theme files.

## Run locally

1. Create MySQL database/tables:
   - Import `schema.sql`
2. Update DB credentials in `includes/bootstrap.php` if needed.
3. Run using any PHP server:
   - `php -S localhost:8000`
4. Open:
   - `http://localhost:8000/index.php`

## Core pages

- `index.php` cinematic homepage
- `region.php?name=garhwal` and `region.php?name=kumaon`
- `destination.php?slug=kedarnath` dynamic destination page
- `destinations.php` all Uttarakhand destination index
- `hotels.php`, `weddings.php`, `planner.php`
- `signup.php`, `login.php`, `dashboard.php`, `wishlist.php`
- `admin/index.php` admin console
- `book.php` booking flow
- `api/weather.php` live weather endpoint
- `api/chatbot.php` AI travel assistant endpoint

## Phase 2 features enabled

- Live weather cards (Open-Meteo API)
- English/Hindi interface toggle
- AI travel assistant (rule-based endpoint for now)
- Destination review submission + admin approval
- Booking capture flow for hotels/weddings/packages
- Destination-level budget tables (solo/couple/family + budget/standard/luxury)
- Expanded destination coverage for major Uttarakhand places

## Notes

- For weather fetch, make sure `allow_url_fopen` is enabled in PHP.
- Frontend data rendering is now driven by `frontend/data/catalog.js` and `assets/js/frontend-render.js`.
- Database is used for storage flows (users, wishlist, bookings, reviews, contacts, search history).

## Admin usage

- Make a user admin directly in DB:
  - `UPDATE users SET role='admin' WHERE email='your-email@example.com';`
