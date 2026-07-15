import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("account");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  const handleSave = () => {
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  return (
    <div className="mx-auto max-w-[1280px] border-x bg-background">
      <section className="border-b px-8 py-8 lg:px-16">
        {/* Header */}
        <div className="mb-6">
          <h1 className="data-label text-[14px] tracking-[0.08em] text-muted-foreground uppercase">
            Settings
          </h1>
        </div>

        <Separator className="mb-8 bg-border" />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details and email address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    defaultValue="user@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Display Name</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Your display name"
                    defaultValue="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    type="text"
                    placeholder="Tell us about yourself"
                    defaultValue=""
                  />
                </div>

                <Button onClick={handleSave} className="w-full sm:w-auto">
                  {saveStatus === "saved" ? "Saved!" : "Save Changes"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button onClick={handleSave} className="w-full sm:w-auto">
                  {saveStatus === "saved" ? "Updated!" : "Update Password"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Delete Account
                </CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 border-destructive/20 bg-destructive/5">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">
                    This action cannot be undone. Please proceed with caution.
                  </AlertDescription>
                </Alert>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>
                  Customize how BlueLearn looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Input
                    id="theme"
                    type="text"
                    placeholder="System"
                    defaultValue="System"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Input
                    id="font-size"
                    type="text"
                    placeholder="Medium"
                    defaultValue="Medium"
                  />
                </div>

                <Button onClick={handleSave} className="w-full sm:w-auto">
                  {saveStatus === "saved" ? "Saved!" : "Save Changes"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Manage how you receive updates and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="text-base">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new guides and content
                    </p>
                  </div>
                  <Checkbox id="email-notifications" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-digest" className="text-base">
                      Weekly Digest
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get a weekly summary of new content
                    </p>
                  </div>
                  <Checkbox id="weekly-digest" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="activity-notifications"
                      className="text-base"
                    >
                      Activity Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Be notified of changes to your saved content
                    </p>
                  </div>
                  <Checkbox id="activity-notifications" />
                </div>

                <Button onClick={handleSave} className="mt-4 w-full sm:w-auto">
                  {saveStatus === "saved" ? "Saved!" : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>
                  Control how your data is used and shared
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-public" className="text-base">
                      Public Profile
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to view your profile and contributions
                    </p>
                  </div>
                  <Checkbox id="profile-public" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-activity" className="text-base">
                      Show Activity
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Display your recent activity on your profile
                    </p>
                  </div>
                  <Checkbox id="show-activity" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="search-engines" className="text-base">
                      Search Engine Indexing
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow search engines to index your profile
                    </p>
                  </div>
                  <Checkbox id="search-engines" defaultChecked />
                </div>

                <Button onClick={handleSave} className="mt-4 w-full sm:w-auto">
                  {saveStatus === "saved" ? "Saved!" : "Save Settings"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>
                  Download or request deletion of your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full sm:w-auto">
                  Download Your Data
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Request Data Deletion
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
