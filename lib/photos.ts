/**
 * Photography from Unsplash (free license). Sizing and format are added per
 * request by `lib/image-loader.ts`; only crop hints live here.
 */
function unsplash(id: string, params?: string) {
  return `https://images.unsplash.com/${id}${params ? `?${params}` : ""}`;
}

const face = "fit=crop&crop=faces&ar=1:1";

export type Photo = { src: string; alt: string };

export const photos = {
  heroFarm: {
    src: unsplash("photo-1522125307274-36420256794e"),
    alt: "Rangs de cultures s'étirant jusqu'aux collines",
  },
  avatars: [
    { src: unsplash("photo-1715443972682-d978e13876f6", face), alt: "" },
    { src: unsplash("photo-1715443972912-cc425dbcf73e", face), alt: "" },
    { src: unsplash("photo-1627829382469-f4bce7df99ba", face), alt: "" },
  ],

  stageFarmer: {
    src: unsplash("photo-1760445412155-41a14ebaf20a"),
    alt: "Agriculteur traversant une parcelle",
  },
  stageAdvisors: {
    src: unsplash("photo-1702898300015-024b72d06019"),
    alt: "Conseiller et agriculteur en visite au champ",
  },
  stageCoop: {
    src: unsplash("photo-1637433926966-c433757b0222"),
    alt: "Silos à grain d'une coopérative",
  },
  stageIndustry: {
    src: unsplash("photo-1621954938124-02e637ba3584"),
    alt: "Ligne de transformation agroalimentaire",
  },

  stepVoice: {
    src: unsplash("photo-1649429547749-265c4384f74d"),
    alt: "Agricultrice dictant une note sur son téléphone dans un champ de blé",
  },
  stepAerial: {
    src: unsplash("photo-1777058019293-73d54d4c4cae"),
    alt: "Vue aérienne de parcelles agricoles",
  },
  stepTractor: {
    src: unsplash("photo-1679231613212-b0ffa203e490"),
    alt: "Tracteur au travail dans la brume",
  },
  pillField: {
    src: unsplash("photo-1724531281596-cfae90d5a082"),
    alt: "",
  },

  // Version 2
  v2Hero: {
    src: unsplash("photo-1779043151848-784c1bc6c780"),
    alt: "Agriculteur inspectant une grande parcelle de blé",
  },
  v2Statement: {
    src: unsplash("photo-1596753365498-2d23bbfcbc24"),
    alt: "Exploitation agricole et rampe d'irrigation sous un ciel d'orage",
  },
  v2StageFarmer: {
    src: unsplash("photo-1779043151813-11e8987464aa"),
    alt: "Agriculteur au bord des passages de pulvérisateur dans un champ de blé",
  },
} satisfies Record<string, Photo | Photo[]>;

/**
 * Placeholder film for "See how it works" (Pexels, free license).
 * Swap `src` and `poster` for Ekumen's own product video when it exists.
 */
export const film = {
  src: "https://videos.pexels.com/video-files/15909398/15909398-hd_1920_1080_25fps.mp4",
  poster: "https://images.pexels.com/videos/15909398/pexels-photo-15909398.jpeg",
  title: "See how it works",
};
