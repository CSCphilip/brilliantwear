# Brilliantwear

Visit at: https://www.brilliantwear.se/

## Full Stack Web Development Technologies used:

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MongoDB
- JSON Web Token
- Docker & Swarm mode
- Nginx
- React.js
- TypeScript
- Bootstrap 5
- Next.js 13 (App router)
- Tailwind CSS

## Tasks to build a complete online clothing shop and go live

### The most essential tasks

#### First stage (initial and production ready set up)

- [x] Fix design bug with the horizontal scroll.
- [x] Design a good 404 page.
- [x] Move parts of the backend (currently with Express) to Next.js backend. Perhaps add backend API key to keep the backend secure. **Edit**: all backend (Express) API endpoints have now been implemented in Next.js API.
- [ ] Log in functionality for admins to for instance upload new products. Perhaps implement a dashboard.
- [ ] Database management. Improve the database for production ready use. For example: clothes in different sizes. Paging to not load all the products from databse. Set password on MongoDB (and username). This will require to use a .env file or similar on AWS and connect to the database using password which is done in the 'app/\_helpers/server/mongodb.ts' file.

#### Second stage (fundamental functional parts of an online shop)

- [ ] Shopping cart functionality. Add buy button in the product detail page. This will imply the necessity to start implementing the use of cookies. For example: save sessions with products in the cart.
- [ ] Checkout functionality
- [ ] Payment wall (1. Visa, 2. PayPal, 3. Swish)

#### Third stage (design)

- [ ] Split shop into Men's and Woman's clothing products
- [ ] Create pages for different clothing types (e.g. shoes, pants, shirt)
- [ ] Products filter & sorting feature
- [ ] Improve product detail page (the page for each product). Add the possibility to have multiple images. Functionality to select different sizes. Perhaps also for different colors.
- [ ] Create other overview pages on the website aside from the home page.
- [ ] Improve the navbar and menu. This is related to the categories of clothes and men's and women's clothes.

#### Fourth stage (finalization)

- [ ] Now once the backend part for the shopping assistant has been moved to Next.js backend, improve this functionality and make it faster and give better results.
- [ ] Improve home page. Add new sections (content). Design improvements.
- [ ] Information pages. E.g, about, contact, delivery.
- [ ] GDPR and personal information saved when buying products.
- [ ] Add cookie consent banner.

### Tasks for extra features that are not necessary in the beginning

- Different languages
- Different currencies
- Search feature
- Log in for users
- Links to social media
- Dark mode (mostly for fun)
