import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { Trash2, CheckCircle } from "lucide-react";

const RequestDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [request, setRequest] = useState<HelpRequest | null>(null);

  useEffect(() => {
    loadRequest();
  }, [id]);

  const loadRequest = () => {
    const requests = JSON.parse(localStorage.getItem("helpRequests") || "[]");
    const found = requests.find((r: HelpRequest) => r.id === id);
    setRequest(found || null);
  };

  const handleOfferHelp = () => {
    if (!request || !user) return;

    const requests = JSON.parse(localStorage.getItem("helpRequests") || "[]");
    const updated = requests.map((r: HelpRequest) =>
      r.id === id ? { ...r, offeredBy: user.id } : r
    );
    localStorage.setItem("helpRequests", JSON.stringify(updated));

    toast({ title: "You've offered to help!" });
    navigate("/board");
  };

  const handleMarkFulfilled = () => {
    if (!request) return;

    const requests = JSON.parse(localStorage.getItem("helpRequests") || "[]");
    const updated = requests.map((r: HelpRequest) =>
      r.id === id ? { ...r, status: "fulfilled" as const } : r
    );
    localStorage.setItem("helpRequests", JSON.stringify(updated));

    toast({ title: "Request marked as fulfilled!" });
    loadRequest();
  };

  const handleDelete = () => {
    const requests = JSON.parse(localStorage.getItem("helpRequests") || "[]");
    const filtered = requests.filter((r: HelpRequest) => r.id !== id);
    localStorage.setItem("helpRequests", JSON.stringify(filtered));

    toast({ title: "Request deleted" });
    navigate("/board");
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-8">
          <p className="text-center text-muted-foreground">Request not found</p>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === request.requesterId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <div className="container mx-auto py-12 max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <CardTitle className="text-2xl">{request.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={request.status === "active" ? "default" : "secondary"}>
                    {request.status}
                  </Badge>
                  <Badge variant="outline">{request.category}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{request.description}</p>
            </div>

            <div className="text-sm text-muted-foreground">
              Posted by {request.requesterName} •{" "}
              {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
            </div>

            <div className="flex gap-4">
              {!isOwner && request.status === "active" && !request.offeredBy && (
                <Button onClick={handleOfferHelp} className="flex-1">
                  Offer Help
                </Button>
              )}
              
              {isOwner && (
                <>
                  {request.status === "active" && (
                    <Button onClick={handleMarkFulfilled} variant="outline" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Fulfilled
                    </Button>
                  )}
                  <Button onClick={handleDelete} variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestDetail;
