import clsx from "clsx";
import { FIVERR_FI, UPWORK_UP } from "@/lib/integrations";
import { PlatformLogo } from "@/components/PlatformLogo";

const MARK = 26;

type LogoProps = {
  className?: string;
  height?: number;
};

export function UpworkLogo({ className, height = MARK }: LogoProps) {
  return (
    <PlatformLogo alt="Upwork" className={clsx(className)} height={height} src={UPWORK_UP} width={height} />
  );
}

export function FiverrLogo({ className, height = MARK }: LogoProps) {
  return (
    <PlatformLogo alt="Fiverr" className={clsx(className)} height={height} src={FIVERR_FI} width={height} />
  );
}

export function ClutchLogo({ className, height = MARK }: LogoProps) {
  return <span className={className} style={{ height, width: height }} />;
}

export function GoodFirmsLogo({ className, height = MARK }: LogoProps) {
  return <span className={className} style={{ height, width: height }} />;
}

export function DesignRushLogo({ className, height = MARK }: LogoProps) {
  return <span className={className} style={{ height, width: height }} />;
}

export const TRUST_BRAND_MAP = {
  Upwork: UpworkLogo,
  Fiverr: FiverrLogo
} as const;
