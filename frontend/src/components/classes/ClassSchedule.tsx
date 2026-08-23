import type { JSX } from 'react';
import React, { useState } from 'react';
import { FitnessClassDto } from '@/types/fitnessClass';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface ClassScheduleProps {
  classes: FitnessClassDto[];
  onSelectClass: (cls: FitnessClassDto) => void;
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ClassSchedule({ classes, onSelectClass }: ClassScheduleProps): React.JSX.Element {
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[new Date().getDay()]);

  const getClassesForDay = (day: string): FitnessClassDto[] => {
    const dayIndex = daysOfWeek.indexOf(day);
    return classes
      .filter((cls) => {
        const classDate = new Date(cls.scheduleTime);
        return classDate.getDay() === dayIndex;
      })
      .sort((a, b) => new Date(a.scheduleTime).getTime() - new Date(b.scheduleTime).getTime());
  };

  return (
    <div className="w-full">
      <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 gap-1 h-auto">
          {daysOfWeek.map((day) => (
            <TabsTrigger key={day} value={day} className="py-2 px-1 text-xs md:text-sm">
              {day.substring(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>
        {daysOfWeek.map((day) => (
          <TabsContent key={day} value={day} className="mt-4">
            <h3 className="text-xl font-semibold mb-4">{day} Classes</h3>
            {getClassesForDay(day).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getClassesForDay(day).map((cls) => (
                  <Card key={cls.id} className="flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle className="text-lg">{cls.name}</CardTitle>
                      <p className="text-sm text-gray-600">{cls.trainerName}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-md font-medium mb-2">
                        {new Date(cls.scheduleTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' - '}
                        {new Date(new Date(cls.scheduleTime).getTime() + cls.durationMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">{cls.description}</p>
                      <p className={cn("text-sm font-medium", cls.capacity - cls.bookedSlots > 0 ? "text-green-600" : "text-red-600")}>
                        Slots Available: {cls.capacity - cls.bookedSlots} / {cls.capacity}
                      </p>
                      <Button
                        onClick={() => onSelectClass(cls)}
                        disabled={cls.capacity - cls.bookedSlots <= 0}
                        className="mt-4 w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                        data-testid={`book-class-${cls.id}`}
                      >
                        {cls.capacity - cls.bookedSlots <= 0 ? 'Fully Booked' : 'Book Now'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No classes scheduled for {day}.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}