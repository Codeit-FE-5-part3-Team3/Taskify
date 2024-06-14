import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICard, IColumn } from "@/type";
import Image from "next/image";
import CardTag from "../card-tag/CardTag";
import { CommentForm } from "../comment-form/CommentForm";
import CommentList from "../comment-list/CommentList";

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  cardData?: ICard;
  column?: IColumn;
};

export function CardList({ children }: CardProps) {
  return <div className="flex flex-col gap-4 overflow-auto">{children}</div>;
}

export function Card({ children, cardData, column }: CardProps) {
  if (!cardData || !column) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col w-[314px] h-full p-5 bg-white border-2 border-[#D9D9D9] rounded-md gap-2.5">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {cardData.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 w-full">
            <div className="w-fit h-fit shrink-0">
              <div className="rounded-full bg-violet-50 w-fit h-fit px-2 py-1 gap-1.5 flex items-center ">
                <div className="w-1.5 h-1.5 bg-violet-100 rounded-full"></div>
                <span className="text-violet-100">{column.title}</span>
              </div>
            </div>

            {cardData !== undefined && cardData.tags.length > 0 && (
              <div className="flex">
                <div className="w-5 h-8 border-l border-gray-300"></div>
                <CardTag cards={cardData} />
              </div>
            )}
          </div>
          <span>{cardData?.description}</span>

          {cardData.imageUrl && (
            <div className="relative w-[450px] h-[263px]">
              <Image
                src={cardData.imageUrl}
                alt={cardData.description}
                fill
                objectFit="contain"
              />
            </div>
          )}
        </div>

        <CommentForm
          cardId={cardData.id}
          columnId={column.id}
          dashboardId={column?.dashboardId}
        />
        <CommentList cardId={cardData.id} />
      </DialogContent>
    </Dialog>
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
  return (
    <ul className="flex flex-row gap-2 flex-wrap items-center">{children}</ul>
  );
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
