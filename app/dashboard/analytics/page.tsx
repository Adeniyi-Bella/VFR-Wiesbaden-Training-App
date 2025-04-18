import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Analytics</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Average Attendance</CardTitle>
                <CardDescription>Per training session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
                <div className="mt-4 h-[120px] w-full bg-muted rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Chart placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance Rating</CardTitle>
                <CardDescription>Average player rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.4/10</div>
                <p className="text-xs text-muted-foreground mt-1">+0.3 from last month</p>
                <div className="mt-4 h-[120px] w-full bg-muted rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Chart placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Training Frequency</CardTitle>
                <CardDescription>Sessions per week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2</div>
                <p className="text-xs text-muted-foreground mt-1">Same as last month</p>
                <div className="mt-4 h-[120px] w-full bg-muted rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Chart placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
              <CardDescription>Team performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Monthly progress chart placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
              <CardDescription>Player attendance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Attendance chart placeholder</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Attendees</CardTitle>
                <CardDescription>Players with highest attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Top attendees chart placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance by Day</CardTitle>
                <CardDescription>Attendance patterns by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Attendance by day chart placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Performance metrics chart placeholder</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Players with highest ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Top performers chart placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Trends</CardTitle>
                <CardDescription>Player improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Improvement trends chart placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
