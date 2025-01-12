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
- Jest together with React Testing Library
- Framer Motion

### AWS specific:

- EC2 instance
- Route 53
- Systems Manager (SSM)

### External APIs used:

- OpenAI
- PostNord
- PayPal

## Tasks to build a complete online clothing shop

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
       **Notes:** To get persistence of the items in the cart between browser sessions, the usage of the local storage was implemented (as a custom hook). React's useContext hook was also used to create the shopping cart.
- [x] Checkout functionality. An example of steps with images: [How To Design A Great Ecommerce Checkout Flow](https://www.bolt.com/thinkshop/ecommerce-checkout-process-flow).  
       Typical steps: Initiate checkout / View cart > (Optional) Login / Register > Shipping information > Shipping method > Payment method / Billing information > Preview order > Place order > Confirmation > Account creation (Optional).  
       **Notes:** The checkout steps for Brilliantwear are: Information > Shipping > Payment > Complete. In the shipping step, after the user has entered their shipping infrormation, services points are fetched from the PostNord API from which the user can select one. Only guest (no log in) checkouts has been implemented. On the admin dashboard, a list of orders was added, clearly showing the payment status of each order.
- [x] Payment gateway. Considerations: PayPal, Visa, Swish, Stripe, Klarna, invoice.  
       **Notes:** In the payment step, PayPal is currently the only implemented payment method to checkout.

#### _Intermediate step:_

- [x] Build and and deploy the website (this far) on the EC2 instance. This is to earlier catch and work on bugs for building the app and avoid major problems in the end when trying to publish the full website. Make sure the website is secure enough to make it public since payments are now integrated on the website.

**Notes:** Since this is the first time I moved the backend to Next.js instead of using my Express server, I had to create a bind mount to save and access the product images. This resulted in some changes in the Dockerfile. During this step I also migrated from AWS SDK v2 to v3 as recommended. Enhanced the environment verification by introducing a NODE_ENV variable in the .env file, enabling distinction between app operation in development and production modes. Added my own log function with time stamps instead of using console.log because I felt a need for this. Additionally, I implemented various miscellaneous updates, such as incorporating a front-end loading icon for fetching images of the latest products on the home page, and more.

#### _Testing step:_

- [ ] Write tests for this Next.js app. Next.js about [testing](https://nextjs.org/docs/app/building-your-application/testing).

**Notes:** I used Jest together with the React Testing Library (RTL) because with these you can both write test for the UI and the backend code. I am not done with the testing yet since I had a lot of problems with setting everything up. I might consider trying out another testing library like Vitest later.

#### Third stage (design)

- [x] Split shop into Men's and Woman's clothing products.
- [x] Improve home page. Add new sections. Design improvements.
- [x] Add pages for Woman, Man and All Products. Make these pages look good and pretty similar.
- [x] Make a specific page for the shopping assistant and make this page look good with search queries from users.
- [x] Products filter & sorting features.
- [x] Improve the design of the product page.
- [x] Improve the navbar for the mobiles (smaller screens).
- [x] Create a new nicer looking favicon.
- [x] Other small points:
  - [x] Think about how you should solve the product image loading icon when the image can't be fetched.
  - [x] Look into the problem of odd number of products which don't look good on the pages with pagination (Woman, Man, All Products).

**Notes:** I started of this stage by creating web layouts and designs with Figma. The website now has two main separate woman and man pages with filters on the types of products (e.g. shoe, pants and jacket). Now a user can filter on type (e.g. Shoes or Jacket) at the same time as using sorting (e.g. price - low to high or latest products). Additionally, on the All Products page, it is possible to filter products by brand name. If a user uses the shopping assistant form on the home page, the user will be redirected to the dedicated shopping assistant page where the input already will be filled in for the request to go to OpenAI's API for product suggestions based on the user's input and the database. Otherwise, a user can search as usual through the form on the shopping assistant page which now has an improved design. On the product page, some customer benefits icons has been added as well as a section for related products (based on type and gender of the product in focus). Added new favicon to better align with the brand color of Brilliantwear. The navbar menu on smaller screens now looks better with a new transition animation using Framer Motion for opening and closing the menu. Now when a product image can't be fetched, instead of having an infinite loading icon, a default clothing icon image is shown.

#### Fourth stage (finalization)

- [x] Now once the backend part for the shopping assistant has been moved to Next.js backend, improve this functionality and make it faster and give better results. The shopping assistant seems a bit buggy, noticed during the intermediate step of building the app. Look into this and try to improve. Save the user searches from the shopping assistant in the DB for later use.
- [x] Page titles (text in the tab) and other metadata.
  - [x] Test if the Open Graph meta with image works after deploying the website. Also check the page title for the product page which is set dynamically to the brand of the product.
- [x] Review all fetch calls to ensure Next.js cache isn't causing any issues.
- [x] Information pages (footer links): About, Contact, Terms and Conditions
- [x] GDPR and personal information saved for completed checkouts.
- [x] Add cookie consent banner.
- [x] Remove the possibility for anyone to register and consequently access the dashboard only intended for admins.
- [x] Look at bugs related to using www.brilliantwear.se instead of brilliantwear.se
- [x] Add women's products to the website to make the distribution equal between men's and women's products. Also, think about adding types which are underrepresented.
- [x] Check all of the product pages to see that they work.
- [x] Deploy version 1.0.0 of Brilliantwear.

**Notes:** On the backend, some prompt engineering have been tried to improve the results from OpenAI's API, including cases where no products could be suggested resulting in returning an empty array. Each user input is now also saved in the database for later use and features. Page titles have been added to most pages on the website with dynamic titles on the product page with the brand of the product. General metadata has also been added including Open Graph data for social media linking. All of the information pages has been added. For the contact page with the form, a backend endpoint has been created to save the contact requests in the database. A page for a list of contact requests has also been added in the dashboard to read the requests. A Privacy Notice page has been incorporated to address GDPR compliance and provide information regarding the handling of user's personal data. Cookie banner added with link to more information about how cookies are used on the website. If a user accepts cookies, this setting is saved by using the localStorage. Now only real admins can access the dashboard. A new dashboard navigation bar has been added having a log out button and links to some of the dashboard pages. The bugs related to using www.brilliantwear.se was due to CORS. Therefore, in the config file for Brilliantwear of Nginx on the hosting server, a rule has been added to redirect all requests from brilliantwear.se to www.brilliantwear.se, the new main URL for Brilliantwear. New products added which makes the website more realistic and fun to browse. Some smaller bug fixes that were discovered during an iterative deployment phase: footer links gap on a newline, no shopping cart icon visible on Apple devices, right arrow (on some devices) instead of left on the home page in the horizontal scroll list, problem with Google's Inter font which did not work across browsers where instead others fonts were added for backup compatibility, "Return Home" link on the 404 page (known bug in Next.js), horizontal scroll on entire pages due to incorrect width on some elements.

### Tasks for extra features that are not necessary in the beginning

- Different languages
- Different currencies
- Search feature
- Log in for users
- Links to social media
- Dark mode (mostly for fun)
- Email order confirmation with receipt. You could use Postmark for this.

## Admin dashboard pages

A dashboard was created for admins of Brilliantwear where they can, for instance, add new products and check contact requests from users. To reach the dashboard pages an admin needs to log in. The following images show some of the dashboard pages.

<img src="https://github.com/CSCphilip/brilliantwear/blob/main/fullstack-next/dashboard-page-images/dashboard-home.png" style=" width:700px ; height:380px "  >

<img src="https://github.com/CSCphilip/brilliantwear/blob/main/fullstack-next/dashboard-page-images/dashboard-orders.jpg" style=" width:700px ; height:380px "  >

## Products on the website
The products on the webiste are not real. All of the product images have been taken from Unsplash which has this [license](https://unsplash.com/license) and can be used without any permissions. The product brand names have been made up.

## Copyright notice

Brilliantwear by Philip Andersson. All Rights Reserved. 
