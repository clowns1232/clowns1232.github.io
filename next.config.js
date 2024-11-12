/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 이미지 최적화 비활성화
  },
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
