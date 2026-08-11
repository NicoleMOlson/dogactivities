import type { Metadata } from "next";
import Link from "next/link";
import { EmailSignup } from "../components/EmailSignup";

export const metadata: Metadata = { title: "About" };
const showHiddenProfiles = false;

export default function AboutPage() {
  return (
    <main className="page-shell about-page">
      <section className="about-hero about-intro">
        <div className="paper-card about-copy">
          <p className="eyebrow">About this notebook</p>
          <h1>Good days with your best friend.</h1>
          <p className="large-copy">Paws Welcome helps dog owners find their new favorite: trail, park, patio - while being prepared for everything.</p>
          <p>Adventure doesn&apos;t have to mean going far, and you can bring your dog along for the fun.</p>
          <Link className="button button-dark" href="/">Browse the field notes</Link>
        </div>
      </section>
      <div className="human-profile-grid">
        <section className="paper-card human-profile" id="natalie-tromp">
          <figure className="about-photo">
            <img
              src="/natalie-archie-gotcha-day.jpeg"
              alt="girl in sunglasses holding up a white, gray, tan puppy inside of a car"
            />
            <figcaption>Archie&apos;s Gotcha Day in Pittsburgh, PA</figcaption>
          </figure>
          <div className="about-copy">
            <h1>Natalie Tromp</h1>
            <h2>Founder, Writer &amp; Dog Mom</h2>
            <p>
              Newlywed bringing home her family&apos;s first puppy - Natalie is
              embracing all things dog mom. From curating the perfect set up to
              make the transition easier at home, to discovering dog-friendly
              hidden gems with Archie - she&apos;s excited to take dog fans
              everywhere out on their next adventure with their best friends.
            </p>
          </div>
        </section>
        {showHiddenProfiles && <section className="paper-card human-profile">
          <figure className="about-photo">
            <img
              src="/nicole-and-mysza.png"
              alt="girl with long hair and glasses sitting with german shepherd dog"
            />
            <figcaption>Myszka is never far away from her favorite people</figcaption>
          </figure>
          <div className="about-copy">
            <h1>Nicole Olson</h1>
            <h2>Web Developer, Editor &amp; German Shepherd Wrangler</h2>
            <p>
              Midwestern mom of three fell in love with a German Shepherd before
              the kids were in the picture. The goal? Simply making sure her kids
              got to grow up with a family dog. Nicole&apos;s job is to make this
              site easy and fun to use, so planning your family free time is
              stress free.
            </p>
          </div>
        </section>}
        <article className="paper-card dog-profile featured-dog-profile" id="archie">
          <figure className="dog-photo">
            <img src="/archie-coffee.jpeg" alt="puppy sniffing a cup of coffee" />
            <figcaption>Archie loves visiting new spots and making sure mama&apos;s coffee is made just right.</figcaption>
          </figure>
          <div className="dog-copy">
            <h1>Archie</h1>
            <h2>Cook County &amp; Lake County, Illinois Ambassador</h2>
            <h3>Elk Grove Village, Chicago, Schaumburg, and surrounding communities</h3>
            <h3>Breed: Mini Bernadoodle</h3>
            <p>Archie&apos;s the youngest member of the pack, he&apos;s still catching up on all his shots and training - but is excited to get his paws on the pavement exploring. His favorite activities include playing with his blue duck and snuggling his mama. This pup&apos;s been an adventurer since day 1 - his gotcha day included a cross country flight from Pittsburg, PA to Chicago, IL. He&apos;s a playful pup that loves to be outside - whether it&apos;s in his own backyard or on the trail near his home.</p>
            <div className="dog-profile-links">
              <a className="profile-social-link" href="https://www.instagram.com/archibald_the_bernedoodle" target="_blank" rel="noreferrer" aria-label="Follow Archie on Instagram">
                <span className="instagram-mark" aria-hidden="true" />
                <span>follow along</span>
              </a>
              <Link className="profile-social-link" href="/ambassadors/archie" aria-label="Read more about Archie">
                <span className="paw-mark" aria-hidden="true"><i /><i /><i /><i /></span>
                <span>read more about Archie</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
        {showHiddenProfiles && <article className="dog-profile">
          <figure className="dog-photo">
            <img src="/mysza-long-hike.jpeg" alt="german shepherd dog sitting on a gravel bike path in a native grassland prarie with forest surrounding" />
            <figcaption>Myszka loves going on long hikes with her humans</figcaption>
          </figure>
          <div className="dog-copy">
            <h1>Myszka</h1>
            <h2>Fox Valley, Kendall County, &amp; Kane County Illinois Ambassador</h2>
            <h3>Aurora, Yorkville, Oswego, Montgomery, Plano, and surrounding communities</h3>
            <h3>Breed: German Shepherd</h3>
            <p>Myszka is down for just about anything - except trips to the vet. She can spend the entire day outside - rain, snow or shine. Nothing stops her from having a good time, and she&apos;ll do just about anything to make sure her group stays together. Will chase any ball as far as it goes, but refuses to eat kibble without a topper. Myszka loves making new friends big or small, but has a hard time reading the room - especially when it comes to Chihuahuas.</p>
            <a className="profile-social-link" href="https://www.instagram.com/maamaoro/" target="_blank" rel="noreferrer" aria-label="Follow Myszka on Instagram">
              <span className="instagram-mark" aria-hidden="true" />
              <span>follow along</span>
            </a>
          </div>
        </article>}
        {showHiddenProfiles && <article className="dog-profile">
          <figure className="dog-photo">
            <img src="/bella-walk.jpeg" alt="yorkie dog on a pink leash walking in the grassy on a windy day" />
            <figcaption>Beach days to hiking trails, Bella&apos;s got a streak for adventure.</figcaption>
          </figure>
          <div className="dog-copy">
            <h1>Bella</h1>
            <h2>Kenosha County, Wisconsin</h2>
            <h3>Kenosha, Pleasant Prairie, Somers, Bristol, Salem Lakes, Twin Lakes, and every scenic stop in between</h3>
            <h3>Breed: Yorkshire Terrier</h3>
            <p>The ultimate passenger princess, Bella loves to commute by bike and car to just about any destination. A huge fan of the beach, big hills, and Stella and Chewy&apos;s freeze dried patties - Bella knows how to have fun and look good while doing it. Prim and proper to the max, you can find Bella relaxing with her humans on the couch or sunbathing in her favorite spot in the backyard. She doesn&apos;t let the sun set without going for a walk around the neighborhood.</p>
          </div>
        </article>}
      <section className="values-row">
        <div><span>01</span><h2>Useful over perfect</h2><p>Plans that work in real life, including the muddy and slightly late parts.</p></div>
        <div><span>02</span><h2>Dog-paced</h2><p>Comfort, curiosity, age, and energy get a vote in every outing.</p></div>
        <div><span>03</span><h2>Room to wander</h2><p>Enough preparation to relax, with enough flexibility to follow a good sniff.</p></div>
      </section>
      <EmailSignup />
    </main>
  );
}
