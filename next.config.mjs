import nextra from "nextra";
import smartypants from "remark-smartypants";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  latex: true,
  mdxOptions: {
    remarkPlugins: [smartypants],
  },
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
});

export default withNextra({
  async redirects() {
    return [
      { source: "/", destination: "/1-overview", permanent: false },
    ];
  },
});
