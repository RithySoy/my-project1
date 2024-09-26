// 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";

const images = [
  {
    src: "images/Furnitur.jpg",
    description: "Furniture",
    price:'450$',
  },
  {
    src: "images/smartphones.jpg",
    description: "Eletronices Devices",
  },
  {
    src: "images/clothing.jpg",
    description: "Clothing",
  },
  {
    src: "images/laptop.jpg",
    description: "Latop",
  },
  {
    src: "images/matrail.jpg",
    description: "Edcaucation Materails",
  },
];

const CarouselPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Large Carousel at the top */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mb-12"  // Adds margin below the large carousel
      >
        <CarouselContent className="-ml-1">
          {images.map((item, index) => (
            <CarouselItem key={index} className="pl-1 sm:basis-1/1 md:basis-1/1 lg:basis-1/1 xl:basis-1/1">
              <div className="p-2">
                <Card className="w-full h-96"> {/* Adjust height for larger carousel */}
                  <CardContent className="flex flex-col h-full items-center justify-center p-6">
                    <img src={item.src} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    <p className="mt-2 text-center text-lg text-gray-600">{item.description}</p>
                    
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>

      {/* Smaller Carousel (the existing one) */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {images.map((item, index) => (
            <CarouselItem key={index} className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    <img src={item.src} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    <p className="mt-2 text-center text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>
      
    </div>
  );
};

export default CarouselPage;
