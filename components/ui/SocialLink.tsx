interface Props {
  href?: string;
  label: string;
  network: "telegram" | "instagram" | "vk";
}

export default function SocialLink({ href, label, network }: Props) {
  const icon = (
    <>
      {network === "telegram" && (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
          <path d="M21.7 3.4c-.3-.3-.8-.4-1.3-.2L3.1 9.9c-.8.3-1.3.8-1.2 1.4.1.5.5.9 1.2 1.1l4.4 1.4 1.7 5.3c.2.6.6 1 1.1 1h.1c.4 0 .8-.2 1.1-.6l2.5-2.8 4.5 3.3c.5.4 1 .5 1.5.3.5-.2.8-.7.9-1.3l1.4-14.2c.1-.6-.1-1.1-.6-1.4ZM9.9 13.2l7.8-5.7-6.4 6.7-.6 2.8-.8-3.8Z" />
        </svg>
      )}
      {network === "instagram" && (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.8">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.6" cy="6.6" r="1" className="fill-current stroke-none" />
        </svg>
      )}
      {network === "vk" && (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
          <path d="M3.4 6.7c.2 7 3.7 11.2 9.8 11.2h.4v-4c2.2.2 3.9 1.9 4.6 4h3.3c-.9-3.1-3.2-4.9-4.6-5.6 1.4-.9 3.4-3 3.9-5.6h-3c-.7 2.2-2.6 4.3-4.2 4.5V6.7h-3v7.8C8.8 14 6.5 11.8 6.4 6.7h-3Z" />
        </svg>
      )}
    </>
  );

  const className = "grid size-11 place-items-center border border-white/20 bg-white/5 text-white transition-colors duration-300";

  if (!href) {
    return (
      <span aria-label={label} aria-disabled="true" title={label} className={`${className} cursor-not-allowed opacity-45`}>
        {icon}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={`${className} hover:border-pfa-accent hover:bg-pfa-accent hover:text-pfa-background`}
    >
      {icon}
    </a>
  );
}
