import Image from "next/image";

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export function CardList({ children }: CardProps) {
  return <div className="flex flex-col gap-4 overflow-auto">{children}</div>;
}

export function Card({ children }: CardProps) {
  return (
    <div className="flex flex-col w-[314px] h-full p-5 bg-white border-2 border-[#D9D9D9] rounded-md gap-2.5">
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children }: CardProps) {
  return <div>{children}</div>;
};

Card.Content = function CardContent({ children }: CardProps) {
  return <div className="flex flex-col gap-2.5">{children}</div>;
};

Card.Footer = function CardFooter({ children }: CardProps) {
  return <div className="flex justify-between">{children}</div>;
};

Card.Title = function CardTitle({ children }: CardProps) {
  return <h2 className="text-[#333236] text-[16px] font-medium">{children}</h2>;
};

Card.Tag = function CardTag({ children }: CardProps) {
  return <ul className="flex flex-row gap-2">{children}</ul>;
};

Card.TagBackground = function CardTagBackground({
  children,
  style,
}: CardProps) {
  return (
    <div className="border-[1.25px] rounded" style={style}>
      {children}
    </div>
  );
};

Card.TagName = function CardTag({ children }: CardProps) {
  return (
    <li className="text-xs font-normal px-1.5 py-1 rounded">{children}</li>
  );
};

Card.DueDate = function CardDueDate({ children }: CardProps) {
  return (
    <div className="flex gap-2 text-[#787486] items-center">
      <Image src="/calendar.svg" alt="calendar" width={18} height={18} />
      {children}
    </div>
  );
};

Card.Asignee = function CardAsignee({ children }: CardProps) {
  return (
    <div className="flex justify-center items-center w-6 h-6 rounded-full bg-[#A3C4A2] text-white">
      {children}
    </div>
  );
};
