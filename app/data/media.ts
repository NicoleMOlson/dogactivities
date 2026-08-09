import type { MediaAsset } from "./types";

const postSlug = "preparing-for-arrival-of-archie-mini-bernedoodle-puppy";

export const archieCratePhoto: MediaAsset = {
  id: "media-archie-crate-and-bed",
  src: "/archie-crate-and-bed.jpeg",
  alt: "dog crate inside of a home with a dog bed",
  caption: "Archie’s crate and dog bed. I opted for a dog crate that would fit him even when he is fully grown. Since he’s a small puppy and likes to be cozy, I used a padded divider to make it smaller, more compact, and den-like for him.",
  usages: [{ post_slug: postSlug, placement: "featured image" }],
};

export const archieToysPhoto: MediaAsset = {
  id: "media-archie-puppy-toys",
  src: "/archie-puppy-toys.jpeg",
  alt: "dog toys and basket on a kitchen counter",
  caption: "Archie’s dog toys and an organizing basket to store everything in neatly. I got the toys from Amazon, Target and Home Goods.",
  usages: [{ post_slug: postSlug, placement: "Archie’s Dog Toys and Dog Collar section" }],
};

export const archieTargetGolfPhoto: MediaAsset = {
  id: "media-archie-target-golf-collection",
  src: "/archie-target-golf-collection.jpeg",
  alt: "small-sized golf polo, hat, and golf caddy toy for dogs",
  caption: "Shopping for a puppy is super fun at Target. I really loved this outfit from their Hooray House line—I couldn’t pass it up.",
  usages: [{ post_slug: postSlug, placement: "Shopping at Target section" }],
};

// This catalog can grow into the future private media library without moving caption or alt-text data into page components.
export const mediaAssets: MediaAsset[] = [archieCratePhoto, archieToysPhoto, archieTargetGolfPhoto];
