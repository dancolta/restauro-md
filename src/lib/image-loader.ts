// next/image doesn't prefix basePath onto string srcs in static export, so do it here.
export default function imageLoader({ src }: { src: string; width: number }) {
  return src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH}${src}` : src;
}
