"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Sarah J.",
    avatar: "",
    content:
      "MyFitPal has completely transformed my fitness routine. The progress tracking is incredible!",
  },
  {
    name: "Mike T.",
    avatar: "",
    content:
      "I love the community aspect of MyFitPal. It keeps me motivated and accountable.",
  },
  {
    name: "Emily R.",
    avatar: "",
    content:
      "The workout planner is a game-changer. I've never been so consistent with my fitness goals.",
  },
  {
    name: "Arjun K.",
    avatar: "",
    content:
      "This app has helped me stay focused on my health and fitness goals.",
  },
  {
    name: "Rita S.",
    avatar: "",
    content:
      "Using MyFitPal has brought a significant improvement to my lifestyle.",
  },
  {
    name: "Sunita D.",
    avatar: "",
    content:
      "This app has helped me track my daily exercise and diet.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-gray-100 dark:bg-customGray">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className="p-1">
                  <Card className=" h-44">
                    <CardContent className="p-6">
                      <p className=" mb-4">{testimonial.content}</p>
                      <div className="flex items-center">
                        <Avatar className="mr-3">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">
                          {testimonial.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
