import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const WorkoutList = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full py-2 mb-10"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="w-[20.8rem]">
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" left-[30rem] top-[210px]" />
      <CarouselNext className=" right-[30rem] top-[210px]" />
    </Carousel>
  );
};

export default WorkoutList;
