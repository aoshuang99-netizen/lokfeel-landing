// WebP-optimized image component with JPG fallback
// Usage: <OptimizedImg src="/images/bg/couple-sunset.jpg" alt="..." loading="lazy" />
interface OptimizedImgProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

function OptimizedImg({ src, alt, className = "", loading = "lazy", style = {}, onError }: OptimizedImgProps) {
  const webpSrc = src.replace(/\.(jpe?g)$/i, ".webp");

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        style={style}
        onError={onError}
      />
    </picture>
  );
}

export { OptimizedImg };
