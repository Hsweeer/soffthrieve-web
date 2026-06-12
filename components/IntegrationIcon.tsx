import clsx from "clsx";

import { AppStoreMark } from "@/components/AppStoreMark";

import { BrandIcon } from "@/components/BrandIcon";



type IntegrationIconProps = {

  slug: string;

  color: string;

  className?: string;

  size?: number;

};



const BRAND_ICON_SLUGS: Record<string, "google-play" | "shopify" | "paypal" | "amazon"> = {

  googleplay: "google-play",

  shopify: "shopify",

  paypal: "paypal",

  amazonaws: "amazon"

};



/** Full-color integration logos — no monochrome mask tinting. */

export function IntegrationIcon({ slug, color, className, size = 32 }: IntegrationIconProps) {

  if (slug === "appstore") {

    return <AppStoreMark className={className} size={size} />;

  }



  const brand = BRAND_ICON_SLUGS[slug];

  if (brand) {

    return <BrandIcon brand={brand} className={className} onDark={false} size={size} />;

  }



  const src = `/brand-assets/integrations/${slug}.svg`;



  return (

    // eslint-disable-next-line @next/next/no-img-element

    <img

      alt=""

      className={clsx("block shrink-0 object-contain", className)}

      decoding="async"

      draggable={false}

      height={size}

      src={src}

      style={slug === "openai" ? undefined : { maxWidth: size, maxHeight: size }}

      width={size}

    />

  );

}

