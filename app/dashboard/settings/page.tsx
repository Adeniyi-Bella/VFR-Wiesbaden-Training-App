import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your team and application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input id="team-name" placeholder="Enter your team name" defaultValue="Training Team" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="team-description">Team Description</Label>
                <Textarea
                  id="team-description"
                  placeholder="Enter a description for your team"
                  defaultValue="Our training team focuses on developing skills and improving performance."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-profile">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Make your team profile visible to others</p>
                </div>
                <Switch id="public-profile" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="training-reminders">Training Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders before training sessions</p>
                </div>
                <Switch id="training-reminders" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="performance-updates">Performance Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about player performance</p>
                </div>
                <Switch id="performance-updates" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-notifications">System Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive system updates and announcements</p>
                </div>
                <Switch id="system-notifications" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 cursor-pointer bg-background">
                      <div className="w-full h-10 rounded bg-primary"></div>
                      <div className="w-full h-5 mt-2 rounded bg-muted"></div>
                      <div className="w-full h-5 mt-2 rounded bg-muted"></div>
                    </div>
                    <Label className="text-sm">Light</Label>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 cursor-pointer bg-slate-950">
                      <div className="w-full h-10 rounded bg-slate-400"></div>
                      <div className="w-full h-5 mt-2 rounded bg-slate-800"></div>
                      <div className="w-full h-5 mt-2 rounded bg-slate-800"></div>
                    </div>
                    <Label className="text-sm">Dark</Label>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 cursor-pointer bg-background">
                      <div className="w-full h-10 rounded bg-slate-400"></div>
                      <div className="w-full h-5 mt-2 rounded bg-muted"></div>
                      <div className="w-full h-5 mt-2 rounded bg-muted"></div>
                    </div>
                    <Label className="text-sm">System</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="density">Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger id="density">
                    <SelectValue placeholder="Select density" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced options for your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-export">Data Export</Label>
                  <p className="text-sm text-muted-foreground">Enable exporting of player and session data</p>
                </div>
                <Switch id="data-export" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-access">API Access</Label>
                  <p className="text-sm text-muted-foreground">Allow external applications to access your data</p>
                </div>
                <Switch id="api-access" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention</Label>
                <Select defaultValue="1year">
                  <SelectTrigger id="data-retention">
                    <SelectValue placeholder="Select data retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions are destructive and cannot be reversed.
                </p>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive/10"
                  >
                    Reset Application Data
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
