import { workoutType } from "@/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
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
import { deleteWorkout } from "@/api/workout/workout";
import { UpdateWorkout } from "./updateWorkout";

const WorkoutList = ({
  workoutData,
  setWorkoutData,
  onWorkoutUpdate,
}: {
  workoutData: workoutType[];
  setWorkoutData: React.Dispatch<React.SetStateAction<workoutType[]>>;
  onWorkoutUpdate: () => void;
}) => {
  const handleDelete = (id: string) => {
    try {
      deleteWorkout(id);
      setWorkoutData((prev) => prev.filter((workout) => workout.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full py-2 mb-10"
    >
      <CarouselContent>
        {workoutData.length > 0 ? (
          workoutData.map((workout, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="w-[20.9rem] h-full">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <div>{workout.type}</div>
                    <div>{workout.date}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="grid grid-cols-2 gap-2 h-[3rem]">
                    <div>Calories: {workout.calories} Kcal</div>
                    {workout.effort && <div>Effort: {workout.effort}</div>}
                    {workout.speed && <div>Speed: {workout.speed} km/h</div>}
                    {workout.duration && (
                      <div>Duration: {workout.duration} min</div>
                    )}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between bottom-0">
                  <UpdateWorkout workout={workout} onWorkoutUpdate={onWorkoutUpdate} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action is irreversible. Deleting this workout
                          will permanently remove it from your records. Are you
                          sure you want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(workout.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="w-[20.8rem]">
              <CardHeader>
                <CardTitle>No Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You have no workouts logged. Add some workouts to see them
                  here.
                </CardDescription>
              </CardContent>
            </Card>
          </CarouselItem>
        )}
      </CarouselContent>
      {workoutData.length > 3 && (
        <>
          <CarouselPrevious className="left-[30rem] top-[235px]" />
          <CarouselNext className="right-[30rem] top-[235px]" />
        </>
      )}
    </Carousel>
  );
};

export default WorkoutList;
