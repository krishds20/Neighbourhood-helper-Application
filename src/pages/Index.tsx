import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Users, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background">
      <nav className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl">
              <HeartHandshake className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Helpmate
            </span>
          </div>
          <Link to="/auth">
            <Button size="lg" className="shadow-lg">Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-2 rounded-3xl p-10 shadow-xl bg-gradient-to-b from-white/50 to-white/30">
          <h1 className="p-4 text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Connect. Help. Thrive Together.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Helpmate brings communities together by connecting people who need help with those willing to offer assistance.
          </p>
          <Link to="/auth">
            <Button size="lg" className="text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all">
              Join Helpmate Today
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border/50">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <Search className="h-12 w-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Find Help</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Browse help requests in your community and offer assistance where you can make a difference
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border/50">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-accent/10 rounded-2xl">
                  <Users className="h-12 w-12 text-accent" />
                </div>
              </div>
              <CardTitle className="text-2xl">Post Requests</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Need help? Create a request and connect with community members ready to assist you
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border/50">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">

              </div>
              <CardTitle className="text-2xl">Stay Connected</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Coordinate with helpers through our messaging system and build lasting community bonds
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-32 text-center max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to make a difference?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of community members helping each other every day
            </p>
          </div>
          <Link to="/auth">
            <Button size="lg" variant="outline" className="mt-6 text-lg px-10 py-6 border-2 shadow-lg hover:shadow-xl transition-all">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t mt-32 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Helpmate. Building stronger communities together.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
