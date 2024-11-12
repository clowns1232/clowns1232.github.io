/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: "out", // 빌드 파일을 `out` 디렉터리에 저장
  basePath: "/clowns1232.github.io", // 리포지토리 이름으로 변경
  assetPrefix: "/clowns1232.github.io", // 정적 자산 경로 설정
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md/,
      use: "raw-loader",
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
