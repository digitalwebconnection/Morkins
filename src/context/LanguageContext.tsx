import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navbar & Navigation
    nav_products: 'Products',
    nav_bestsellers: 'Best Sellers',
    nav_newarrivals: 'New Arrivals',
    nav_about: 'About',
    nav_search_placeholder: 'Search Skincare...',
    nav_signout: 'Sign Out',
    nav_signin: 'Sign In',

    // Product Header/Footer Translation
    sec_favorites: 'Shop Our Favorites',
    sec_favorites_desc: 'Clean, nutrient-rich formulations made to restore and nourish your skin barrier.',
    btn_show_more: 'Show All Products',
    btn_show_less: 'Show Fewer Products',
    sec_cust_favs: 'Customer Favorites',
    sec_bestsellers: 'Best Sellers',
    sec_natural_glow: 'Naturally Radiant',
    sec_glow_desc: 'Every bottle is packed with biological-grade botanicals that yield active results for your daily skin rejuvenation.',
    btn_add_to_cart: 'Add to Cart',

    // Product Categories
    cat_serums: 'Serums',
    cat_moisturizers: 'Moisturizers',
    cat_treatments: 'Treatments',
    cat_cleansers: 'Cleansers',
    cat_masks: 'Masks',

    // Badges
    badge_anti_aging: 'Anti-Aging',
    badge_repair: 'Repair',
    badge_popular: 'Popular',

    // Slide Content
    slide_1_title: 'GET YOUR AI-POWERED SKIN DIAGNOSIS IN SECONDS',
    slide_1_sub: 'Plus a 100% personalized, science-backed skincare regimen',
    slide_1_btn: 'TAKE THE QUIZ',
    spot_1_0_label: 'Breakouts',
    spot_1_0_tooltip: 'Dermal clarity index indicates minimal active congestion.',
    spot_1_1_label: 'Dryness',
    spot_1_1_tooltip: 'Epidermal moisture retention level at cell boundaries.',
    spot_1_2_label: 'Firmness',
    spot_1_2_tooltip: 'Collagen alignment and elasticity score in facial muscles.',

    slide_2_title: 'CLINICALLY DOSED, BIOLOGICALLY ACTIVE FORMULAS',
    slide_2_sub: 'High-efficacy active compounds calibrated to rebuild your dermal lipid barrier.',
    slide_2_btn: 'EXPLORE CLINICAL STUDY',
    spot_2_0_label: 'pH Balance',
    spot_2_0_tooltip: 'Matches natural acidity levels for cell viability.',
    spot_2_1_label: 'Absorption',
    spot_2_1_tooltip: 'Deep lipid carrier penetration into basal cell layers.',

    slide_3_title: 'PURE, COLD-PRESSED BOTANICAL EXTRACTS',
    slide_3_sub: 'Sourcing pristine plants at peak potency to restore biocompatible cellular vitality.',
    slide_3_btn: 'DISCOVER OUR HARVEST',
    spot_3_0_label: 'Wildcrafted',
    spot_3_0_tooltip: 'Ethically wild-harvested plant lipids.',
    spot_3_1_label: 'Purity Retention',
    spot_3_1_tooltip: 'Active plant enzymes preserved via cold-pressing.',

    // Products Names
    prod_1_name: 'Hyaluronic Acid Hydrating Serum',
    prod_2_name: 'Centella Calming Gel Cream',
    prod_3_name: 'Bakuchiol Wrinkle Defense Cream',
    prod_4_name: 'Niacinamide Pore Refiner',
    prod_5_name: 'Ceramide Barrier Repair Cream',
    prod_6_name: 'Salicylic Acid Exfoliating Cleanser',
    prod_7_name: 'Peptide Complex Firming Serum',
    prod_8_name: 'Squalane Cleansing Oil',
    prod_9_name: 'Vitamin E Hydrating Mask',
    prod_10_name: 'AHA/BHA Resurfacing Liquid',
    prod_101_name: 'Squalane Radiance Glow Serum',
    prod_101_desc: 'Ultra-lightweight skin oil that deeply locks in essential moisture.',
    prod_102_name: 'Lavender Calming Hand Cream',
    prod_102_desc: 'Soothes rough, dry hands with nourishing organic lavender essence.',

    // Hero / Home Page
    hero_title: 'Organic Skincare Made with Pure Love',
    hero_subtitle: 'Hand-harvested botanical ingredients crafted for absolute skin radiance.',
    hero_cta: 'Shop Routine',
    btn_add_to_bag: 'Add To Bag',
    btn_added: 'Added!',

    // Auth Modal
    auth_login: 'Login',
    auth_signup: 'Sign Up',
    auth_forgot: 'Forgot Password?',
    auth_create_acc: 'Create Account',
    auth_email: 'Email address',
    auth_phone: 'Phone number (optional)',
    auth_name: 'Full name',
    auth_password: 'Password',
    auth_confirm_pass: 'Confirm Password',
    auth_verify_otp: 'Verify OTP',
    auth_send_otp: 'Send Verification OTP',
    auth_google: 'Continue with Google',

    // User Profile
    profile_sanctuary: 'Your Sanctuary',
    profile_sub: 'Manage details, trace orders, & share the glow',
    profile_vip: 'VIP Club Member',
    profile_loyalty_pts: 'Loyalty Points',
    profile_pts_desc: 'Next reward at 500',
    profile_orders_placed: 'Orders Placed',
    profile_orders_desc: '1 In Transit',
    profile_wishlist_rout: 'Wishlist Routine',
    profile_wishlist_desc: 'Ready to shop',
    profile_carbon: 'Carbon Offset',
    profile_carbon_desc: '100% Eco-conscious',
    profile_tab_info: 'Personal Information',
    profile_tab_orders: 'Order History',
    profile_tab_tracking: 'Order Tracking',
    profile_tab_addresses: 'Saved Addresses',
    profile_tab_wishlist: 'My Wishlist',
    profile_tab_referral: 'Refer a Friend',
    profile_tab_prefs: 'Preferences',
    profile_edit: 'Edit Profile',
    profile_save: 'Save Changes',
    profile_cancel: 'Cancel',
    profile_name_lbl: 'Full Name',
    profile_email_lbl: 'Email Address',
    profile_phone_lbl: 'Phone Number',
    profile_vip_title: 'Botanical Circle Club Member',
    profile_vip_desc: 'You are in the premium tier. Enjoy lifetime free greenhouse express shipping, exclusive access to quarterly limited harvests, and double reward points on new skincare collections.',
    
    // Addresses
    addr_label: 'Address Label (e.g. Home Sanctuary)',
    addr_street: 'Street Address',
    addr_city: 'City, State',
    addr_zip: 'Zip / Postal Code',
    addr_save: 'Save Address',
    addr_add: 'Add Address',
    addr_empty: 'No saved addresses found. Register shipping locations to simplify your checkout.',
    
    // Tracking
    track_title: 'Delivery Tracking',
    track_ref: 'Shipment Reference',
    track_est: 'Estimated Arrival',
    track_placed: 'Placed',
    track_placed_desc: 'Order placed & confirmed',
    track_processing: 'Processing',
    track_processing_desc: 'Eco-sourced & packaged',
    track_shipped: 'Shipped',
    track_shipped_desc: 'Dispatched with Carbon-offset courier',
    track_out: 'Out for Delivery',
    track_out_desc: 'With local dispatch vehicle',
    track_delivered: 'Delivered',
    track_delivered_desc: 'Handed over or left in mailbox',
    track_carrier: 'Carrier Service',
    track_code: 'Tracking Code',

    // Referral
    ref_title: 'Share The Botanical Glow',
    ref_subtitle: 'Gift your loved ones $15 off their first premium organic skincare collection. When they place an order, you will automatically receive a $15 credit in your dashboard.',
    ref_btn: 'Copy link',
    ref_copied: 'Copied!',
    ref_balance: 'Balance Available',
    ref_successful: 'Successful Referrals',

    // Settings
    pref_language: 'Preferred Language',
    pref_sub_drop: 'New collection drops & special harvests',
    pref_sub_routine: 'Monthly skincare routines & clinic invites',

    // Footer
    foot_mission: 'Crafting premium plant-based organic skincare lines for healthy skin and a healthy planet.',
    foot_routine: 'Subscribe for Routines',
    foot_sub_btn: 'Subscribe',
    foot_placeholder_email: 'Your email address',
    foot_subscribed: '✓ Thank you for subscribing!',
    foot_follow_us: 'Follow Us',

    // Trust Features
    feat_cod_title: 'Cash on Delivery',
    feat_cod_desc: 'Pay when you receive',
    feat_deliv_title: 'All-India Delivery',
    feat_deliv_desc: 'We deliver pan-India',
    feat_auth_title: '100% Authentic',
    feat_auth_desc: 'Genuine products only',
    feat_return_title: 'Easy Returns',
    feat_return_desc: '7-day hassle-free returns',
    feat_pay_title: 'Secure Payments',
    feat_pay_desc: 'UPI, Cards & Net Banking',

    // Footer Columns
    foot_col_products: 'Our Products',
    foot_col_support: 'Customer Support',
    foot_col_company: 'Our Company',

    // Footer Links
    foot_prod_1: 'Cleansers & Face Wash',
    foot_prod_2: 'Toners & Mists',
    foot_prod_3: 'Serums & Treatments',
    foot_prod_4: 'Moisturizers & Creams',
    foot_prod_5: 'Sunscreens & SPF',
    foot_prod_6: 'Eye Care',
    foot_prod_7: 'Face Masks & Scrubs',
    foot_prod_8: 'Lip Care',

    foot_supp_1: 'FAQs',
    foot_supp_2: 'Return & Refund Policy',
    foot_supp_3: 'Privacy Policy',
    foot_supp_4: 'Terms & Conditions',
    foot_supp_5: 'Shipping Policy',
    foot_supp_6: 'Track My Order',
    foot_supp_7: 'Contact Us',
    foot_supp_8: 'WhatsApp Support',

    foot_comp_1: 'About Morkins',
    foot_comp_2: 'Our Story',
    foot_comp_3: 'Our Mission & Values',
    foot_comp_4: 'Ingredients We Use',
    foot_comp_5: 'Dermatologist Approved',
    foot_comp_6: 'Sustainability',
    foot_comp_7: 'Cruelty Free Promise',
    foot_comp_8: 'Blog',

    // Signature Glow Serum Banner
    banner_sig_title: 'Signature Glow Serum',
    banner_sig_desc: 'Drench your skin in absolute brilliance. Our bio-active Vitamin C and Hyaluronic Acid complex works at a cellular level to target dark spots and smooth fine lines.',
    banner_sig_btn: 'SHOP NOW',

    // Follow Our Journey
    journey_title: 'Follow Our Journey',
    journey_desc: 'Tag us @morkinsofficial to share your routine and be featured.',

    // Trending on Feed
    feed_title: 'TRENDING ON FEED',
    feed_desc: "Real skin, unfiltered results. Tap any creator's video to instantly shop their daily Morkins routine.",
    feed_quick_shop: 'Quick Shop',
    feed_key_ing: 'Key Ingredients',
    feed_reviews: 'reviews',
    feed_added: 'Added',

    // Feed products
    feed_prod_1_name: 'Glow Boosting Serum',
    feed_prod_1_desc: 'A lightweight, fast-absorbing serum packed with 10% Vitamin C and hyaluronic acid to instantly illuminate your skin tone, target dark spots, and provide all-day deep hydration.',
    feed_prod_1_ing: '98% Organic Vitamin C, Pure Hyaluronic Acid, Ferulic Acid, Licorice Root Extract',
    
    feed_prod_2_name: 'Barrier Restore Cream',
    feed_prod_2_desc: "A rich nourishing cream designed to rebuild and protect your skin's moisture barrier. Enriched with ceramides, squalane, and soothing centella asiatica to calm redness.",
    feed_prod_2_ing: 'Ceramides NP/AP/EOP, Sugarcane Squalane, Centella Asiatica (Cica), Organic Shea Butter',
    
    feed_prod_3_name: 'Rosehip Replenishing Oil',
    feed_prod_3_desc: '100% organic cold-pressed rosehip seed oil. Rich in essential fatty acids and antioxidants to promote cellular regeneration, smooth fine lines, and restore natural elasticity.',
    feed_prod_3_ing: 'Cold-pressed Rosa Canina (Rosehip) Seed Oil, Vitamin E (Tocopherol)',
    
    feed_prod_4_name: 'Vitamin C Bright Gel',
    feed_prod_4_desc: 'A cooling gel-moisturizer that revives dull, tired skin. Packed with citrus extracts and kakadu plum to deliver a burst of antioxidants and locks in oil-free moisture.',
    feed_prod_4_ing: 'Kakadu Plum Extract, Aloe Vera Leaf Juice, Green Tea Leaf Extract',
    
    feed_prod_5_name: 'Daily Sun Protect SPF 50',
    feed_prod_5_desc: 'An ultra-sheer, broad-spectrum mineral SPF 50 sunscreen. Leaves a completely transparent, dewy finish with zero white cast, doubling as a hydrating primer.',
    feed_prod_5_ing: 'Non-Nano Zinc Oxide 12%, Green Tea Extract, Sea Buckthorn, Hyaluronic Acid',
    
    feed_prod_6_name: 'Squalane Facial Oil',
    feed_prod_6_desc: "Pure sugarcane-derived squalane oil. Mirrors your skin's natural sebum to seal in moisture, balance oil production, and enhance your skin glow without clogging pores.",
    feed_prod_6_ing: '100% Sugarcane-Derived Squalane',

    // Skin Quiz
    quiz_builder: 'Interactive Routine Builder',
    quiz_discover: 'Discover Your Daily Regimen',
    quiz_subtitle: 'Answer two quick questions about your skin, and let our formula engine build your optimized 3-step skincare regimen.',
    quiz_q1: 'QUESTION 01',
    quiz_q1_title: 'How would you describe your skin?',
    quiz_q2: 'QUESTION 02',
    quiz_q2_title: 'What is your primary skin goal?',
    quiz_back: '← Back to step 1',
    quiz_diagnosis: 'Your Diagnosis',
    quiz_val_indiv: 'Individual Value',
    quiz_val_bundle: 'Bundle Price (15% Off)',
    quiz_btn_adding: 'Adding Regimen...',
    quiz_btn_added: '✓ Regimen Added To Bag',
    quiz_btn_add_entire: 'Add Entire Regimen',
    quiz_quick_add: '+ Quick Add',

    // Quiz Options
    quiz_opt_dry_lbl: 'Dry / Flaky',
    quiz_opt_dry_desc: 'Lacks oil, feels tight, shows texture.',
    quiz_opt_oily_lbl: 'Oily / Congested',
    quiz_opt_oily_desc: 'Excess shine, enlarged pores, acne-prone.',
    quiz_opt_dull_lbl: 'Dull / Uneven Tone',
    quiz_opt_dull_desc: 'Pigmentation, spots, lack of radiance.',
    quiz_opt_sens_lbl: 'Sensitive / Aging',
    quiz_opt_sens_desc: 'Prone to redness, fine lines, fatigue.',

    // Goals Options
    quiz_goal_glow_lbl: 'Drape in Dewy Glow',
    quiz_goal_glow_desc: 'Hydrate skin cells, restore barrier.',
    quiz_goal_calm_lbl: 'Sooth & Calm Skin',
    quiz_goal_calm_desc: 'Lessen active redness, clear breakouts.',
    quiz_goal_renew_lbl: 'Refine & Rejuvenate',
    quiz_goal_renew_desc: 'Plump skin layers, target aging signs.',

    // Quiz Recommendations
    quiz_rec_dry_title: 'Nourishing Hydration Regimen',
    quiz_rec_dry_desc: 'Designed specifically to drench parched skin cells, repair compromised lipid barriers, and seal in lasting botanical moisture.',
    quiz_rec_oily_title: 'Balancing Clarity Regimen',
    quiz_rec_oily_desc: 'Formulated to regulate excess sebum, clarify clogged pores, and provide oil-free hydration for a fresh, matte finish.',
    quiz_rec_dull_title: 'Radiance & Glow Regimen',
    quiz_rec_dull_desc: 'Infused with high-potency Vitamin C and botanical brighteners to target hyperpigmentation and reveal glowing skin.',
    quiz_rec_sens_title: 'Restorative Barrier Regimen',
    quiz_rec_sens_desc: 'Meticulously crafted with bio-compatible ceramides and botanical complexes to soothe redness and lock in youth-preserving nutrients.',

    // Auth Drawer
    auth_portal: 'Account Portal',
    auth_drawer_login: 'Login',
    auth_drawer_signup: 'Sign Up',
    auth_drawer_email: 'Email Address',
    auth_email_placeholder: 'e.g. skin@morkins.com',
    auth_drawer_password: 'Password',
    auth_drawer_forgot: 'Forgot?',
    auth_or_continue: 'Or Continue With',
    auth_drawer_google: 'Google Account',
    auth_fullname: 'Full Name',
    auth_fullname_placeholder: 'e.g. Jane Doe',
    auth_country: 'Country',
    auth_drawer_phone: 'Phone (Opt)',
    auth_phone_placeholder: '555-0199',
    auth_confirm_password: 'Confirm Password',
    auth_create_account: 'Create Account',
    auth_forgot_desc: "Enter your email address and we'll dispatch a secure OTP code to reset your password.",
    auth_drawer_send_otp: 'Send Reset OTP',
    auth_otp_desc: 'Please enter the 6-digit OTP code sent to',
    auth_verify: 'Verify',
    auth_resend_in: 'Resend in',
    auth_resend_code: 'Resend Code',
    auth_new_password: 'New Password',
    auth_confirm_new_password: 'Confirm New Password',
    auth_update_password: 'Update Password',
    auth_welcome: 'Welcome back',
    auth_logged_in: 'Logged in to your premium profile',
    auth_name_label: 'Name:',
    auth_email_label: 'Email:',
    auth_phone_label: 'Phone:',
    auth_country_label: 'Country:',
    auth_continue_shop: 'Continue Shopping',
    auth_logout: 'Log Out',
    auth_back: 'Back',
    auth_processing: 'Processing...',
  },
  hi: {
    // Navbar & Navigation
    nav_products: 'उत्पाद',
    nav_bestsellers: 'सबसे लोकप्रिय',
    nav_newarrivals: 'नए आगमन',
    nav_about: 'हमारे बारे में',
    nav_search_placeholder: 'खोजें...',
    nav_signout: 'लॉग आउट',
    nav_signin: 'लॉग इन',

    // Product Header/Footer Translation
    sec_favorites: 'हमारे पसंदीदा उत्पाद खरीदें',
    sec_favorites_desc: 'आपकी त्वचा की सुरक्षा परत को पोषण देने और उसे पुनः जीवंत करने के लिए स्वच्छ और पोषक तत्वों से भरपूर उत्पाद।',
    btn_show_more: 'सभी उत्पाद देखें',
    btn_show_less: 'कम उत्पाद देखें',
    sec_cust_favs: 'ग्राहकों के पसंदीदा',
    sec_bestsellers: 'सबसे लोकप्रिय उत्पाद',
    sec_natural_glow: 'स्वाभाविक रूप से चमकदार',
    sec_glow_desc: 'हर बोतल जैविक वानस्पतिक तत्वों से भरपूर है जो आपकी दैनिक त्वचा पुनर्जीवन के लिए सक्रिय परिणाम देती है।',
    btn_add_to_cart: 'कार्ट में डालें',

    // Product Categories
    cat_serums: 'सीरम',
    cat_moisturizers: 'मॉइस्चराइज़र',
    cat_treatments: 'उपचार',
    cat_cleansers: 'क्लींजर',
    cat_masks: 'मास्क',

    // Badges
    badge_anti_aging: 'एंटी-एजिंग',
    badge_repair: 'रिपेयर',
    badge_popular: 'लोकप्रिय',

    // Slide Content
    slide_1_title: 'कुछ सेकंड में अपनी त्वचा का एआई-आधारित निदान प्राप्त करें',
    slide_1_sub: 'साथ ही एक 100% व्यक्तिगत और विज्ञान-समर्थित स्किनकेयर रूटीन',
    slide_1_btn: 'क्विज शुरू करें',
    spot_1_0_label: 'मुँहासे',
    spot_1_0_tooltip: 'त्वचा की स्पष्टता सूचकांक न्यूनतम सक्रिय मुँहासे दर्शाता है।',
    spot_1_1_label: 'रूखापन',
    spot_1_1_tooltip: 'कोशिकाओं की परतों में एपिडर्मल नमी बनाए रखने का स्तर।',
    spot_1_2_label: 'दृढ़ता',
    spot_1_2_tooltip: 'चेहरे की मांसपेशियों में कोलेजन का संरेखण और लचीलापन स्कोर।',

    slide_2_title: 'नैदानिक ​​रूप से जांची गई, जैविक रूप से सक्रिय फार्मूले',
    slide_2_sub: 'त्वचा की लिपिड सुरक्षात्मक परत को फिर से बनाने के लिए अत्यधिक प्रभावी सक्रिय यौगिक।',
    slide_2_btn: 'नैदानिक ​​अध्ययन देखें',
    spot_2_0_label: 'पीएच संतुलन',
    spot_2_0_tooltip: 'कोशिकाओं के जीवनकाल के लिए प्राकृतिक अम्लता स्तरों से मेल खाता है।',
    spot_2_1_label: 'अवशोषण',
    spot_2_1_tooltip: 'गहन लिपिड वाहक का त्वचा की निचली परतों में प्रवेश।',

    slide_3_title: 'शुद्ध, कोल्ड-प्रेस वानस्पतिक अर्क',
    slide_3_sub: 'कोशिकाओं की प्राकृतिक जीवन शक्ति को पुनर्स्थापित करने के लिए चरम क्षमता पर शुद्ध पौधों का चयन।',
    slide_3_btn: 'हमारी फसल की खोज करें',
    spot_3_0_label: 'प्राकृतिक संग्रह',
    spot_3_0_tooltip: 'नैतिक रूप से एकत्र किए गए प्राकृतिक पौधों के लिपिड।',
    spot_3_1_label: 'पवित्रता प्रतिधारण',
    spot_3_1_tooltip: 'कोल्ड-प्रेसिंग के माध्यम से संरक्षित सक्रिय पादप एंजाइम।',

    // Products Names
    prod_1_name: 'हयालूरोनिक एसिड हाइड्रेटिंग सीरम',
    prod_2_name: 'सेंटेला कामिंग जेल क्रीम',
    prod_3_name: 'बाकुचिओल रिंकल डिफेंस क्रीम',
    prod_4_name: 'नियासिनामाइड पोर रिफाइनर',
    prod_5_name: 'सिरेमाइड बैरियर रिपेयर क्रीम',
    prod_6_name: 'सैलिसिलिक एसिड एक्सफ़ोलीएटिंग क्लींजर',
    prod_7_name: 'पेप्टाइड कॉम्प्लेक्स फर्मिंग सीरम',
    prod_8_name: 'स्क्वालेन क्लींजिंग ऑयल',
    prod_9_name: 'विटामिन ई हाइड्रेटिंग मास्क',
    prod_10_name: 'एएचए/बीएचए रिसर्फेसिंग लिक्विड',
    prod_101_name: 'स्क्वालेन रेडिएंस ग्लो सीरम',
    prod_101_desc: 'अल्ट्रा-लाइटवेट स्किन ऑयल जो आवश्यक नमी को गहराई से लॉक करता है।',
    prod_102_name: 'लैवेंडर कामिंग हैंड क्रीम',
    prod_102_desc: 'पोषक जैविक लैवेंडर अर्क के साथ खुरदरे, सूखे हाथों को शांत करता है।',

    // Hero / Home Page
    hero_title: 'शुद्ध प्रेम से बनी प्राकृतिक स्किनकेयर',
    hero_subtitle: 'त्वचा की पूर्ण चमक के लिए हस्तनिर्मित जैविक वानस्पतिक सामग्रियां।',
    hero_cta: 'खरीदारी शुरू करें',
    btn_add_to_bag: 'थैले में डालें',
    btn_added: 'जोड़ दिया गया!',

    // Auth Modal
    auth_login: 'लॉग इन',
    auth_signup: 'साइन अप',
    auth_forgot: 'पासवर्ड भूल गए?',
    auth_create_acc: 'खाता बनाएं',
    auth_email: 'ईमेल पता',
    auth_phone: 'फ़ोन नंबर (वैकल्पिक)',
    auth_name: 'पूरा नाम',
    auth_password: 'पासवर्ड',
    auth_confirm_pass: 'पासवर्ड की पुष्टि करें',
    auth_verify_otp: 'ओटीपी सत्यापित करें',
    auth_send_otp: 'सत्यापन ओटीपी भेजें',
    auth_google: 'गूगल के साथ जारी रखें',

    // User Profile
    profile_sanctuary: 'आपका आश्रय',
    profile_sub: 'विवरण प्रबंधित करें, ऑर्डर ट्रैक करें, और चमक साझा करें',
    profile_vip: 'वीआईपी क्लब सदस्य',
    profile_loyalty_pts: 'वफादारी अंक',
    profile_pts_desc: 'अगला इनाम 500 अंकों पर',
    profile_orders_placed: 'ऑर्डर दिए गए',
    profile_orders_desc: '1 मार्ग में',
    profile_wishlist_rout: 'इच्छासूची रूटीन',
    profile_wishlist_desc: 'खरीदने के लिए तैयार',
    profile_carbon: 'कार्बन ऑफसेट',
    profile_carbon_desc: '100% पर्यावरण-सचेत',
    profile_tab_info: 'व्यक्तिगत जानकारी',
    profile_tab_orders: 'ऑर्डर इतिहास',
    profile_tab_tracking: 'ऑर्डर ट्रैकिंग',
    profile_tab_addresses: 'सहेजे गए पते',
    profile_tab_wishlist: 'मेरी इच्छासूची',
    profile_tab_referral: 'मित्र को भेजें',
    profile_tab_prefs: 'प्राथमिकताएं',
    profile_edit: 'प्रोफ़ाइल संपादित करें',
    profile_save: 'परिवर्तन सहेजें',
    profile_cancel: 'रद्द करें',
    profile_name_lbl: 'पूरा नाम',
    profile_email_lbl: 'ईमेल पता',
    profile_phone_lbl: 'फ़ोन नंबर',
    profile_vip_title: 'बोटैनिकल सर्कल क्लब के सदस्य',
    profile_vip_desc: 'आप प्रीमियम श्रेणी में हैं। आजीवन मुफ्त ग्रीनहाउस एक्सप्रेस शिपिंग, त्रैमासिक सीमित फसलों तक विशेष पहुंच और नए स्किनकेयर संग्रह पर दोगुने इनाम अंकों का आनंद लें।',
    
    // Addresses
    addr_label: 'पते का नाम (जैसे घर का पता)',
    addr_street: 'गली का पता',
    addr_city: 'शहर, राज्य',
    addr_zip: 'पिन कोड',
    addr_save: 'पता सहेजें',
    addr_add: 'पता जोड़ें',
    addr_empty: 'कोई सहेजा गया पता नहीं मिला। चेकआउट को आसान बनाने के लिए शिपिंग पते पंजीकृत करें।',
    
    // Tracking
    track_title: 'ऑर्डर ट्रैकिंग',
    track_ref: 'शिपमेंट संदर्भ',
    track_est: 'अनुमानित आगमन',
    track_placed: 'ऑर्डर किया गया',
    track_placed_desc: 'ऑर्डर किया गया और पुष्टि की गई',
    track_processing: 'प्रसंस्करण',
    track_processing_desc: 'पर्यावरण-अनुकूल और पैक किया गया',
    track_shipped: 'भेज दिया गया',
    track_shipped_desc: 'कार्बन-ऑफसेट कूरियर के साथ रवाना',
    track_out: 'वितरण के लिए बाहर',
    track_out_desc: 'स्थानीय वितरण वाहन के साथ',
    track_delivered: 'पहुंचा दिया गया',
    track_delivered_desc: 'सौंप दिया गया या मेलबॉक्स में छोड़ दिया गया',
    track_carrier: 'कूरियर सेवा',
    track_code: 'ट्रैकिंग कोड',

    // Referral
    ref_title: 'प्राकृतिक चमक साझा करें',
    ref_subtitle: 'अपने प्रियजनों को उनके पहले प्रीमियम जैविक स्किनकेयर संग्रह पर $15 की छूट उपहार में दें। जब वे ऑर्डर करेंगे, तो आपको स्वचालित रूप से $15 का क्रेडिट मिलेगा।',
    ref_btn: 'लिंक कॉपी करें',
    ref_copied: 'कॉपी किया गया!',
    ref_balance: 'उपलब्ध शेष राशि',
    ref_successful: 'सफल रेफ़रल',

    // Settings
    pref_language: 'पसंदीदा भाषा',
    pref_sub_drop: 'नए संग्रह और विशेष ऑफर',
    pref_sub_routine: 'मासिक स्किनकेयर रूटीन और क्लिनिक आमंत्रण',

    // Footer
    foot_mission: 'स्वस्थ त्वचा और स्वस्थ ग्रह के लिए प्रीमियम प्राकृतिक जैविक स्किनकेयर उत्पादों का निर्माण।',
    foot_routine: 'रूटीन के लिए सदस्यता लें',
    foot_sub_btn: 'सदस्यता लें',
    foot_placeholder_email: 'आपका ईमेल पता',
    foot_subscribed: '✓ सदस्यता लेने के लिए धन्यवाद!',
    foot_follow_us: 'हमारे साथ जुड़ें',

    // Trust Features
    feat_cod_title: 'कैश ऑन डिलीवरी',
    feat_cod_desc: 'प्राप्त करने पर भुगतान करें',
    feat_deliv_title: 'अखिल भारतीय डिलीवरी',
    feat_deliv_desc: 'हम पूरे भारत में वितरित करते हैं',
    feat_auth_title: '100% प्रामाणिक',
    feat_auth_desc: 'केवल असली उत्पाद',
    feat_return_title: 'आसान वापसी',
    feat_return_desc: '7-दिन की परेशानी मुक्त वापसी',
    feat_pay_title: 'सुरक्षित भुगतान',
    feat_pay_desc: 'UPI, कार्ड और नेट बैंकिंग',

    // Footer Columns
    foot_col_products: 'हमारे उत्पाद',
    foot_col_support: 'ग्राहक सहायता',
    foot_col_company: 'हमारी कंपनी',

    // Footer Links
    foot_prod_1: 'क्लींजर और फेस वॉश',
    foot_prod_2: 'टोनर और मिस्ट',
    foot_prod_3: 'सीरम और उपचार',
    foot_prod_4: 'मॉइस्चराइज़र और क्रीम',
    foot_prod_5: 'सनस्क्रीन और एसपीएफ',
    foot_prod_6: 'आंखों की देखभाल',
    foot_prod_7: 'फेस मास्क और स्क्रब',
    foot_prod_8: 'होंठों की देखभाल',

    foot_supp_1: 'अक्सर पूछे जाने वाले प्रश्न',
    foot_supp_2: 'वापसी और रिफंड नीति',
    foot_supp_3: 'गोपनीयता नीति',
    foot_supp_4: 'नियम और शर्तें',
    foot_supp_5: 'शिपिंग नीति',
    foot_supp_6: 'मेरा ऑर्डर ट्रैक करें',
    foot_supp_7: 'संपर्क करें',
    foot_supp_8: 'व्हाट्सएप सहायता',

    foot_comp_1: 'मॉर्किन्स के बारे में',
    foot_comp_2: 'हमारी कहानी',
    foot_comp_3: 'हमारा मिशन और मूल्य',
    foot_comp_4: 'सामग्री जो हम उपयोग करते हैं',
    foot_comp_5: 'त्वचा विशेषज्ञ द्वारा स्वीकृत',
    foot_comp_6: 'सतत विकास',
    foot_comp_7: 'क्रूरता मुक्त वादा',
    foot_comp_8: 'ब्लॉग',

    // Signature Glow Serum Banner
    banner_sig_title: 'सिग्नेचर ग्लो सीरम',
    banner_sig_desc: 'अपनी त्वचा को पूर्ण चमक से सराबोर करें। हमारा बायो-एक्टिव विटामिन सी और हयालूरोनिक एसिड कॉम्प्लेक्स काले धब्बों को लक्षित करने और महीन रेखाओं को चिकना करने के लिए सेलुलर स्तर पर काम करता है।',
    banner_sig_btn: 'अभी खरीदें',

    // Follow Our Journey
    journey_title: 'हमारी यात्रा का अनुसरण करें',
    journey_desc: 'अपनी दिनचर्या साझा करने और फीचर होने के लिए हमें @morkinsofficial पर टैग करें।',

    // Trending on Feed
    feed_title: 'फीड पर लोकप्रिय',
    feed_desc: 'असली त्वचा, अनफ़िल्टर्ड परिणाम। अपने दैनिक मॉर्किन्स रूटीन को तुरंत खरीदने के लिए किसी भी निर्माता के वीडियो पर टैप करें।',
    feed_quick_shop: 'त्वरित खरीद',
    feed_key_ing: 'प्रमुख सामग्रियां',
    feed_reviews: 'समीक्षाएं',
    feed_added: 'जोड़ दिया गया',

    // Feed products
    feed_prod_1_name: 'ग्लो बूस्टिंग सीरम',
    feed_prod_1_desc: 'एक हल्का, तेजी से अवशोषित होने वाला सीरम जो 10% विटामिन सी और हयालूरोनिक एसिड से भरपूर है। यह त्वचा की रंगत को तुरंत चमकाता है, काले धब्बों को दूर करता है और पूरे दिन गहरी नमी प्रदान करता है।',
    feed_prod_1_ing: '98% ऑर्गेनिक विटामिन सी, शुद्ध हयालूरोनिक एसिड, फेरुलिक एसिड, मुलेठी की जड़ का अर्क',
    
    feed_prod_2_name: 'बैरियर रिस्टोर क्रीम',
    feed_prod_2_desc: 'त्वचा की नमी बनाए रखने वाली सुरक्षात्मक परत की मरम्मत और सुरक्षा के लिए डिज़ाइन की गई एक समृद्ध पोषक क्रीम। लालिमा को शांत करने के लिए सेरामाइड्स, स्क्वालेन और सुखदायक सेंटेला एशियाटिका से समृद्ध।',
    feed_prod_2_ing: 'सेरामाइड्स NP/AP/EOP, गन्ने से प्राप्त स्क्वालेन, सेंटेला एशियाटिका (सिस्का), जैविक शिया बटर',
    
    feed_prod_3_name: 'रोज़हिप रिप्लेनिशिंग ऑयल',
    feed_prod_3_desc: '100% जैविक कोल्ड-प्रेस्ड रोज़हिप बीज का तेल। कोशिकाओं के पुनर्जनन को बढ़ावा देने, महीन रेखाओं को चिकना करने और प्राकृतिक लचीलेपन को बहाल करने के लिए आवश्यक फैटी एसिड और एंटीऑक्सिडेंट से भरपूर।',
    feed_prod_3_ing: 'कोल्ड-प्रेस्ड रोज़ा कैनाइना (रोज़हिप) बीज का तेल, विटामिन ई (टोकोफेरोल)',
    
    feed_prod_4_name: 'विटामिन सी ब्राइट जेल',
    feed_prod_4_desc: 'एक ठंडा जेल-मॉइस्चराइज़र जो बेजान, थकी हुई त्वचा को पुनर्जीवित करता है। एंटीऑक्सिडेंट का पोषण देने और तेल-मुक्त नमी बनाए रखने के लिए खट्टे फलों के अर्क और काकाडू प्लम से भरपूर।',
    feed_prod_4_ing: 'काकाडू प्लम का अर्क, एलोवेरा लीफ जूस, ग्रीन टी लीफ एक्सट्रैक्ट',
    
    feed_prod_5_name: 'डेली सन प्रोटेक्ट एसपीएफ 50',
    feed_prod_5_desc: 'एक अत्यंत पारदर्शी, व्यापक-स्पेक्ट्रम खनिज एसपीएफ 50 सनस्क्रीन। बिना किसी सफेद परत छोड़े त्वचा को पूरी तरह से पारदर्शी और ओसदार चमक प्रदान करता है, साथ ही एक हाइड्रेटिंग प्राइमर के रूप में काम करता है।',
    feed_prod_5_ing: 'नॉन-नैनो जिंक ऑक्साइड 12%, ग्रीन टी एक्सट्रैक्ट, सी बकथॉर्न, हयालूरोनिक एसिड',
    
    feed_prod_6_name: 'स्क्वालेन फेशियल ऑयल',
    feed_prod_6_desc: 'शुद्ध गन्ने से प्राप्त स्क्वालेन तेल। बिना रोमछिद्रों को बंद किए नमी को बनाए रखने, तेल के उत्पादन को संतुलित करने और त्वचा की प्राकृतिक चमक बढ़ाने के लिए आपकी त्वचा के प्राकृतिक सीबम जैसा काम करता है।',
    feed_prod_6_ing: '100% गन्ने से प्राप्त स्क्वालेन',

    // Skin Quiz
    quiz_builder: 'इंटरएक्टिव रूटीन बिल्डर',
    quiz_discover: 'अपनी दैनिक दिनचर्या खोजें',
    quiz_subtitle: 'अपनी त्वचा के बारे में दो त्वरित प्रश्नों के उत्तर दें, और हमारे फॉर्मूला इंजन को आपकी अनुकूलित 3-चरणीय स्किनकेयर दिनचर्या बनाने दें।',
    quiz_q1: 'प्रश्न 01',
    quiz_q1_title: 'आप अपनी त्वचा का वर्णन कैसे करेंगे?',
    quiz_q2: 'प्रश्न 02',
    quiz_q2_title: 'आपका प्राथमिक त्वचा लक्ष्य क्या है?',
    quiz_back: '← चरण 1 पर वापस जाएं',
    quiz_diagnosis: 'आपका निदान',
    quiz_val_indiv: 'व्यक्तिगत मूल्य',
    quiz_val_bundle: 'बंडल मूल्य (15% छूट)',
    quiz_btn_adding: 'दिनचर्या जोड़ी जा रही है...',
    quiz_btn_added: '✓ दिनचर्या थैले में जोड़ी गई',
    quiz_btn_add_entire: 'पूरी दिनचर्या जोड़ें',
    quiz_quick_add: '+ तुरंत जोड़ें',

    // Quiz Options
    quiz_opt_dry_lbl: 'रूखी / पपड़ीदार',
    quiz_opt_dry_desc: 'तेल की कमी, खिंचाव महसूस होना, त्वचा खुरदरी दिखना।',
    quiz_opt_oily_lbl: 'तैलीय / बंद रोमछिद्र',
    quiz_opt_oily_desc: 'अत्यधिक चमक, बड़े रोमछिद्र, मुंहासे की संभावना।',
    quiz_opt_dull_lbl: 'बेजान / असमान रंगत',
    quiz_opt_dull_desc: 'पिग्मेंटेशन, धब्बे, चमक की कमी।',
    quiz_opt_sens_lbl: 'संवेदनशील / उम्रदराज',
    quiz_opt_sens_desc: 'लालिमा, महीन रेखाएं, थकी हुई त्वचा की संभावना।',

    // Goals Options
    quiz_goal_glow_lbl: 'चमकदार निखार प्राप्त करें',
    quiz_goal_glow_desc: 'त्वचा कोशिकाओं को हाइड्रेट करें, सुरक्षा परत बहाल करें।',
    quiz_goal_calm_lbl: 'त्वचा को शांत और कोमल बनाएं',
    quiz_goal_calm_desc: 'सक्रिय लालिमा कम करें, मुंहासे साफ करें।',
    quiz_goal_renew_lbl: 'त्वचा को नया रूप और पुनर्जीवन दें',
    quiz_goal_renew_desc: 'त्वचा की परतों को पोषण दें, उम्र बढ़ने के संकेतों को लक्षित करें।',

    // Quiz Recommendations
    quiz_rec_dry_title: 'पोषक हाइड्रेशन दिनचर्या',
    quiz_rec_dry_desc: 'विशेष रूप से सूखी त्वचा कोशिकाओं को सींचने, क्षतिग्रस्त लिपिड सुरक्षा परत की मरम्मत करने और स्थायी वानस्पतिक नमी को लॉक करने के लिए डिज़ाइन किया गया है।',
    quiz_rec_oily_title: 'संतुलित स्पष्टता दिनचर्या',
    quiz_rec_oily_desc: 'अत्यधिक सीबम को नियंत्रित करने, बंद रोमछिद्रों को साफ करने और ताज़ा, मैट फिनिश के लिए तेल मुक्त हाइड्रेशन प्रदान करने के लिए तैयार किया गया है।',
    quiz_rec_dull_title: 'चमक और निखार दिनचर्या',
    quiz_rec_dull_desc: 'हाइपरपिग्मेंटेशन को लक्षित करने और चमकदार त्वचा प्रकट करने के लिए उच्च क्षमता वाले विटामिन सी और वानस्पतिक चमक बढ़ाने वाले तत्वों से भरपूर।',
    quiz_rec_sens_title: 'पुनर्स्थापनात्मक सुरक्षा परत दिनचर्या',
    quiz_rec_sens_desc: 'लालिमा को शांत करने और युवावस्था बनाए रखने वाले पोषक तत्वों को लॉक करने के लिए जैव-अनुकूल सेरामाइड्स और वानस्पतिक परिसरों के साथ सावधानीपूर्वक तैयार किया गया।',

    // Auth Drawer
    auth_portal: 'खाता पोर्टल',
    auth_drawer_login: 'लॉग इन',
    auth_drawer_signup: 'साइन अप',
    auth_drawer_email: 'ईमेल पता',
    auth_email_placeholder: 'जैसे: skin@morkins.com',
    auth_drawer_password: 'पासवर्ड',
    auth_drawer_forgot: 'भूल गए?',
    auth_or_continue: 'या इसके साथ जारी रखें',
    auth_drawer_google: 'गूगल खाता',
    auth_fullname: 'पूरा नाम',
    auth_fullname_placeholder: 'जैसे: राहुल कुमार',
    auth_country: 'देश',
    auth_drawer_phone: 'फ़ोन (वैकल्पिक)',
    auth_phone_placeholder: '98765-43210',
    auth_confirm_password: 'पासवर्ड की पुष्टि करें',
    auth_create_account: 'खाता बनाएं',
    auth_forgot_desc: 'अपना ईमेल पता दर्ज करें और हम पासवर्ड रीसेट करने के लिए एक सुरक्षित ओटीपी कोड भेजेंगे।',
    auth_drawer_send_otp: 'रीसेट ओटीपी भेजें',
    auth_otp_desc: 'कृपया भेजा गया 6-अंकीय ओटीपी कोड दर्ज करें',
    auth_verify: 'सत्यापित करें',
    auth_resend_in: 'पुनः भेजें',
    auth_resend_code: 'ओटीपी पुनः भेजें',
    auth_new_password: 'नया पासवर्ड',
    auth_confirm_new_password: 'नए पासवर्ड की पुष्टि करें',
    auth_update_password: 'पासवर्ड अपडेट करें',
    auth_welcome: 'आपका स्वागत है',
    auth_logged_in: 'आपके प्रीमियम प्रोफाइल में लॉग इन हैं',
    auth_name_label: 'नाम:',
    auth_email_label: 'ईमेल:',
    auth_phone_label: 'फ़ोन:',
    auth_country_label: 'देश:',
    auth_continue_shop: 'खरीदारी जारी रखें',
    auth_logout: 'लॉग आउट',
    auth_back: 'पीछे',
    auth_processing: 'प्रक्रिया जारी है...',
  },
  gu: {
    // Navbar & Navigation
    nav_products: 'ઉત્પાદો',
    nav_bestsellers: 'સૌથી લોકપ્રિય',
    nav_newarrivals: 'નવા આગમન',
    nav_about: 'અમારા વિશે',
    nav_search_placeholder: 'શોધો...',
    nav_signout: 'લૉગ આઉટ',
    nav_signin: 'લૉગ ઇન',

    // Product Header/Footer Translation
    sec_favorites: 'અમારા મનપસંદ ઉત્પાદનો ખરીદો',
    sec_favorites_desc: 'તમારી ત્વચાના કુદરતી રક્ષણાત્મક સ્તરને પોષણ આપવા અને તેને પુનર્જીવિત કરવા માટે સ્વચ્છ અને પોષક તત્વોથી ભરપૂર ફોર્મ્યુલેશન.',
    btn_show_more: 'બધા ઉત્પાદનો જુઓ',
    btn_show_less: 'ઓછા ઉત્પાદનો જુઓ',
    sec_cust_favs: 'ગ્રાહકોના મનપસંદ',
    sec_bestsellers: 'સૌથી વધુ વેચાતા ઉત્પાદનો',
    sec_natural_glow: 'કુદરતી રીતે તેજસ્વી',
    sec_glow_desc: 'દરેક બોટલ જૈવિક વનસ્પતિ તત્વોથી ભરપૂર છે જે તમારી દૈનિક ત્વચાના પુનર્જીવન માટે સક્રિય પરિણામો આપે છે.',
    btn_add_to_cart: 'કાર્ટમાં ઉમેરો',

    // Product Categories
    cat_serums: 'સીરમ',
    cat_moisturizers: 'મોઇશ્ચરાઇઝર',
    cat_treatments: 'સારવાર',
    cat_cleansers: 'ક્લીન્ઝર',
    cat_masks: 'માસ્ક',

    // Badges
    badge_anti_aging: 'એન્ટી-એજિંગ',
    badge_repair: 'રિપેર',
    badge_popular: 'લોકપ્રિય',

    // Slide Content
    slide_1_title: 'સેકન્ડોમાં તમારી ત્વચાનું એઆઇ-આધારિત નિદાન મેળવો',
    slide_1_sub: 'સાથે ૧૦૦% વ્યક્તિગત અને વિજ્ઞાન-સમર્થિત સ્કીનકેર રૂટિન',
    slide_1_btn: 'ક્વિઝ શરૂ કરો',
    spot_1_0_label: 'ખીલ',
    spot_1_0_tooltip: 'ત્વચા સ્પષ્ટતા ઇન્ડેક્સ લઘુત્તમ સક્રિય ખીલ દર્શાવે છે.',
    spot_1_1_label: 'શુષ્કતા',
    spot_1_1_tooltip: 'સેલ સ્તરો પર એપિડર્મલ ભેજ જાળવી રાખવાનું સ્તર.',
    spot_1_2_label: 'મજબૂતાઈ',
    spot_1_2_tooltip: 'ચહેરાના સ્નાયુઓમાં કોલેજનની સ્થિતિ અને સ્થિતિસ્થાપકતાનો સ્કોર.',

    slide_2_title: 'ક્લિનિકલી પરીક્ષણ કરાયેલ, જૈવિક રીતે સક્રિય ફોર્મ્યુલા',
    slide_2_sub: 'ત્વચાના લિપિડ રક્ષણાત્મક સ્તરને પુનર્જીવિત કરવા માટે ઉચ્ચ-અસરકારક સક્રિય સંયોજનો.',
    slide_2_btn: 'ક્લિનિકલ અભ્યાસ જુઓ',
    spot_2_0_label: 'પીએચ સંતુલન',
    spot_2_0_tooltip: 'કોષોના જીવનકાળ માટે કુદરતી એસિડિટી સ્તરો સાથે મેળ ખાય છે.',
    spot_2_1_label: 'શોષણ',
    spot_2_1_tooltip: 'કોષોના ઊંડા સ્તરોમાં સક્રિય તત્વોનો પ્રવેશ.',

    slide_3_title: 'શુદ્ધ, કોલ્ડ-પ્રેસ્ડ વનસ્પતિ અર્ક',
    slide_3_sub: 'કોષોની કુદરતી જીવનશક્તિ પુનઃસ્થાપિત કરવા માટે શ્રેષ્ઠ ગુણવત્તાવાળા શુદ્ધ છોડની પસંદગી.',
    slide_3_btn: 'અમારી લણણી શોધો',
    spot_3_0_label: 'કુદરતી સંગ્રહ',
    spot_3_0_tooltip: 'નૈતિક રીતે એકત્રિત કરાયેલા કુદરતી છોડના લિપિડ.',
    spot_3_1_label: 'શુદ્ધતા જાળવણી',
    spot_3_1_tooltip: 'કોલ્ડ-પ્રેસિંગ દ્વારા સુરક્ષિત સક્રિય છોડના ઉત્સેચકો.',

    // Products Names
    prod_1_name: 'હાયલ્યુરોનિક એસિડ હાઇડ્રેટિંગ સીરમ',
    prod_2_name: 'સેન્ટેલા કામિંગ જેલ ક્રીમ',
    prod_3_name: 'બાકુચિઓલ રિંકલ ડિફેન્સ ક્રીમ',
    prod_4_name: 'નિયાસિનામાઇડ પોર રિફાઇનર',
    prod_5_name: 'સિરેમાઇડ બેરિયર રિપેર ક્રીમ',
    prod_6_name: 'સેલિસિલિક એસિડ એક્સફોલિએટિંગ ક્લીન્ઝર',
    prod_7_name: 'પેપ્ટાઇડ કોમ્પ્લેક્સ ફર્મિંગ સીરમ',
    prod_8_name: 'સ્ક્વાલેન ક્લીન્સિંગ ઓઇલ',
    prod_9_name: 'વિટામિન ઇ હાઇડ્રેટિંગ માસ્ક',
    prod_10_name: 'AHA/BHA રિસર્ફેસિંગ લિક્વિડ',
    prod_101_name: 'સ્ક્વાલેન રેડિઅન્સ ગ્લો સીરમ',
    prod_101_desc: 'અલ્ટ્રા-લાઇટવેઇટ સ્કીન ઓઇલ જે જરૂરી ભેજને ઊંડે સુધી લોક કરે છે.',
    prod_102_name: 'લેવેન્ડર કામિંગ હેન્ડ ક્રીમ',
    prod_102_desc: 'પૌષ્ટિક ઓર્ગેનિક લેવેન્ડર અર્ક સાથે ખરબચડા, સૂકા હાથોને શાંત કરે છે.',

    // Hero / Home Page
    hero_title: 'શુદ્ધ પ્રેમથી બનેલી કુદરતી સ્કીનકેર',
    hero_subtitle: 'ત્વચાની સંપૂર્ણ ચમક માટે હસ્તનિર્મિત જૈવિક વનસ્પતિ સામગ્રી.',
    hero_cta: 'ખરીદી શરૂ કરો',
    btn_add_to_bag: 'બેગમાં ઉમેરો',
    btn_added: 'ઉમેરાયું!',

    // Auth Modal
    auth_login: 'લૉગ ઇન',
    auth_signup: 'સાઇન અપ',
    auth_forgot: 'પાસવર્ડ ભૂલી ગયા છો?',
    auth_create_acc: 'ખાતું બનાવો',
    auth_email: 'ઇમેઇલ સરનામું',
    auth_phone: 'ફોન નંબર (વૈકલ્પિક)',
    auth_name: 'આખું નામ',
    auth_password: 'પાસવર્ડ',
    auth_confirm_pass: 'પાસવર્ડ કન્ફર્મ કરો',
    auth_verify_otp: 'ઓટીપી ચકાસો',
    auth_send_otp: 'ચકાસણી ઓટીપી મોકલો',
    auth_google: 'ગૂગલ સાથે ચાલુ રાખો',

    // User Profile
    profile_sanctuary: 'તમારું આશ્રય',
    profile_sub: 'વિગતો મેનેજ કરો, ઓર્ડર ટ્રેક કરો અને ચમક શેર કરો',
    profile_vip: 'VIP ક્લબ સભ્ય',
    profile_loyalty_pts: 'વફાદારી પોઈન્ટ',
    profile_pts_desc: 'આગામી પુરસ્કાર 500 પોઈન્ટ પર',
    profile_orders_placed: 'ઓર્ડર આપેલ છે',
    profile_orders_desc: '1 માર્ગમાં છે',
    profile_wishlist_rout: 'ઇચ્છા સૂચિ રૂટિન',
    profile_wishlist_desc: 'ખરીદી માટે તૈયાર',
    profile_carbon: 'કાર્બન ઓફસેટ',
    profile_carbon_desc: '100% પર્યાવરણ પ્રત્યે જાગૃત',
    profile_tab_info: 'વયક્તિગત માહિતી',
    profile_tab_orders: 'ઓર્ડર ઇતિહાસ',
    profile_tab_tracking: 'ઓર્ડર ટ્રેકિંગ',
    profile_tab_addresses: 'સાચવેલા સરનામાં',
    profile_tab_wishlist: 'મારી ઇચ્છા સૂચિ',
    profile_tab_referral: 'મિત્રને મોકલો',
    profile_tab_prefs: 'પસંદગીઓ',
    profile_edit: 'પ્રોફાઇલ સંપાદિત કરો',
    profile_save: 'ફેરફારો સાચવો',
    profile_cancel: 'રદ કરો',
    profile_name_lbl: 'આખું નામ',
    profile_email_lbl: 'ઇમેઇલ સરનામું',
    profile_phone_lbl: 'ફોન નંબર',
    profile_vip_title: 'બોટનિકલ સર્કલ ક્લબ સભ્યો',
    profile_vip_desc: 'તમે પ્રીમિયમ શ્રેણીમાં છો. આજીવન મફત ગ્રીનહાઉસ એક્સપ્રેસ શિપિંગ, ત્રિમાસિક મર્યાદિત પાક સુધી વિશેષ પ્રવેશ અને નવા સ્કીનકેર કલેક્શન પર ડબલ રિવોર્ડ પોઈન્ટનો આનંદ માણો.',
    
    // Addresses
    addr_label: 'સરનામાંનું નામ (દા.ત. ઘરનું સરનામું)',
    addr_street: 'શેરીનું સરનામું',
    addr_city: 'શહેર, રાજ્ય',
    addr_zip: 'પિન કોડ',
    addr_save: 'સરનામું સાચવો',
    addr_add: 'સરનામું ઉમેરો',
    addr_empty: 'કોઈ સાચવેલ સરનામું મળ્યું નથી. ચેકઆઉટને સરળ બનાવવા માટે શિપિંગ સરનામાં રજીસ્ટર કરો.',
    
    // Tracking
    track_title: 'ઓર્ડર ટ્રેકિંગ',
    track_ref: 'શિપમેન્ટ સંદર્ભ',
    track_est: 'અંદાજિત આગમન',
    track_placed: 'ઓર્ડર કરેલ',
    track_placed_desc: 'ઓર્ડર કરેલ અને કન્ફર્મ થયેલ',
    track_processing: 'પ્રોસેસિંગ',
    track_processing_desc: 'પર્યાવરણને અનુકૂળ અને પેક કરેલ',
    track_shipped: 'મોકલેલ',
    track_shipped_desc: 'કાર્બન-ઓફસેટ કુરિયર સાથે રવાના',
    track_out: 'ડિલિવરી માટે બહાર',
    track_out_desc: 'સ્થાનિક ડિલિવરી વાહન સાથે',
    track_delivered: 'ડિલિવરી પૂર્ણ',
    track_delivered_desc: 'સોંપવામાં આવ્યું અથવા મેઇલબોક્સમાં મૂકવામાં આવ્યું',
    track_carrier: 'કુરિયર સેવા',
    track_code: 'ટ્રેકિંગ કોડ',

    // Referral
    ref_title: 'વનસ્પતિ ચમક શેર કરો',
    ref_subtitle: 'તમારા પ્રિયજનોને તેમના પ્રથમ પ્રીમિયમ ઓર્ગેનિક સ્કીનકેર કલેક્શન પર $15ની છૂટ ભેટ આપો. જ્યારે તેઓ ઓર્ડર કરશે, ત્યારે તમને આપમેળે $15ની ક્રેડિટ મળશે.',
    ref_btn: 'લિંક કોપી કરો',
    ref_copied: 'કોપી કરેલ!',
    ref_balance: 'ઉપલબ્ધ બેલેન્સ',
    ref_successful: 'સફળ રેફરલ',

    // Settings
    pref_language: 'પસંદગીની ભાષા',
    pref_sub_drop: 'નવા સંગ્રહો અને વિશેષ ઑફર્સ',
    pref_sub_routine: 'માસિક સ્કીનકેર રૂટિન અને ક્લિનિક આમંત્રણો',

    // Footer
    foot_mission: 'તંદુરસ્ત ત્વચા અને તંદુરસ્ત ગ્રહ માટે પ્રીમિયમ કુદરતી જૈવિક સ્કીનકેર ઉત્પાદનોનું નિર્માણ.',
    foot_routine: 'રૂટિન માટે સબ્સ્ક્રાઇબ કરો',
    foot_sub_btn: 'સબ્સ્ક્રાઇબ',
    foot_placeholder_email: 'તમારું ઇમેઇલ સરનામું',
    foot_subscribed: '✓ સબ્સ્ક્રાઇબ કરવા બદલ આભાર!',
    foot_follow_us: 'અમારી સાથે જોડાઓ',

    // Trust Features
    feat_cod_title: 'કેશ ઓન ડિલિવરી',
    feat_cod_desc: 'મળ્યા પછી ચૂકવણી કરો',
    feat_deliv_title: 'આખા ભારતમાં ડિલિવરી',
    feat_deliv_desc: 'અમે સમગ્ર ભારતમાં પહોંચાડીએ છીએ',
    feat_auth_title: '100% પ્રમાણિક',
    feat_auth_desc: 'માત્ર અસલી ઉત્પાદનો',
    feat_return_title: 'સરળ રીટર્ન',
    feat_return_desc: '7-દિવસની સરળ પરત નીતિ',
    feat_pay_title: 'સુરક્ષિત ચુકવણી',
    feat_pay_desc: 'UPI, કાર્ડ્સ અને નેટ બેન્કિંગ',

    // Footer Columns
    foot_col_products: 'અમારા ઉત્પાદનો',
    foot_col_support: 'ગ્રાહક સહાય',
    foot_col_company: 'અમારી કંપની',

    // Footer Links
    foot_prod_1: 'ક્લીન્ઝર અને ફેસ વોશ',
    foot_prod_2: 'ટોનર અને મિસ્ટ',
    foot_prod_3: 'સીરમ અને સારવાર',
    foot_prod_4: 'મોઇશ્ચરાઇઝર અને ક્રીમ',
    foot_prod_5: 'સનસ્ક્રીન અને એસપીએફ',
    foot_prod_6: 'આંખોની સંભાળ',
    foot_prod_7: 'ફેસ માસ્ક અને સ્ક્રબ',
    foot_prod_8: 'લિપ કેર',

    foot_supp_1: 'વારંવાર પૂછાતા પ્રશ્નો',
    foot_supp_2: 'રીટર્ન અને રીફંડ પોલિસી',
    foot_supp_3: 'પ્રાઇવસી પોલિસી',
    foot_supp_4: 'નિયમો અને શરતો',
    foot_supp_5: 'શિપિંગ પોલિસી',
    foot_supp_6: 'મારો ઓર્ડર ટ્રેક કરો',
    foot_supp_7: 'અમારો સંપર્ક કરો',
    foot_supp_8: 'વોટ્સએપ સપોર્ટ',

    foot_comp_1: 'મોર્કિન્સ વિશે',
    foot_comp_2: 'અમારી વાર્તા',
    foot_comp_3: 'અમારું મિશન અને મૂલ્યો',
    foot_comp_4: 'અમે વાપરેલા ઘટકો',
    foot_comp_5: 'ત્વચા રોગ નિષ્ણાત દ્વારા માન્ય',
    foot_comp_6: 'સ્થિરતા',
    foot_comp_7: 'ક્રૂરતા મુક્ત વચન',
    foot_comp_8: 'બ્લોગ',

    // Signature Glow Serum Banner
    banner_sig_title: 'સિગ્નેચર ગ્લો સીરમ',
    banner_sig_desc: 'તમારી ત્વચાને સંપૂર્ણ તેજથી તરબોળ કરો. અમારું બાયો-એક્ટિવ વિટામિન સી અને હાયલ્યુરોનિક એસિડ કોમ્પ્લેક્સ ડાર્ક સ્પોટ્સ ઘટાડવા અને ઝીણી રેખાઓ લીસી કરવા માટે સેલ્યુલર સ્તરે કામ કરે છે.',
    banner_sig_btn: 'હમણાં ખરીદો',

    // Follow Our Journey
    journey_title: 'અમારી સફર અનુસરો',
    journey_desc: 'તમારી દિનચર્યા શેર કરવા અને ફીચર થવા માટે અમને @morkinsofficial પર ટેગ કરો.',

    // Trending on Feed
    feed_title: 'ફીડ પર લોકપ્રિય',
    feed_desc: 'વાસ્તવિક ત્વચા, અનફિલ્ટર કરેલ પરિણામો. દૈનિક મોર્કિન્સ રૂટીન ખરીદવા માટે કોઈપણ ક્રિએટરના વીડિયો પર ટેપ કરો.',
    feed_quick_shop: 'ઝડપી ખરીદી',
    feed_key_ing: 'મુખ્ય ઘટકો',
    feed_reviews: 'સમીક્ષાઓ',
    feed_added: 'ઉમેરાઈ ગયું',

    // Feed products
    feed_prod_1_name: 'ગ્લો બૂસ્ટિંગ સીરમ',
    feed_prod_1_desc: 'એક હળવું, ઝડપથી શોષાઈ જતું સીરમ જે ૧૦% વિટામિન સી અને હાયલ્યુરોનિક એસિડથી ભરપૂર છે. તે ત્વચાના ટોનને તરત જ તેજસ્વી બનાવે છે, ડાર્ક સ્પોટ્સ ઘટાડે છે અને આખો દિવસ ઊંડી હાઇડ્રેશન પ્રદાન કરે છે.',
    feed_prod_1_ing: '૯૮% ઓર્ગેનિક વિટામિન સી, શુદ્ધ હાયલ્યુરોનિક એસિડ, ફેરુલિક એસિડ, લિકોરિસ રુટ અર્ક',
    
    feed_prod_2_name: 'બેરિયર રિસ્ટોર ક્રીમ',
    feed_prod_2_desc: 'ત્વચાની ભેજ જાળવી રાખવાની રક્ષણાત્મક દીવાલને મજબૂત કરવા અને સુરક્ષિત કરવા માટે તૈયાર કરાયેલ ક્રીમ. સેરામાઇડ્સ, સ્ક્વાલેન અને લાલાશ ઘટાડવા માટે સેન્ટેલા એશિયાટિકાથી ભરપૂર.',
    feed_prod_2_ing: 'Secaમાઇડ્સ NP/AP/EOP, શેરડીમાંથી મેળવેલ સ્ક્વાલેન, સેન્ટેલા એશિયાટિકા (સિસ્કા), જૈવિક શિયા બટર',
    
    feed_prod_3_name: 'રોઝહિપ રિપ્લેનિશિંગ ઓઇલ',
    feed_prod_3_desc: '૧૦૦% જૈવિક કોલ્ડ-પ્રેસ્ડ રોઝહિપ સીડ ઓઇલ. કોષોના પુનર્જીવનને પ્રોત્સાહન આપવા, ઝીણી રેખાઓ લીસી કરવા અને કુદરતી લવચીકતા પુનઃસ્થાપિત કરવા માટે ફેટી એસિડ્સ અને એન્ટીઑકિસડન્ટથી ભરપૂર.',
    feed_prod_3_ing: 'કોલ્ડ-પ્રેસ્ડ રોઝહિપ સીડ ઓઇલ, વિટામિન ઇ (ટોકોફેરોલ)',
    
    feed_prod_4_name: 'વિટામિન સી બ્રાઇટ જેલ',
    feed_prod_4_desc: 'એક ઠંડક આપતી જેલ-મોઇશ્ચરાઇઝર જે નિસ્તેજ, થાકેલી ત્વચાને પુનર્જીવિત કરે છે. એન્ટીઑકિસડન્ટ પ્રદાન કરવા અને તેલ-મુક્ત ભેજ જાળવી રાખવા માટે સાઇટ્રસ અર્ક અને કાકાડુ પ્લમથી ભરપૂર.',
    feed_prod_4_ing: 'કાકાડુ પ્લમ અર્ક, એલોવેરા લીફ જ્યુસ, ગ્રીન ટી લીફ અર્ક',
    
    feed_prod_5_name: 'ડિલી સન પ્રોટેક્ટ એસપીએફ ૫૦',
    feed_prod_5_desc: 'એક અતિ પારદર્શક, મિનરલ એસપીએફ ૫૦ સનસ્ક્રીન. કોઈપણ સફેદ ડાઘ છોડ્યા વગર ત્વચાને સંપૂર્ણ પારદર્શક અને તેજસ્વી ચમક આપે છે, તેમજ પ્રાઇમર તરીકે પણ કામ કરે છે.',
    feed_prod_5_ing: 'ઝીંક ઓક્સાઇડ ૧૨%, ગ્રીન ટી અર્ક, સી બકથોર્ન, હાયલ્યુરોનિક એસિડ',
    
    feed_prod_6_name: 'સ્ક્વાલેન ફેશિયલ ઓઇલ',
    feed_prod_6_desc: 'શેરડીમાંથી મેળવેલ શુદ્ધ સ્ક્વાલેન તેલ. રોમછિદ્રોને બંધ કર્યા વગર ભેજ જાળવી રાખવા અને ત્વચાની કુદરતી ચમક વધારવા માટે ત્વચાના કુદરતી સીબમ જેવું જ કામ કરે છે.',
    feed_prod_6_ing: '૧૦૦% શેરડીમાંથી મેળવેલ સ્ક્વાલેન',

    // Skin Quiz
    quiz_builder: 'ઇન્ટરેક્ટિવ રૂટિન બિલ્ડર',
    quiz_discover: 'તમારી દૈનિક દિનચર્યા શોધો',
    quiz_subtitle: 'તમારી ત્વચા વિશે બે પ્રશ્નોના જવાબો આપો, અને અમને તમારી ૩-સ્ટેપ સ્કીનકેર દિનચર્યા બનાવવા દો.',
    quiz_q1: 'પ્રશ્ન 01',
    quiz_q1_title: 'તમે તમારી ત્વચાનું વર્ણન કેવી રીતે કરશો?',
    quiz_q2: 'પ્રશ્ન 02',
    quiz_q2_title: 'તમારો પ્રાથમિક ત્વચા ધ્યેય શું છે?',
    quiz_back: '← સ્ટેપ 1 પર પાછા જાઓ',
    quiz_diagnosis: 'તમારું નિદાન',
    quiz_val_indiv: 'વ્યક્તિગત મૂલ્ય',
    quiz_val_bundle: 'બંડલ કિંમત (15% ડિસ્કાઉન્ટ)',
    quiz_btn_adding: 'દિનચર્યા ઉમેરાઈ રહી છે...',
    quiz_btn_added: '✓ દિનચર્યા બેગમાં ઉમેરાઈ ગઈ',
    quiz_btn_add_entire: 'આખી દિનચર્યા ઉમેરો',
    quiz_quick_add: '+ ઝડપી ઉમેરો',

    // Quiz Options
    quiz_opt_dry_lbl: 'સૂકી / ભીંગડાવાળી',
    quiz_opt_dry_desc: 'તેલની ઉણપ, ખેંચાણ અનુભવવું, ત્વચા ખરબચડી દેખાવી.',
    quiz_opt_oily_lbl: 'તૈલીય / ભરાયેલા રોમછિદ્રો',
    quiz_opt_oily_desc: 'વધુ પડતી ચમક, મોટા રોમછિદ્રો, ખીલ થવાની સંભાવના.',
    quiz_opt_dull_lbl: 'નિસ્તેજ / અસમાન રંગત',
    quiz_opt_dull_desc: 'પિગમેન્ટેશન, ડાર્ક સ્પોટ્સ, ચમકનો અભાવ.',
    quiz_opt_sens_lbl: 'સંવેદનશીલ / ઉંમર વધવાના લક્ષણો',
    quiz_opt_sens_desc: 'લાલાશ, ઝીણી રેખાઓ, થાકેલી ત્વચાની સંભાવના.',

    // Goals Options
    quiz_goal_glow_lbl: 'ચમકદાર નિખાર મેળવો',
    quiz_goal_glow_desc: 'તો ત્વચાના કોષોને હાઇડ્રેટ કરો, રક્ષણાત્મક સ્તર બહાલ કરો.',
    quiz_goal_calm_lbl: 'ત્વચાને શાંત અને કોમળ બનાવો',
    quiz_goal_calm_desc: 'સક્રિય લાલાશ ઓછી કરો, ખીલ સાફ કરો.',
    quiz_goal_renew_lbl: 'તમારી ત્વચાનો કાયાકલ્પ કરો',
    quiz_goal_renew_desc: 'ત્વચાના સ્તરોને પુષ્ટ કરો, ઉંમર વધવાના સંકેતો લક્ષિત કરો.',

    // Quiz Recommendations
    quiz_rec_dry_title: 'પૌષ્ટિક હાઇડ્રેશન દિનચર્યા',
    quiz_rec_dry_desc: 'ખાસ કરીને શુષ્ક ત્વચાના કોષોને સીંચવા, ક્ષતિગ્રસ્ત લિપિડ રક્ષણાત્મક સ્તરને પુનર્જીવિત કરવા અને લાંબા સમય સુધી વનસ્પતિ ભેજ જાળવી રાખવા માટે રચાયેલ છે.',
    quiz_rec_oily_title: 'સંતુલિત સ્પષ્ટતા દિનચર્યા',
    quiz_rec_oily_desc: 'વધુ પડતા સીબમને નિયંત્રિત કરવા, ભરાયેલા રોમછિદ્રોને સાફ કરવા અને તાજી, મેટ ફિનિશ માટે તેલ મુક્ત હાઇડ્રેશન પ્રદાન કરવા માટે તૈયાર કરેલ છે.',
    quiz_rec_dull_title: 'તેજ અને ચમક દિનચર્યા',
    quiz_rec_dull_desc: 'હાઇપરપિગ્મેન્ટેશન ઘટાડવા અને તેજસ્વી ત્વચા પ્રગટ કરવા માટે ઉચ્ચ ક્ષમતાવાળા વિટામિન સી અને વનસ્પતિ ચમક વધારનારા તત્વોથી ભરપૂર.',
    quiz_rec_sens_title: 'પુનઃસ્થાપિત રક્ષણાત્મક સ્તર દિનચર્યા',
    quiz_rec_sens_desc: 'લાલાશ શાંત કરવા અને યુવાની જાળવી રાખતા પોષક તત્વોને લોક કરવા માટે જૈવ-અનુકૂળ સિરેમાઇડ્સ અને વનસ્પતિ મિશ્રણ સાથે કાળજીપૂર્વક તૈયાર કરેલ.',

    // Auth Drawer
    auth_portal: 'ખાતા પોર્ટલ',
    auth_drawer_login: 'લૉગ ઇન',
    auth_drawer_signup: 'સાઇન અપ',
    auth_drawer_email: 'ઇમેઇલ સરનામું',
    auth_email_placeholder: 'દા.ત. skin@morkins.com',
    auth_drawer_password: 'પાસવર્ડ',
    auth_drawer_forgot: 'ભૂલી ગયા?',
    auth_or_continue: 'અથવા આનાથી ચાલુ રાખો',
    auth_drawer_google: 'ગુગલ ખાતું',
    auth_fullname: 'પૂરું નામ',
    auth_fullname_placeholder: 'દા.ત. અજય પટેલ',
    auth_country: 'દેશ',
    auth_drawer_phone: 'ફોન (વૈકલ્પિક)',
    auth_phone_placeholder: '98765-43210',
    auth_confirm_password: 'પાસવર્ડની પુષ્ટિ કરો',
    auth_create_account: 'ખાતું બનાવો',
    auth_forgot_desc: 'તમારું ઇમેઇલ સરનામું દાખલ કરો અને અમે પાસવર્ડ રીસેટ કરવા માટે સુરક્ષિત ઓટીપી કોડ મોકલીશું.',
    auth_drawer_send_otp: 'રીસેટ ઓટીપી મોકલો',
    auth_otp_desc: 'કૃપા કરીને મોકલેલ ૬-આંકડાનો ઓટીપી કોડ દાખલ કરો',
    auth_verify: 'ખરાઈ કરો',
    auth_resend_in: 'ફરીથી મોકલો',
    auth_resend_code: 'ઓટીપી ફરીથી મોકલો',
    auth_new_password: 'નવો પાસવર્ડ',
    auth_confirm_new_password: 'નવા પાસવર્ડની પુષ્ટિ કરો',
    auth_update_password: 'પાસવર્ડ અપડેટ કરો',
    auth_welcome: 'સ્વાગત છે',
    auth_logged_in: 'તમે તમારા પ્રીમિયમ પ્રોફાઇલમાં લૉગ ઇન છો',
    auth_name_label: 'નામ:',
    auth_email_label: 'ઇમેઇલ:',
    auth_phone_label: 'ફોન:',
    auth_country_label: 'દેશ:',
    auth_continue_shop: 'ખરીદી ચાલુ રાખો',
    auth_logout: 'લૉગ આઉટ',
    auth_back: 'પાછા',
    auth_processing: 'પ્રોસેસિંગ...',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    const saved = localStorage.getItem('morkins_language');
    if (saved === 'en' || saved === 'hi' || saved === 'gu') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('morkins_language', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);
