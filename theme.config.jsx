import { Fig, Img } from "components/Image";
import { Tab, Tabs } from "components/Tabs";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import { Callout } from "nextra/components";

const websiteTitle = "Ray Tracing: The Next Week in Rust";
const websiteTitleWithEmoji = "Ray Tracing: The Next Week in Rust \uD83E\uDD80";
const description =
  "A tutorial to learn advanced ray tracing techniques in Rust, based on Ray Tracing: The Next Week by Peter Shirley, Trevor David Black, and Steve Hollasch.";

let baseUrl = "http://localhost:3000";
const m = process.env.NEXT_PUBLIC_VERCEL_URL?.match(
  /(.*)-(.{9})-(.*).vercel.app/,
);
if (m) {
  baseUrl = "https://" + m[1] + ".vercel.app";
}

const ogImage = baseUrl + "/og.jpg";

const config = {
  logo: <span>{websiteTitleWithEmoji}</span>,
  useNextSeoProps: () => {
    const { asPath } = useRouter();
    const { title } = useConfig();
    return {
      title:
        asPath === "/" ? websiteTitle : title + " - " + websiteTitle,
      description: description,
      openGraph: {
        title:
          asPath === "/"
            ? websiteTitleWithEmoji
            : title + " - " + websiteTitleWithEmoji,
        images: [{ url: ogImage }],
      },
      twitter: {
        cardType: "summary_large_image",
      },
    };
  },
  head: () => {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content={websiteTitle} />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />
      </>
    );
  },
  project: {
    link: "https://github.com/YOUR_USERNAME/ray-tracing-the-next-week-in-rust",
  },
  docsRepositoryBase:
    "https://github.com/YOUR_USERNAME/ray-tracing-the-next-week-in-rust/tree/main",
  components: {
    Callout: Callout,
    Tabs: Tabs,
    Tab: Tab,
    Fig: Fig,
    Img: Img,
  },
  footer: {
    component: null,
  },
  gitTimestamp: null,
  feedback: {
    content: "Give us feedback",
  },
};

export default config;
