import { categories, tags } from "./taxonomy";
import { archieCratePhoto, archieTargetGolfPhoto, archieToysPhoto } from "./media";
import type { Post } from "./types";

const category = (slug: string) => categories.find((item) => item.slug === slug)!;
const tag = (slug: string) => tags.find((item) => item.slug === slug)!;
const barkBoxUrl = "https://bark.co/pages/join-barkbox-dd-ff-d1a?msclkid=7acb182e174a1b93e325725605140d1a&utm_campaign=688342557&utm_content=&utm_medium=cpc&utm_source=bing&utm_term=co_bb_can+i+buy+barkbox+toys+without+a+subscription&wm_ad_id=&wm_adgroup_id=1233653118341272&wm_medium=ads&wm_source=bing";
const blowfishUrl = "https://www.chewy.com/bark-spike-blowfish-squeaky-plush-dog/dp/4482022?utm_source=google-product&utm_medium=cpc&utm_campaign=19996370614&utm_content=&gad_source=1&gad_campaignid=19996373038&gbraid=0AAAAADmQ2V3UCBrfcclR5wjfzXIU31SoN&gclid=CjwKCAjw1bvTBhBbEiwAzbP8L8dg90BGMHuYsGNL2B-Dp10XyMwnbKam-qI1l12yq40g_QFdFhohtRoC22IQAvD_BwE";
const dogCrateUrl = "https://amzn.to/3RIwl2q";
const dogBedAffiliateUrl = "https://www.amazon.com/dp/B08CXQY47M?th=1&linkCode=ll2&tag=archieapprove-20&linkId=f580d6f1a8c1a1d0fb7ec9c4c54c0944&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";
const dogHarnessAffiliateUrl = "https://www.amazon.com/dp/B0FH8C8YNJ?th=1&linkCode=ll2&tag=archieapprove-20&linkId=9887767cab19d655439a06933e056526&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";
const crinkleDuckAffiliateUrl = "https://www.amazon.com/dp/B09BBL8T4Z?th=1&linkCode=ll2&tag=archieapprove-20&linkId=31ca4d7eb61ba25c49b93f5fada8ed92&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";
const squeakyCrabAffiliateUrl = "https://www.amazon.com/dp/B0FSPMRRSN?&linkCode=ll2&tag=archieapprove-20&linkId=0bedc51c151938538c737a1a63f34424&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";
const dentachewAffiliateUrl = "https://www.amazon.com/dp/B07VBW7RMK?th=1&linkCode=ll2&tag=archieapprove-20&linkId=88b55900611f09f4ff2acf86ac2e8d0b&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";
const squeakerBallzAffiliateUrl = "https://www.amazon.com/dp/B07P5PTZWT?th=1&linkCode=ll2&tag=archieapprove-20&linkId=cb02f82dc80bfaacfb885f2b15aadb2a&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl";
const petYardUrl = "https://www.chewy.com/mypet-indoor-outdoor-6-panel-petyard/dp/3507174";
const targetFoodStorageUrl = "https://www.target.com/p/pet-food-storage-tub-with-built-in-scoop---35lbs---up--38-up--8482-/-/A-87004694";
const targetCanisterUrl = "https://www.target.com/p/71-fl-oz-large-stoneware-canister-sour-cream---hearth---38--hand--8482--with-magnolia/-/A-94688420";
const targetGolfHatUrl = "https://www.target.com/p/hooray-house-golf-hat---green-xs-s/-/A-95098361";
const targetGolfPoloUrl = "https://www.target.com/p/hooray-house-country-club-polo---green-s/-/A-95098317";
const targetGolfToyUrl = "https://www.target.com/p/hooray-house-golf-clubs-hide-toy/-/A-95098326";
const targetBagDispenserUrl = "https://www.target.com/p/hooray-house-waste-bag-holder-tennis-ball/-/A-95098357#lnk=sametab";
const unitedUrl = "https://www.united.com/en/us";
const visitPittsburghUrl = "https://www.visitpittsburgh.com/?utm_source=google&utm_medium=cross-network&utm_campaign=Madden-google-performancemax&utm_content=fy26-forge-on_brand&gad_source=1&gad_campaignid=23820362090&gclid=Cj0KCQjw7eXTBhDBARIsAKF-w45M4lYmpb4nHy6NQJia8inUOIpqSMlm-XUVtGNwhad-UEUPSpI3dCUaAh2WEALw_wcB";
const oopsyDaisyDoodlesUrl = "https://www.greenfieldpuppies.com/dog-breeders/tina-schultheis/";
const unitedPetPolicyUrl = "https://www.united.com/en/us/fly/travel/traveling-with-pets.html";

