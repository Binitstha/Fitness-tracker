import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const WorkoutList = () => {
  return <>
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Workout title</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Workout description</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Update</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Workout title</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Workout description</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Update</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Workout title</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Workout description</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Update</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  </>;
};

export default WorkoutList;
