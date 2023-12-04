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

### AWS specific:

- EC2 instance
- Route 53
- Systems Manager (SSM)

### External APIs used:
- OpenAI API
- PostNord API

## Tasks to build a complete online clothing shop and go live

### The most essential tasks

#### First stage (initial and production ready set up)

- [x] Fix design bug with the horizontal scroll.
- [x] Design a good 404 page.
- [x] Move parts of the backend (currently with Express) to Next.js backend. Perhaps add backend API key to keep the backend secure.  
       **Notes:** All backend (Express) API endpoints have now been implemented in Next.js API, except the log in / authorization functionality.
- [x] Log in functionality for admins to, for instance, upload new products. Implement a dashboard for admins.  
       **Notes:** Now when logged in, an admin is able to look at the dashboard, see all of the users in the MongoDB, and add & edit & delete users. Furthermore, it is possible for admins to upload new products that is added to the MongoDB. There is currently no button to logout.
- [x] Database management. Improve the database for production ready use. The following are examples of things to consider and perform. Pagination to not load all the products from database. Set password on MongoDB (and username). This will require to use a .env file or similar on AWS and connect to the database using password (change in code). Move to Docker. Regular backups of the database.  
       **Notes:** MongoDB is now running on Docker with authorization turned on. This means that the backend express API server has been modified to use the MongoDB on Docker. The backend API server uses AWS SSM to fetch the password for the MongoDB authorization. All of the collections from the MongoDB on host has beed imported to the MongoDB on Docker. I've built a backup script in JS which backups the brilliantwear db in the MongoDB running on Docker and togehter with the Docker compose file will make the script run every week (7 days). The backup is stored as a gzip on the EC2 instance under `/var/backups/mongodb`. Pagination has been implement on the Product Catalog page.

#### Second stage (fundamental functional parts of an online shop)

- [x] Shopping cart functionality. Add buy button in the product detail page.  
      **Notes:** To get the persistence of the items in the cart between browser sessions, the usage of the local storage was implemented (as a custom hook). React's useContext hook was also used to create the shopping cart. 
- [ ] Checkout functionality. An example of steps with images: [How To Design A Great Ecommerce Checkout Flow](https://www.bolt.com/thinkshop/ecommerce-checkout-process-flow). To reduce checkout abandonments, make the following steps as few and easy as possible.  
      Steps: ~~Initiate checkout / View cart~~ > ~~(Optional) Login / Register~~ > Shipping information > Shipping method > Payment method / Billing information > Preview order > Place order > Confirmation > ~~Account creation (Optional).~~
- [ ] Payment gateway. Current suggestions and priority: 1. PayPal, 2. Visa, 3. Swish. Other suggestions: Stripe, Klarna, invoice. Some recommendations (for payments in Sweden): [Val av betallösningar för din e-handel](https://webshopsguiden.se/betallosningar/).  
      60% of all online purchases are interrupted during the payment process. (Source: Bambora) To counteract this, smooth payment needs to be in place.

#### *Intermediate step:*

- [ ] Build and and deploy the website (this far) on the EC2 instance. This is to earlier catch and work on bugs for building the app and avoid major problems in the end when trying to publish the full website. Make sure the website is secure enough to make it public since payments are now integrated on the website.

#### *Testing step:*
- [ ] Write tests for this Next.js app using [Playwright](https://playwright.dev/). Next.js about [Playwright testing](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#playwright).

#### Third stage (design)

- [ ] Split shop into Men's and Woman's clothing products
- [ ] Create pages for different clothing types (e.g. shoes, pants, shirt)
- [ ] Products filter & sorting feature
- [ ] Improve product detail page (the page for each product). Add the possibility to have multiple images. Functionality to select different sizes of the clothes, think of a good way to do this since there are different size measurements (e.g. Small/Medium/Large and numbers which represent different sizes). This will require changes in the MongoDB. Perhaps also for different colors.
- [ ] Create other overview pages on the website aside from the home page.
- [ ] Improve the navbar and menu. This is related to the categories of clothes and men's and women's clothes.

#### Fourth stage (finalization)

- [ ] Now once the backend part for the shopping assistant has been moved to Next.js backend, improve this functionality and make it faster and give better results.
- [ ] Improve home page. Add new sections (content). Design improvements.
- [ ] Information pages. E.g, about, contact, delivery.
- [ ] GDPR and personal information saved when buying products.
- [ ] Add cookie consent banner.
- [ ] Remove the possibility for anyone to register and consequently access the dashboard only intended for admins.

### Tasks for extra features that are not necessary in the beginning

- Different languages
- Different currencies
- Search feature
- Log in for users
- Links to social media
- Dark mode (mostly for fun)
- Add button/function for logout of admins
