
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TradeEntryForm from "@/components/journal/TradeEntryForm";

interface TradeEntryCardProps {
  onSubmit: () => void;
}

const TradeEntryCard = ({ onSubmit }: TradeEntryCardProps) => {
  return (
    <Card className="mb-8 animate-fade-in">
      <CardHeader>
        <CardTitle>Ajouter une nouvelle transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <TradeEntryForm onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
};

export default TradeEntryCard;
