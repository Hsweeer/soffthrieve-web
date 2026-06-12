import clsx from "clsx";

/** Official App Store icon — transparent PNG provided by client. */
export const APP_STORE_ICON = "/brand-assets/app-store-icon.webp";

type AppStoreMarkProps = {
  size?: number;
  className?: string;
};

export function AppStoreMark({ size, className }: AppStoreMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="App Store"
      className={clsx("block shrink-0 object-contain", className)}
      decoding="async"
      draggable={false}
      height={size}
      src={APP_STORE_ICON}
      width={size}
    />
  );
}
