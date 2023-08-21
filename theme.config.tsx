import { NextraBlogTheme } from "nextra-theme-blog";

export default {
  footer: <p>MIT 2023 © Nextra.</p>,
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: "Read More →",
  postFooter: "ddddd",
  darkMode: true,
  navs: [
    {
      url: "https://github.com/shuding/nextra",
      name: "Nextra",
    },
  ],
} satisfies NextraBlogTheme;
