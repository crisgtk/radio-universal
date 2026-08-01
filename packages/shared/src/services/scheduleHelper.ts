import { DayOfWeek, ProgramSchedule } from '../types';

export const DAYS_OF_WEEK: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export function getCurrentDaySpanish(date: Date = new Date()): DayOfWeek {
  const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const map: Record<number, DayOfWeek> = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
  };
  return map[dayIndex];
}

export function getCurrentTimeHHMM(date: Date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function findCurrentProgram(
  programs: ProgramSchedule[],
  currentDay: DayOfWeek = getCurrentDaySpanish(),
  currentTime: string = getCurrentTimeHHMM()
): ProgramSchedule | null {
  const todaysPrograms = programs.filter(p => p.day === currentDay);

  for (const prog of todaysPrograms) {
    if (currentTime >= prog.startTime && currentTime <= prog.endTime) {
      return prog;
    }
  }

  return null;
}

export function sortProgramsByTime(programs: ProgramSchedule[]): ProgramSchedule[] {
  return [...programs].sort((a, b) => a.startTime.localeCompare(b.startTime));
}