// Static sample records share the same shape intended for a future Supabase post repository.
export const posts: Post[] = [
  {
    id: "post-006",
    title: "My Cross-country Trip from Chicago to Pittsburgh to Pick Up Archie the Bernadoodle",
    slug: "chicago-pittsburgh-pick-up-archie-bernedoodle",
    excerpt: "A day-trip flight from Chicago to Pittsburgh, the puppy pickup essentials that helped, and Archie’s first journey home.",
    body: [
      { type: "paragraph", text: "There are certain days in life you know you'll remember forever, and flying to Pittsburgh to bring home Archie is one of those days for me." },
      { type: "paragraph", text: "After about a week of puppy prep, last-minute Target runs, Amazon deliveries, and making sure I had everything a tiny puppy could possibly need, it was finally time. I booked a quick day trip from Chicago to Pittsburgh, packed my essentials, and headed to the airport knowing I'd come home with my new best friend." },
      { type: "heading", text: "What's in My Bag - Puppy Pickup Edition" },
      { type: "paragraph", text: "I tried to pack as light as possible, since I knew my hands would be full of a cuddly puppy most of the day. Here are lifesavers I packed to make my trip with a puppy a successful:" },
      { type: "list", items: [
        "Airline-approved puppy carrier",
        "A soft blanket",
        "A heartbeat puppy plush",
        "A portable travel water bottle",
      ] },
      { type: "paragraph", text: "Looking back, every single one earned its spot in my bag. The blanket and heartbeat puppy especially helped make Archie’s first big adventure a little less overwhelming." },
      { type: "heading", compact: true, text: "Airport Check-in Process When Flying United Airlines with a Dog" },
      { type: "paragraph", text: "Since I flew United, there was one thing I learned that I wish I had known beforehand. If you're traveling home with a puppy, you can't simply check in through the app like normal. Even though I wasn't checking luggage, I still had to stop at the United kiosk before going through security so they could verify Archie's reservation. It's a small detail, but knowing it ahead of time can save you some stress on travel day." },
      { type: "heading", text: "Arriving in Pittsburgh to Pick Up My Mini Bernadoodle Puppy" },
      { type: "paragraph", text: "After landing in Pittsburgh, I picked up my rental car and headed to meet Archie. The drive felt surreal. I kept thinking, “I'm actually on my way to pick up my dog.” Not just any dog—the puppy whose photos I'd been staring at for days and whose arrival I'd been counting down to." },
      { type: "paragraph", text: "Nothing prepares you for seeing your puppy in person for the first time. I'd seen photos and videos, but somehow he was even cuter in real life. The moment I held him, I was completely smitten. He was tiny, fluffy, curious, and somehow even sweeter than I had imagined." },
      { type: "heading", text: "My Experience with Oopsy Daisy Doodles in Pittsburgh, Pennsylvania" },
      { type: "paragraph", text: "We chose to adopt Archie from a breeder in Pittsburgh, Pennsylvania that specializes in Mini Bernadoodles. We frequently checked on their new litters—and my husband and I fell in love with Archie after watching a video of him playing with a tennis ball. Now that Archie has been adjusting at home for nearly two weeks, I can attest to the love, care, and training that they poured into Archie before I brought him home. He is adjusting very well, sleeping through the night, and has been able to maintain a good schedule that makes bonding come easily." },
      { type: "paragraph", text: "One of the things that made the transition so much easier was the incredible care package from Oopsy Daisy Doodles. They sent us home with treats, toys, a blanket with familiar scents, dog food, and plenty of pee pads. As a first-time puppy mom, having those items was such a comfort. It felt like they truly wanted both Archie and me to succeed." },
      { type: "heading", text: "Don't Travel with Pets Without These" },
      { type: "paragraph", text: "The unexpected MVP of the trip turned out to be the pee pads. Since Archie wasn't fully vaccinated yet, I wanted to be careful about where he walked and went potty. Before our flight home, I found a private family restroom at the airport, laid out a pee pad, and hoped for the best. To my surprise, Archie figured out exactly what to do and went potty pretty quickly. If you're bringing home a young puppy, pack extra pee pads. You'll be glad you did." },
      { type: "heading", text: "Flying Home with a Puppy" },
      { type: "paragraph", text: "The flight home was probably the most challenging part of the day. Airline rules require puppies to stay fully inside their carrier during the flight, and Archie wasn't exactly thrilled about that arrangement. After spending the day being held, meeting new people, and exploring a brand-new world, being zipped into a carrier under an airplane seat wasn't high on his list of favorite activities." },
      { type: "paragraph", text: "Thankfully, the flight from Pittsburgh to Chicago is only about an hour and a half. Between the sound of the engines and normal cabin noise, his little cries were mostly drowned out, although I was convinced everyone on the plane could hear him. Looking back, I was definitely more stressed about it than anyone around me." },
      { type: "paragraph", text: "I also spent most of the flight doing what I imagine every new puppy parent does: checking on him constantly. Was he comfortable? Did he need water? Was he too warm? Was he sleeping? Most importantly—was he still breathing?" },
      { type: "paragraph", text: "Every time he fell asleep, I found myself peeking into the carrier just to make sure everything was okay." },
      { type: "quote", text: "Rational? Probably not. Relatable? Absolutely." },
      { type: "paragraph", text: "The funny part is that after spending most of the flight protesting the carrier, Archie eventually gave in and fell asleep. Near the end of the flight, I looked down and found him completely passed out, looking perfectly content. The same puppy who had spent the previous hour making his feelings known was suddenly sleeping like a baby. Classic puppy behavior." },
      { type: "paragraph", text: "When we landed back in Chicago, it finally hit me." },
      { type: "quote", text: "The planning was over. The shopping was over. The countdown was over. I had a puppy." },
      { type: "paragraph", text: "As I carried Archie through the airport, I felt equal parts excited and terrified. Everything was about to change, and honestly, I couldn't wait." },
      { type: "heading", text: "Everything You Need to Know About Picking Up a Puppy Across the Country" },
      { type: "paragraph", text: "If you're considering flying to pick up a puppy, my biggest advice is to prepare, stay flexible, and enjoy every moment. Bring a comfortable carrier, pack more pee pads than you think you'll need, arrive at the airport early, and remember that you're probably more nervous than your puppy. Most importantly, take lots of photos and soak it all in. The trip to bring your puppy home only happens once, and even the stressful moments quickly become some of your favorite memories." },
      { type: "paragraph", text: "And just like that, Archie's first adventure was complete. Ours was only beginning." },
    ],
    featured_image: "/natalie-archie-gotcha-day.jpeg",
    featured_image_alt: "girl in sunglasses holding a white, gray, and tan puppy inside a car",
    featured_image_caption: "Archie's Gotcha Day in Pittsburgh, PA",
    published_at: "2026-08-10T09:00:00-05:00",
    status: "published",
    category: category("good-dog-logistics"),
    tags: [tag("what-we-pack"), tag("puppy"), tag("dog-travel"), tag("flying-with-dogs"), tag("puppy-pickup")],
    highlighted_tag_slugs: ["puppy", "flying-with-dogs"],
    ambassadors: ["archie"],
    featured_ambassador: {
      name: "Archie",
      profile_href: "/ambassadors/archie",
      photo: "/archie-coffee.jpeg",
      photo_alt: "puppy sniffing a cup of coffee",
      caption: "Archie’s first cross-country adventure brought him home with his owner Natalie.",
      owner: { name: "Natalie", href: "/about#natalie-tromp" },
      instagram_url: "https://www.instagram.com/archibald_the_bernedoodle",
    },
    author: { name: "Natalie Tromp", href: "/about#natalie-tromp" },
    inline_links: [
      { text: "United Airlines", href: unitedUrl },
      { text: "United", href: unitedUrl },
      { text: "Pittsburgh", href: visitPittsburghUrl },
      { text: "Oopsy Daisy Doodles", href: oopsyDaisyDoodlesUrl },
      { text: "Airline rules", href: unitedPetPolicyUrl },
    ],
  },
  {
    id: "post-005",
    title: "Preparing for the Arrival of Archie: My Mini Bernadoodle Puppy",
    slug: "preparing-for-arrival-of-archie-mini-bernedoodle-puppy",
    excerpt: "Everything I bought and organized to create a safe, comfortable, and fun home for Archie before our mini Bernadoodle puppy arrived.",
    body: [
      { type: "paragraph", text: "There is something about getting a puppy that turns you into a person who suddenly wants to buy everything, and believe me, I definitely went overboard. I think the excitement of getting a puppy and it becoming my new reality is something that you just can’t explain." },
      { type: "paragraph", text: "The moment we knew Archie was coming home, I went into full puppy-prep mode. I started researching, making lists, organizing spaces, and (of course) adding way too many adorable things to my cart." },
      { type: "paragraph", text: "But honestly? Preparing for a puppy was about more than just buying cute accessories. I wanted to create a safe, comfortable, and fun environment where Archie could feel at home from day one." },
      { type: "paragraph", text: "From practical essentials to a few “okay, I couldn’t resist” purchases, here’s everything I bought to prepare for our newest family member." },
      { type: "heading", compact: true, text: "Creating Archie’s Puppy Space" },
      { type: "paragraph", text: "From research, to building, to crate training - picking the right crate can be a PROCESS! It’s been about 2 weeks with Archie so far and I’m happy to report that crate training is going well. Here’s everything that went into selecting the right crate for Archie." },
      { type: "heading", level: 3, text: "Archie’s Crate for Puppies, Dogs, and Mid-Sized Breeds" },
      { type: "paragraph", text: "One of the first things I purchased was his crate and dog bed. We recently moved into our newly remodeled house, so I knew I wanted a crate that was not only aesthetically pleasing but also functional. I also didn’t want to buy multiple puppy stages when he got bigger. I ended up purchasing this one from Amazon and absolutely love it. I have a basket of his toys, a basket of treats, and his other accessories on top, and it doesn’t scream that my dog owns this corner of the house." },
      { type: "heading", level: 3, text: "Archie’s Dog Bed for Puppies, Dogs, and Mid-Sized Breeds" },
      { type: "paragraph", text: "The crate came with a dog bed, but I knew I wanted a bed for my office on my work-from-home days. I picked the fluffiest one I could find - he ended up laying it on his first night home and now he sleeps there every night." },
      { type: "heading", level: 3, text: "Archie’s Dog Toys and Dog Collar for Puppies, Dogs, and Mid-Sized Breeds" },
      { type: "image", image: archieToysPhoto },
      { type: "paragraph", text: "My puppy shopping haul continues - I still needed a crinkle duck toy, a plush squeaky crab toy, Mini Dentachew toys, Squeaker Ballz, a collar, and of course - an organizing bin for it all! I turned to Amazon Prime so I could get everything fast and it would be ready when Archie came home. I found dog bowls that perfectly blended in with our home's aesthetic and decor. No spree is complete without a trip to Home Goods, their impressive pet aisle made it easy to finish up with the last minute things I needed. I found Bark Box toys at an amazing price." },
      { type: "paragraph", text: "Archie’s favorite toy is a tennis ball, but he also loves this cute fish! I got lucky and found one at Home Goods, but Chewy also sells it." },
      { type: "heading", level: 3, text: "The Best Puppy Play Area for Small Puppies and Mid-Sized Breeds" },
      { type: "paragraph", text: "After watching many YouTube videos, I noticed that many trainers and new puppy owners set up small play areas for their dogs to contain them. Again, with us moving into our house post-construction, this was very important for me. I didn’t want a chain-link-fence-looking one, so I bought this one! After being around it for two hours, Archie had already figured out how to go in and out the doggy door (it can be locked, don’t worry)—a definite mama win!" },
      { type: "heading", level: 3, text: "Shopping at Target while Preparing to Bring Home a Puppy" },
      { type: "image", image: archieTargetGolfPhoto },
      { type: "paragraph", text: "Target was my next stop. I knew I wanted some cute accessories, and I needed a storage container for his dog food." },
      { type: "paragraph", text: "Before Archie came home, I wanted everything to have a place. Puppies are curious, messy, and constantly learning, so organization was key." },
      { type: "paragraph", text: "One of my first purchases was a pet food storage container with a built-in scoop. I love that it keeps his food fresh while making feeding time quick and easy." },
      { type: "quote", text: "Puppy parent tip: Having everything ready before your puppy arrives makes those first few chaotic days so much easier." },
      { type: "paragraph", text: "I also grabbed a cute storage canister from Hearth & Hand with Magnolia because, let’s be honest, puppy supplies can take over your house quickly, and I wanted everything to still match our home aesthetic." },
      { type: "paragraph", text: "I also found the cutest little collection by Hooray House and had to scoop up the golf polo, bucket hat, and golf club dog toy. If you haven’t heard, a video of Archie playing with a tennis ball is what sold my husband on getting him. I also found a poop bag dispenser shaped like a tennis ball, so this was a must-buy!" },
      { type: "links", title: "Items in This Post", items: [
        { label: "Furniture-style dog crate", href: dogCrateUrl, image: "/products/dog-crate.jpeg", retailer: "Amazon" },
        { label: "Archie’s dog bed", href: dogBedAffiliateUrl, image: "/products/dog-bed.jpeg", retailer: "Amazon" },
        { label: "Dog harness", href: dogHarnessAffiliateUrl, image: "/products/dog-harness.jpeg", retailer: "Amazon" },
        { label: "Crinkle duck toy", href: crinkleDuckAffiliateUrl, image: "/products/crinkle-duck.jpeg", retailer: "Amazon" },
        { label: "Plush squeaky crab toy", href: squeakyCrabAffiliateUrl, image: "/products/squeaky-crab.jpeg", retailer: "Amazon" },
        { label: "Mini Dentachew toys", href: dentachewAffiliateUrl, image: "/products/dentachew.jpeg", retailer: "Amazon" },
        { label: "Squeaker Ballz", href: squeakerBallzAffiliateUrl, image: "/products/squeaker-balls.jpeg", retailer: "Amazon" },
        { label: "Bark blowfish toy", href: blowfishUrl, image: "/archie-puppy-toys.jpeg", retailer: "Chewy" },
        { label: "Six-panel pet yard", href: petYardUrl, image: "/archie-crate-and-bed.jpeg", retailer: "Chewy" },
        { label: "Hearth & Hand stoneware canister", href: targetCanisterUrl, image: "/products/stoneware-canister.jpeg", retailer: "Target" },
        { label: "Pet food storage tub with scoop", href: targetFoodStorageUrl, image: "/products/pet-food-storage.jpeg", retailer: "Target" },
        { label: "Hooray House golf hat", href: targetGolfHatUrl, image: "/products/golf-hat.jpeg", retailer: "Target" },
        { label: "Hooray House country club polo", href: targetGolfPoloUrl, image: "/products/country-club-polo.jpeg", retailer: "Target" },
        { label: "Hooray House golf clubs hide toy", href: targetGolfToyUrl, image: "/products/golf-clubs-toy.jpeg", retailer: "Target" },
        { label: "Hooray House tennis-ball waste bag holder", href: targetBagDispenserUrl, image: "/products/tennis-ball-bag-holder.jpeg", retailer: "Target" },
        { label: "Shop HomeGoods", href: "https://www.homegoods.com/", image: "/archie-puppy-toys.jpeg", retailer: "HomeGoods" },
        { label: "Explore BarkBox", href: barkBoxUrl, image: "/products/barkbox.jpeg", retailer: "BarkBox" },
      ] },
    ],
    featured_image: archieCratePhoto.src,
    featured_image_alt: archieCratePhoto.alt,
    featured_image_caption: archieCratePhoto.caption,
    published_at: "2026-08-09T09:00:00-05:00",
    status: "published",
    category: category("supplies"),
    tags: [tag("target"), tag("home-goods"), tag("amazon"), tag("dog-toys"), tag("organization"), tag("pet-crate"), tag("dog-bed"), tag("puppy"), tag("mid-size-dog-breed")],
    highlighted_tag_slugs: ["puppy", "mid-size-dog-breed"],
    ambassadors: ["archie"],
    featured_ambassador: {
      name: "Archie",
      profile_href: "/ambassadors/archie",
      photo: "/archie-coffee.jpeg",
      photo_alt: "puppy sniffing a cup of coffee",
      caption: "Archie’s New Here and his owner Natalie put a lot of thought into preparing his place in their home.",
      owner: { name: "Natalie", href: "/about#natalie-tromp" },
      instagram_url: "https://www.instagram.com/archibald_the_bernedoodle",
    },
    author: { name: "Natalie Tromp", href: "/about#natalie-tromp" },
    inline_links: [
      { text: "this one from Amazon", href: dogCrateUrl },
      { text: "Home Goods", href: "https://www.homegoods.com/" },
      { text: "BarkBox", href: barkBoxUrl },
      { text: "Bark Box", href: barkBoxUrl },
      { text: "this cute fish", href: blowfishUrl },
      { text: "Chewy", href: "https://www.chewy.com/" },
      { text: "this one", href: petYardUrl },
      { text: "fluffiest one I could find", href: dogBedAffiliateUrl },
      { text: "a collar", href: dogHarnessAffiliateUrl },
      { text: "crinkle duck toy", href: crinkleDuckAffiliateUrl },
      { text: "plush squeaky crab toy", href: squeakyCrabAffiliateUrl },
      { text: "Mini Dentachew toys", href: dentachewAffiliateUrl },
      { text: "Squeaker Ballz", href: squeakerBallzAffiliateUrl },
      { text: "Target", href: "https://www.target.com/c/dog-supplies-pets/-/N-5xt3t" },
      { text: "pet food storage container with a built-in scoop", href: targetFoodStorageUrl },
      { text: "cute storage canister from Hearth & Hand with Magnolia", href: targetCanisterUrl },
      { text: "bucket hat", href: targetGolfHatUrl },
      { text: "golf polo", href: targetGolfPoloUrl },
      { text: "golf club dog toy", href: targetGolfToyUrl },
      { text: "bag dispenser", href: targetBagDispenserUrl },
      { text: "Hooray House", href: "https://www.target.com/b/hooray-house/-/N-q643leqgrp9" },
    ],
  },
  {
    id: "post-001",
    title: "The unhurried guide to a first trail day",
    slug: "unhurried-first-trail-day",
    excerpt: "A simple plan for picking the route, packing light, and letting your dog set the pace.",
    body: [
      { type: "paragraph", text: "The best first trail day is not the most ambitious one. It is the one where everyone gets home pleasantly tired, with enough energy left to eat dinner." },
      { type: "heading", text: "Choose for the dog you have today" },
      { type: "paragraph", text: "Start with a short route that has shade, reliable footing, and an easy turnaround. Weather, age, confidence, and recent activity matter more than the mileage on paper." },
      { type: "list", items: ["Water for both of you", "A six-foot leash", "High-value treats", "Waste bags plus one extra", "A small towel for the car"] },
      { type: "quote", text: "A good outing leaves room for sniffing. That is not lost time; that is the point." },
      { type: "heading", text: "End while it is still fun" },
      { type: "paragraph", text: "Pause often and watch for lagging, heavy panting, or a sudden lack of interest. Turning around early is excellent trip planning, not a failed adventure." },
    ],
    featured_image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1400&q=85",
    published_at: "2026-07-28T09:00:00-05:00",
    status: "published",
    category: category("day-trips"),
    tags: [tag("trails"), tag("weekend-plans"), tag("what-we-pack")],
  },
  {
    id: "post-002",
    title: "What actually earns a place in our day-trip bag",
    slug: "what-is-in-our-day-trip-bag",
    excerpt: "The small, useful kit that comes along—and the things we stopped hauling around.",
    body: [
      { type: "paragraph", text: "Our dog bag used to be prepared for every theoretical emergency and impossible to carry. Now it is small enough to grab without negotiation." },
      { type: "heading", text: "The always list" },
      { type: "list", items: ["Collapsible bowl and fresh water", "Treat pouch", "Waste bags", "Leash and backup slip lead", "Towel and a few pet-safe wipes"] },
      { type: "paragraph", text: "Seasonal extras live beside the bag, not inside it. That keeps the default kit light and makes it obvious when sunscreen, a cooling layer, or a warm blanket should come along." },
    ],
    featured_image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=85",
    published_at: "2026-07-20T09:00:00-05:00",
    status: "published",
    category: category("good-dog-logistics"),
    tags: [tag("what-we-pack"), tag("weekend-plans")],
  },
  {
    id: "post-003",
    title: "A rainy afternoon that still counts as an adventure",
    slug: "rainy-afternoon-enrichment",
    excerpt: "Three low-fuss indoor activities for weather that refuses to cooperate.",
    body: [
      { type: "paragraph", text: "Rain changes the venue, not the need to explore. A little novelty can do more than an elaborate setup that never makes it out of the closet." },
      { type: "heading", text: "Use what is already in the house" },
      { type: "list", items: ["Hide treats in a loosely folded towel", "Scatter part of dinner through a cardboard box full of paper", "Practice a familiar cue in an unfamiliar room"] },
      { type: "paragraph", text: "Supervise anything involving fabric or cardboard, and choose activities that suit how your dog likes to play. Ten focused minutes can be plenty." },
    ],
    featured_image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=85",
    published_at: "2026-07-12T09:00:00-05:00",
    status: "published",
    category: category("back-at-home"),
    tags: [tag("enrichment"), tag("senior-dogs")],
  },
  {
    id: "post-004",
    title: "A quiet-park checklist for older dogs",
    slug: "quiet-park-checklist-older-dogs",
    excerpt: "A draft field note reserved for a future publishing workflow.",
    body: [{ type: "paragraph", text: "Draft sample content." }],
    featured_image: null,
    published_at: null,
    status: "draft",
    category: category("day-trips"),
    tags: [tag("senior-dogs")],
  },
];

export const publishedPosts = posts
  .filter((post) => post.status === "published")
  .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""));

export const getPostBySlug = (slug: string) => publishedPosts.find((post) => post.slug === slug);
export const getPostsByCategory = (slug: string) => publishedPosts.filter((post) => post.category.slug === slug);
export const getPostsByTag = (slug: string) => publishedPosts.filter((post) => post.tags.some((item) => item.slug === slug));
export const getPostsByAmbassador = (slug: string) => publishedPosts.filter((post) => post.ambassadors?.includes(slug));
