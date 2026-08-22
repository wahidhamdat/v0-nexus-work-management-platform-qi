/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/procurement", destination: "/", permanent: true },
      { source: "/pharma", destination: "/", permanent: true },
      { source: "/shield", destination: "/", permanent: true },
      { source: "/claims", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig
