interface Props {
  href: string;
  label: string;
  network: "telegram";
}

export default function SocialLink({ href, label, network }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:border-pfa-accent hover:bg-pfa-accent hover:text-pfa-background"
    >
      {network === "telegram" && (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
          <path d="M21.7 3.4c-.3-.3-.8-.4-1.3-.2L3.1 9.9c-.8.3-1.3.8-1.2 1.4.1.5.5.9 1.2 1.1l4.4 1.4 1.7 5.3c.2.6.6 1 1.1 1h.1c.4 0 .8-.2 1.1-.6l2.5-2.8 4.5 3.3c.5.4 1 .5 1.5.3.5-.2.8-.7.9-1.3l1.4-14.2c.1-.6-.1-1.1-.6-1.4ZM9.9 13.2l7.8-5.7-6.4 6.7-.6 2.8-.8-3.8Z" />
        </svg>
      )}
    </a>
  );
}
