# Al-Dar Apparel Website Prototype
## Business Documentation & Requirements

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Website Navigation & User Journey](#website-navigation--user-journey)
3. [Page-by-Page Breakdown](#page-by-page-breakdown)
4. [Visual Assets Requirements](#visual-assets-requirements)
5. [Video Production Requirements](#video-production-requirements)
6. [User Experience Features](#user-experience-features)
7. [Content Requirements](#content-requirements)
8. [Next Steps & Deliverables](#next-steps--deliverables)

---

## Executive Summary

This document outlines the Al-Dar Apparel website prototype, detailing every section, feature, and requirement from a business perspective. The prototype showcases our premium thobe and abaya collections with a focus on elegant design, superior user experience, and brand storytelling.

**Purpose:** To guide content creation, asset production, and final implementation of the Al-Dar Apparel e-commerce platform.

**Target Audience:** Luxury apparel customers seeking premium traditional and contemporary Middle Eastern fashion.

---

## Website Navigation & User Journey

### Navigation Bar Structure

**[Add Screenshot: Navigation Bar]**

The navigation bar is the primary gateway for users to explore Al-Dar Apparel's collections. It features:

**Left Side:**
- **Al-Dar Logo** - Clickable logo that returns users to the homepage
  - *Current Status:* Logo image (`aldar-logo.png`) is implemented
  - *Requirement:* Logo should be high-resolution, professional, and maintain brand identity

**Center Navigation:**
- **Home** - Returns to landing page
- **For Him** - Dropdown menu with:
  - Men's Collection (Main page)
  - Formal Thobes
  - Evening Thobes
  - Casual Thobes
- **For Her** - Dropdown menu with:
  - Women's Collection (Main page)
  - Formal Abayas
  - Evening Abayas
  - Casual Abayas
- **About** - Company story and heritage
- **Contact** - Contact information and location

**Right Side Icons:**
- **Search Icon** - Future functionality for product search
- **Wishlist Icon** - Save favorite products
- **Shopping Cart Icon** - View and manage cart items (functional)
  - *Feature:* Displays cart count badge
  - *Functionality:* Clicking opens cart with added items
- **Menu Toggle** - Mobile navigation menu

**User Path Options:**
1. **Browse Path:** Home → For Him/For Her → Product Collection → Product Detail
2. **Direct Path:** Home → For Him/For Her → Product Detail
3. **Informational Path:** Home → About → Contact

---

## Page-by-Page Breakdown

### 1. Homepage (index.html)

**[Add Screenshot: Full Homepage View]**

#### Hero Section

**[Add Screenshot: Hero Video Section]**

**Purpose:** Create an immediate, impactful first impression showcasing Al-Dar Apparel's brand essence.

**Current Implementation:**
- Full-width video background that auto-plays
- Elegant "Explore" call-to-action button
- Clean, minimal design with brand focus

**Video Requirements:**
- **Location:** Hero section (top of homepage)
- **Aspect Ratio:** 16:9 (Landscape)
- **Duration:** 30-60 seconds recommended
- **Content:** Showcase both male and female models wearing Al-Dar products
- **Style:** Cinematic, elegant, with background music
- **Tone:** Premium, sophisticated, showcasing craftsmanship
- **Current Status:** Placeholder video exists, but **professional production required**
- **File Path:** `assets/videos/main video 4.34.36 AM 4.34.47 AM.mp4`

**Business Value:** Establishes brand premium positioning, creates emotional connection, and encourages exploration.

---

#### For Him / For Her Showcase Section

**[Add Screenshot: For Him / For Her Section]**

**Purpose:** Direct customers to gender-specific collections with visual appeal.

**Layout:**
- Two large, side-by-side image cards
- "For Him" on the left, "For Her" on the right
- Each card features:
  - Large background image
  - Overlay text with section title
  - "SHOP" button linking to respective collection pages

**Image Requirements:**

**For Him Card:**
- **Aspect Ratio:** 16:9 (Landscape)
- **Dimensions:** Recommended 1920x1080px minimum
- **Content:** Professional photography of male model in Al-Dar thobe
- **Style:** Elegant, modern, showcasing product quality
- **Current Status:** Placeholder exists
- **Requirement:** Professional product photography needed

**For Her Card:**
- **Aspect Ratio:** 16:9 (Landscape)
- **Dimensions:** Recommended 1920x1080px minimum
- **Content:** Professional photography of female model in Al-Dar abaya
- **Style:** Elegant, sophisticated, showcasing product elegance
- **Current Status:** Placeholder exists
- **Requirement:** Professional product photography needed

**Business Value:** Creates clear product category separation, improves navigation, and increases conversion to collection pages.

---

#### Why Al-Dar Apparel Section

**[Add Screenshot: Why Al-Dar Apparel Section]**

**Purpose:** Build trust, showcase craftsmanship, and communicate brand values.

**Layout:**
- Two-column design:
  - **Left Column:** Text content with badge icon
  - **Right Column:** Video placeholder showcasing craftsmanship

**Content:**
- **Headline:** "Superior Quality and Craftsmanship"
- **Description:** Brand messaging about premium materials, innovation, attention to detail
- **Call-to-Action:** "Discover Our Craft" link

**Video Requirements:**
- **Location:** Right side of "Why Al-Dar Apparel" section
- **Aspect Ratio:** 16:9 (Landscape)
- **Content:** Behind-the-scenes craftsmanship video
- **Style:** Similar to Giorgio Armani craft videos - elegant, detailed, showing artistry
- **Duration:** 60-90 seconds recommended
- **Focus:** Material quality, tailoring process, attention to detail
- **Current Status:** Placeholder exists
- **Requirement:** Professional production video required

**Business Value:** Builds brand credibility, differentiates from competitors, and communicates value proposition.

---

#### Footer Section

**[Add Screenshot: Footer Section]**

**Purpose:** Provide comprehensive site navigation, contact information, and brand reinforcement.

**Current Implementation:**
- Footer image (`footer.png`) with fallback HTML structure
- Brand logo and name
- Social media icons (Facebook, Instagram, LinkedIn)
- Contact information:
  - Phone: +971 4 353 2519
  - Email: hello@aldarapparel.com
  - Address: Ali Bin Abi Talib Road, Near Dubai Museum, Bur Dubai, Dubai, UAE
- Copyright and privacy information

**Requirement:** Footer image should be professionally designed to match brand guidelines.

---

### 2. Men's Collection Page (men.html)

**[Add Screenshot: Men's Collection Page]**

#### Hero Section

**[Add Screenshot: Men's Hero Video Section]**

**Purpose:** Create immersive experience for men's collection.

**Video Requirements:**
- **Location:** Top of men's collection page
- **Aspect Ratio:** 16:9 (Landscape)
- **Content:** Exclusive men's collection video
- **Style:** Showcasing various thobe styles, formal and casual
- **Models:** Male models in different settings
- **Duration:** 45-60 seconds
- **Current Status:** Placeholder video exists (`him section vdieo 4.34.46 AM.mp4`)
- **Requirement:** Professional video production needed

---

#### Product Grid Section

**[Add Screenshot: Product Grid - Men's Collection]**

**Layout:**
- Responsive grid displaying 6 product cards
- Each product card features:
  - Product image
  - Product name
  - Brand name
  - Price (AED format)
  - Badges (Trending, Best Seller)
  - Wishlist icon

**Product Image Requirements:**
- **Aspect Ratio:** 1:1 (Square)
- **Dimensions:** Recommended 1000x1000px minimum
- **Content:** Professional product photography
- **Style:** Clean white or neutral background
- **Focus:** Product details, fabric texture, quality
- **Current Status:** First product uses `men thobe.png`, others are placeholders
- **Requirement:** Professional product photography for all items

**Product Card Features:**
- Clickable - Opens product detail page
- Badge system for highlighting featured products
- Wishlist functionality (future implementation)

**User Journey:**
Clicking a product card → Opens Product Detail Page (`product-detail.html`)

---

### 3. Women's Collection Page (women.html)

**[Add Screenshot: Women's Collection Page]**

**Structure:** Identical to men's collection page, tailored for women's products.

**Hero Video:**
- **Location:** Top of women's collection page
- **Aspect Ratio:** 16:9
- **Content:** Women's collection showcase
- **Current Status:** Placeholder video exists (`Her section Video 4.34.46 AM.mp4`)
- **Requirement:** Professional video production needed

**Product Grid:**
- Same structure as men's page
- First product uses `Women Thobe.png`
- **User Journey:** Clicking product → Opens `product-detail-women.html`

---

### 4. Product Detail Page

**[Add Screenshot: Product Detail Page - Men's]**

**[Add Screenshot: Product Detail Page - Women's]**

**Purpose:** Provide comprehensive product information and enable purchase decisions.

**Layout:**
- Two-column design:
  - **Left Column:** Product images (2 images side-by-side)
  - **Right Column:** Product information and purchase options

**Product Images:**
- **Aspect Ratio:** Vertical/Portrait orientation
- **Dimensions:** Recommended 800x1200px or similar portrait ratio
- **Content:** Multiple angles of the product
- **Current Status:** 
  - Men's page: `men thobe.png` and `men thob 2.png`
  - Women's page: `Women Thobe.png` and `Women thobe 2.png`
- **Requirement:** Professional product photography with multiple angles

**Product Information Section:**
- Product name
- Price
- Discount badge (if applicable)
- Size selection dropdown
- "Add to Bag" button (functional)
- Wishlist button
- Product description/details

**Features:**
- **Add to Bag Functionality:** Fully functional
  - Validates size selection
  - Updates cart count
  - Shows confirmation feedback
  - Stores items in browser storage
- **Cart Icon:** Clickable, displays cart contents

**Business Value:** Converts browsers to buyers by providing detailed product information and seamless purchase experience.

---

### 5. About Page (about.html)

**[Add Screenshot: About Page]**

**Purpose:** Share brand story, heritage, and values.

**Content Areas:**
- Company history and founding story
- Brand mission and values
- Craftsmanship philosophy
- Visual storytelling elements

**Requirement:** Professional content writing and brand photography needed.

---

### 6. Contact Page (contact.html)

**[Add Screenshot: Contact Page]**

**Purpose:** Provide multiple ways for customers to reach Al-Dar Apparel.

**Information Displayed:**
- Phone number
- Email address
- Physical address
- Contact form (if implemented)

**Requirement:** Contact form functionality may need backend integration.

---

## Visual Assets Requirements

### Image Placeholders & Specifications

#### 1. Navigation Logo
- **File:** `assets/images/aldar-logo.png`
- **Status:** ✅ Implemented
- **Requirement:** High-resolution, transparent background preferred

#### 2. Homepage Hero Video
- **Aspect Ratio:** 16:9
- **Status:** Placeholder video exists
- **Requirement:** Professional video production

#### 3. For Him / For Her Showcase Images
- **Aspect Ratio:** 16:9 (Landscape)
- **Dimensions:** 1920x1080px minimum
- **Status:** Placeholders exist
- **Requirement:** Professional lifestyle photography

#### 4. Craftsmanship Video (Why Al-Dar Section)
- **Aspect Ratio:** 16:9
- **Status:** Placeholder exists
- **Requirement:** Professional behind-the-scenes video production

#### 5. Product Grid Images
- **Aspect Ratio:** 1:1 (Square)
- **Dimensions:** 1000x1000px minimum
- **Status:** Some products have images, others are placeholders
- **Requirement:** Professional product photography for all items

#### 6. Product Detail Images
- **Aspect Ratio:** Portrait (Vertical)
- **Dimensions:** 800x1200px or similar portrait ratio
- **Status:** Sample images exist
- **Requirement:** Professional multi-angle product photography

#### 7. Footer Image
- **File:** `assets/images/footer.png`
- **Status:** ✅ Implemented
- **Requirement:** Professional design matching brand guidelines

---

## Video Production Requirements

### Video 1: Homepage Hero Video
**[Add Screenshot: Hero Video Placeholder]**

- **Location:** Top of homepage
- **Aspect Ratio:** 16:9 (Landscape)
- **Duration:** 30-60 seconds
- **Content:** 
  - Showcase both male and female models
  - Various Al-Dar products
  - Elegant, cinematic style
  - Background music
- **Purpose:** Brand introduction and emotional connection
- **Current Status:** Placeholder video exists (`main video 4.34.36 AM 4.34.47 AM.mp4`)
- **Professional Requirement:** 
  - High-quality production
  - Professional models
  - Professional cinematography
  - Music licensing
  - Color grading

### Video 2: Men's Collection Hero Video
**[Add Screenshot: Men's Hero Video Placeholder]**

- **Location:** Top of men's collection page
- **Aspect Ratio:** 16:9
- **Duration:** 45-60 seconds
- **Content:**
  - Exclusive men's collection showcase
  - Various thobe styles (formal, evening, casual)
  - Professional male models
  - Different settings/locations
- **Current Status:** Placeholder exists (`him section vdieo 4.34.46 AM.mp4`)
- **Professional Requirement:** Same as Video 1

### Video 3: Women's Collection Hero Video
**[Add Screenshot: Women's Hero Video Placeholder]**

- **Location:** Top of women's collection page
- **Aspect Ratio:** 16:9
- **Duration:** 45-60 seconds
- **Content:**
  - Exclusive women's collection showcase
  - Various abaya styles (formal, evening, casual)
  - Professional female models
  - Elegant settings
- **Current Status:** Placeholder exists (`Her section Video 4.34.46 AM.mp4`)
- **Professional Requirement:** Same as Video 1

### Video 4: Craftsmanship Video
**[Add Screenshot: Craftsmanship Video Placeholder]**

- **Location:** "Why Al-Dar Apparel" section
- **Aspect Ratio:** 16:9
- **Duration:** 60-90 seconds
- **Content:**
  - Behind-the-scenes craftsmanship
  - Material quality showcase
  - Tailoring process
  - Attention to detail
  - Style reference: Giorgio Armani craft videos
- **Purpose:** Build brand credibility and showcase quality
- **Current Status:** Placeholder exists
- **Professional Requirement:**
  - Professional videography
  - Close-up shots of craftsmanship
  - Elegant, sophisticated tone
  - Possibly voiceover or subtitles

---

## User Experience Features

### Shopping Cart Functionality

**Current Implementation:**
- ✅ Add to Bag button functional
- ✅ Cart count badge updates
- ✅ Cart icon opens cart view
- ✅ Items stored in browser storage
- ✅ Visual feedback on button click

**User Flow:**
1. Browse products
2. Select size
3. Click "Add to Bag"
4. See confirmation (button changes color/text)
5. Cart count updates
6. Click cart icon to view items
7. Cart displays all added items with details

**Business Value:** Enables seamless shopping experience, reduces friction in purchase process.

### Navigation Features

- **Dropdown Menus:** "For Him" and "For Her" expand to show subcategories
- **Active State:** Current page highlighted in navigation
- **Mobile Responsive:** Menu collapses on mobile devices
- **Logo Navigation:** Click logo to return to homepage

### Product Badges

- **Trending Badge:** Highlights popular products
- **Best Seller Badge:** Identifies top-selling items
- **Purpose:** Guide customer decisions and highlight featured products

### Wishlist Feature

- **Current Status:** Icon present, functionality to be implemented
- **Purpose:** Allow customers to save favorite products for later

---

## Content Requirements

### Product Information

**For Each Product:**
- Product name
- Brand name
- Price (AED format)
- Size options
- Product description
- Material information
- Care instructions (if needed)

**Current Status:** Placeholder content exists
**Requirement:** Professional product descriptions and accurate information

### Brand Messaging

**Homepage:**
- "Superior Quality and Craftsmanship" section
- Brand story and values
- Call-to-action messaging

**Requirement:** Professional copywriting aligned with brand voice

---

## Website Paths & Structure

### File Structure
```
Al-Dar Apparel/
├── index.html (Homepage)
├── men.html (Men's Collection)
├── women.html (Women's Collection)
├── product-detail.html (Men's Product Detail)
├── product-detail-women.html (Women's Product Detail)
├── about.html (About Us)
├── contact.html (Contact Us)
├── products.html (All Products)
├── assets/
│   ├── images/
│   │   ├── aldar-logo.png
│   │   ├── footer.png
│   │   ├── men thobe.png
│   │   ├── men thob 2.png
│   │   ├── Women Thobe.png
│   │   └── Women thobe 2.png
│   └── videos/
│       ├── main video 4.34.36 AM 4.34.47 AM.mp4
│       ├── him section vdieo 4.34.46 AM.mp4
│       └── Her section Video 4.34.46 AM.mp4
├── css/
│   ├── styles.css
│   ├── components.css
│   └── responsive.css
└── js/
    ├── main.js
    └── navigation.js
```

### User Navigation Paths

**Path 1: Browse & Purchase**
Home → For Him/For Her → Product Collection → Product Detail → Add to Bag → Cart

**Path 2: Direct Product Access**
Home → For Him/For Her → Product Detail (if featured product clicked)

**Path 3: Information Seeking**
Home → About → Contact

**Path 4: Collection Exploration**
Home → For Him → Men's Collection → Browse Products → Product Detail

---

## Next Steps & Deliverables

### Immediate Requirements

#### 1. Professional Video Production
- [ ] Homepage hero video (30-60 seconds, 16:9)
- [ ] Men's collection video (45-60 seconds, 16:9)
- [ ] Women's collection video (45-60 seconds, 16:9)
- [ ] Craftsmanship video (60-90 seconds, 16:9)

**Deliverables:**
- High-resolution video files
- Proper file naming convention
- Optimized for web (compressed but high quality)

#### 2. Professional Photography

**Product Photography:**
- [ ] All product images (1:1 aspect ratio, 1000x1000px)
- [ ] Product detail images (portrait orientation, multiple angles)
- [ ] Lifestyle photography for "For Him/For Her" sections (16:9, 1920x1080px)

**Deliverables:**
- High-resolution images
- Consistent styling and lighting
- Proper file naming convention

#### 3. Content Creation
- [ ] Product descriptions for all items
- [ ] Brand messaging refinement
- [ ] About page content
- [ ] SEO-friendly content

#### 4. Design Assets
- [ ] Footer image finalization (if needed)
- [ ] Logo optimization (if needed)
- [ ] Social media icons/graphics

### Future Enhancements

- [ ] Search functionality implementation
- [ ] Wishlist functionality
- [ ] Checkout process
- [ ] Payment integration
- [ ] User accounts/login
- [ ] Product reviews/ratings
- [ ] Newsletter signup
- [ ] Blog section

---

## Technical Notes (For Reference)

**Note:** This section is for technical teams only. The prototype is built with:
- HTML5 structure
- CSS3 styling with responsive design
- JavaScript for interactivity
- Local storage for cart functionality
- Video and image placeholders with fallbacks

**Color Scheme:**
- Primary colors maintain brand identity
- Orangish-pink accent colors (#C85A6B, #E4A5B0, #B04657)
- Elegant white and black contrast

---

## Screenshot Placement Guide

Please add screenshots in the following locations (marked with **[Add Screenshot: ...]** throughout this document):

1. **Navigation Bar** - Full navigation bar view
2. **Full Homepage View** - Complete homepage layout
3. **Hero Video Section** - Homepage hero video area
4. **For Him / For Her Section** - Showcase section on homepage
5. **Why Al-Dar Apparel Section** - Craftsmanship section
6. **Footer Section** - Complete footer view
7. **Men's Collection Page** - Full page view
8. **Men's Hero Video Section** - Video area on men's page
9. **Product Grid - Men's Collection** - Product cards layout
10. **Women's Collection Page** - Full page view
11. **Product Detail Page - Men's** - Complete product detail view
12. **Product Detail Page - Women's** - Complete product detail view
13. **About Page** - About page layout
14. **Contact Page** - Contact page layout
15. **Hero Video Placeholder** - Showing placeholder design
16. **Men's Hero Video Placeholder** - Placeholder design
17. **Women's Hero Video Placeholder** - Placeholder design
18. **Craftsmanship Video Placeholder** - Placeholder design

---

## Conclusion

This prototype establishes a strong foundation for Al-Dar Apparel's online presence. The focus now shifts to professional content creation, video production, and photography to bring the vision to life. Each section has been carefully designed to showcase the brand's premium positioning and create an exceptional user experience.

**Key Success Factors:**
1. Professional video production that matches brand quality
2. High-quality product photography
3. Consistent brand messaging
4. Seamless user experience
5. Mobile-responsive design

For questions or clarifications regarding any section, please refer to this document or contact the development team.

---

**Document Version:** 1.0  
**Last Updated:** [Current Date]  
**Prepared For:** Al-Dar Apparel Business Team
