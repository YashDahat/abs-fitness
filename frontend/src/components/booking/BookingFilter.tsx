import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFitnessClasses } from '@/hooks/fitnessClassHooks';

interface BookingFilterProps {
  onFilterChange: (filters: {
    classId?: number;
    userId?: number;
    startDate?: string;
    endDate?: string;
  }) => void;
}

const BookingFilter: React.FC<BookingFilterProps> = ({ onFilterChange }) => {
  const [classId, setClassId] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const { data: fitnessClasses, isLoading: isLoadingClasses } = useFitnessClasses();

  useEffect(() => {
    const filters: {
      classId?: number;
      userId?: number;
      startDate?: string;
      endDate?: string;
    } = {};

    if (classId) {
      filters.classId = parseInt(classId);
    }
    if (userId) {
      filters.userId = parseInt(userId);
    }
    if (startDate) {
      filters.startDate = format(startDate, 'yyyy-MM-dd');
    }
    if (endDate) {
      filters.endDate = format(endDate, 'yyyy-MM-dd');
    }

    onFilterChange(filters);
  }, [classId, userId, startDate, endDate, onFilterChange]);

  const handleClearFilters = (): void => {
    setClassId(undefined);
    setUserId('');
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1 min-w-[180px]">
        <Select value={classId} onValueChange={setClassId} data-testid="booking-filter-class">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {isLoadingClasses ? (
              <SelectItem value="loading" disabled>
                Loading classes...
              </SelectItem>
            ) : (
              fitnessClasses?.map((cls) => (
                <SelectItem key={cls.id} value={String(cls.id)}>
                  {cls.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <Input
          type="number"
          placeholder="Filter by User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          data-testid="booking-filter-userId"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[200px] justify-start text-left font-normal',
              !startDate && 'text-muted-foreground',
            )}
            data-testid="booking-filter-start-date-trigger"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, 'PPP') : <span>Start Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            data-testid="booking-filter-start-date-calendar"
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[200px] justify-start text-left font-normal',
              !endDate && 'text-muted-foreground',
            )}
            data-testid="booking-filter-end-date-trigger"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, 'PPP') : <span>End Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            data-testid="booking-filter-end-date-calendar"
          />
        </PopoverContent>
      </Popover>

      <Button onClick={handleClearFilters} variant="outline" data-testid="booking-filter-clear-button">
        Clear Filters
      </Button>
    </div>
  );
};

export default BookingFilter;