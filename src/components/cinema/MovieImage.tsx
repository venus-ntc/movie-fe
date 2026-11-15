"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const fallback = "/poster-placeholder.svg";

export default function MovieImage({ src, alt, ...props }: ImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps["src"]>();

  return (
    <Image
      {...props}
      alt={alt}
      src={src && src !== failedSource ? src : fallback}
      onError={(event) => {
        setFailedSource(src);
        props.onError?.(event);
      }}
    />
  );
}
