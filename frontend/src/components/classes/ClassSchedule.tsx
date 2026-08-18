import { useState, useMemo } from 'react';
import { GymClassDto } from '@/types/gym';
import ClassCard from '@/components/classes/ClassCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTrainers } from '@/hooks/useBooking';
import { Skeleton } from '@/components/ui/skeleton';

interface ClassScheduleProps {
  classes: GymClassDto[];
}

const ClassSchedule = ({ classes }: ClassScheduleProps) => {
  const [filterTrainer, setFilterTrainer] = useState<string>('');
  const [filterSearch, setFilterSearch] = useState<string>('');
  const { data: trainers, isLoading: isLoadingTrainers } = useTrainers();

  const filteredClasses = useMemo(() => {
    let filtered = classes;

    if (filterTrainer) {
      filtered = filtered.filter(cls => cls.trainerId === filterTrainer);
    }

    if (filterSearch) {
      filtered = filtered.filter(
        cls =>
          cls.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
          cls.description.toLowerCase().includes(filterSearch.toLowerCase()) ||
          cls.trainerName.toLowerCase().includes(filterSearch.toLowerCase())
      );
    }

    // Sort by start time
    return filtered.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [classes, filterTrainer, filterSearch]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search classes..."
          value={filterSearch}
          onChange={e => setFilterSearch(e.target.value)}
          className="flex-grow"
          data-testid="class-search-input"
        />
        {isLoadingTrainers ? (
          <Skeleton className="w-full sm:w-[200px] h-10" />
        ) : (
          <Select onValueChange={setFilterTrainer} value={filterTrainer} data-testid="trainer-filter-select">
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by Trainer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="" data-testid="trainer-filter-all">All Trainers</SelectItem>
              {trainers?.map(trainer => (
                <SelectItem key={trainer.id} value={trainer.id.toString()} data-testid={`trainer-filter-${trainer.id}`}>
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {filteredClasses.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg">No classes found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map(cls => (
            <ClassCard key={cls.id} gymClass={cls} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;