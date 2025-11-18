import { HelpRequest } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface HelpRequestCardProps {
  request: HelpRequest;
}

export const HelpRequestCard = ({ request }: HelpRequestCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl line-clamp-2 flex-1">{request.title}</CardTitle>
          <Badge 
            variant={request.status === "active" ? "default" : "secondary"}
            className="shrink-0"
          >
            {request.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {request.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="font-normal">
            {request.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={() => navigate(`/request/${request.id}`)}
          className="w-full"
          variant="outline"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
