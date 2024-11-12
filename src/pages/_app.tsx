import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

/**
 * @description SEO를 위해 본인의 정보로 수정해주세요.
 */
const DEFAULT_SEO = {
  title: "황태현 | Front-End Dev",
  description: "안녕하세요, 프론트엔드 개발자 황태현입니다.",
  canonical: "https://github.com/clowns1232",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://clowns1232.github.io/",
    title: "황태현 | Front-End Dev",
    site_name: "황태현 | Front-End Dev",
    images: [
      {
        url: "/share.png",
        width: 285,
        height: 167,
        alt: "황태현 | Front-End Dev",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      name: "application-name",
      content: "황태현 | Front-End Dev",
    },
    {
      name: "msapplication-tooltip",
      content: "황태현 | Front-End Dev",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
