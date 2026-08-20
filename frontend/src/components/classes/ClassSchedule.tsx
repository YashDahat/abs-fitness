import { useState } from 'react';
import { FitnessClassDto } from '@/types/fitnessClass';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format, parseISO, getDay } from 'date-fns';
import BookingModal from '@/components/classes/BookingModal';

interface ClassScheduleProps {
  classes: FitnessClassDto[];
}

export default function ClassSchedule({ classes }: ClassScheduleProps) {
  const [selectedClass, setSelectedClass] = useState<FitnessClassDto | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const groupedClasses = classes.reduce((acc, classItem) => {
    const scheduleTime = parseISO(classItem.scheduleTime);
    const dayIndex = getDay(scheduleTime); // 0 for Sunday, 1 for Monday, etc.
    const dayName = daysOfWeek[dayIndex];

    if (!acc[dayName]) {
      acc[dayName] = [];
    }
    acc[dayName].push(classItem);
    return acc;
  }, {} as Record<string, FitnessClassDto[]>);

  const handleClassClick = (classItem: FitnessClassDto): void => {
    setSelectedClass(classItem);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (): void => {
    setIsBookingModalOpen(false);
    setSelectedClass(null);
    // Optionally, refresh classes or show a success message
  };

  const handleBookingModalClose = (): void => {
    setIsBookingModalOpen(false);
    setSelectedClass(null);
  };

  return (
    <section className="py-16 px-4 bg-white" data-testid="class-schedule-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="class-schedule-title">
          Our Class Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daysOfWeek.map((day) => (
            <Card key={day} className="shadow-lg hover:shadow-xl transition-shadow duration-200" data-testid={`day-card-${day.toLowerCase()}`}>
              <CardHeader className="bg-gray-100 rounded-t-xl py-4">
                <CardTitle className="text-xl font-semibold text-center">{day}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {groupedClasses[day] && groupedClasses[day].length > 0 ? (
                  <div className="space-y-4">
                    {groupedClasses[day]
                      .sort((a, b) => parseISO(a.scheduleTime).getTime() - parseISO(b.scheduleTime).getTime())
                      .map((classItem) => (
                        <Button
                          key={classItem.id}
                          variant="outline"
                          className="w-full flex flex-col items-start h-auto p-4 text-left hover:bg-gray-50 transition-all duration-200"
                          onClick={() => handleClassClick(classItem)}
                          data-testid={`class-item-${classItem.id}`}
                        >
                          <span className="font-semibold text-lg">{classItem.name}</span>
                          <span className="text-sm text-gray-600">
                            {format(parseISO(classItem.scheduleTime), 'h:mm a')} -{' '}
                            {format(
                              new Date(parseISO(classItem.scheduleTime).getTime() + classItem.durationMinutes * 60 * 1000),
                              'h:mm a'
                            )}
                          </span>
                          <span className="text-sm text-gray-500">{classItem.trainerName}</span>
                        </Button>
                      ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No classes scheduled</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedClass && (
          <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle data-testid="booking-modal-title">Book Class</DialogTitle>
                <DialogDescription>
                  Confirm your booking for {selectedClass.name}.
                </DialogDescription>
              </DialogHeader>
              <BookingModal
                fitnessClass={selectedClass}
                onBookingSuccess={handleBookingSuccess}
                onClose={handleBookingModalClose}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}