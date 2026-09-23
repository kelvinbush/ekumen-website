/**
 * Photography from Unsplash (free license). Sources are requested at a
 * sensible upper bound; next/image resizes from there.
 */
function unsplash(id: string, params: string) {
  return `https://images.unsplash.com/${id}?${params}&fm=jpg&q=80`;
}

export type Photo = { src: string; alt: string };

export const photos = {
  heroMist: {
    src: unsplash("photo-1764618979779-f5a8abf6ab28", "w=2800"),
    alt: "Brume matinale sur la campagne, soleil levant",
  },
  lensSprout: {
    src: unsplash("photo-1601209590613-2f0cbdce9991", "w=800"),
    alt: "Jeune pousse sortant de terre",
  },
  videoFarmer: {
    src: unsplash("photo-1670927519969-dc5065aa5641", "w=900"),
    alt: "Agriculteur au chapeau dans son champ",
  },
  avatars: [
    {
      src: unsplash("photo-1715443972682-d978e13876f6", "w=160&h=160&fit=crop&crop=faces"),
      alt: "",
    },
    {
      src: unsplash("photo-1715443972912-cc425dbcf73e", "w=160&h=160&fit=crop&crop=faces"),
      alt: "",
    },
    {
      src: unsplash("photo-1627829382469-f4bce7df99ba", "w=160&h=160&fit=crop&crop=faces"),
      alt: "",
    },
  ],

  stageFarmer: {
    src: unsplash("photo-1760445412155-41a14ebaf20a", "w=1000"),
    alt: "Agriculteur traversant une parcelle",
  },
  stageAdvisors: {
    src: unsplash("photo-1702898300015-024b72d06019", "w=1000"),
    alt: "Conseiller et agriculteur en visite au champ",
  },
  stageCoop: {
    src: unsplash("photo-1637433926966-c433757b0222", "w=1000"),
    alt: "Silos à grain d'une coopérative",
  },
  stageIndustry: {
    src: unsplash("photo-1621954938124-02e637ba3584", "w=1000"),
    alt: "Ligne de transformation agroalimentaire",
  },

  stepVoice: {
    src: unsplash("photo-1649429547749-265c4384f74d", "w=1000"),
    alt: "Agricultrice dictant une note sur son téléphone dans un champ de blé",
  },
  stepAerial: {
    src: unsplash("photo-1777058019293-73d54d4c4cae", "w=1000"),
    alt: "Vue aérienne de parcelles agricoles",
  },
  stepTractor: {
    src: unsplash("photo-1679231613212-b0ffa203e490", "w=1000"),
    alt: "Tracteur au travail dans la brume",
  },
  pillField: {
    src: unsplash("photo-1724531281596-cfae90d5a082", "w=600"),
    alt: "",
  },
} satisfies Record<string, Photo | Photo[]>;
