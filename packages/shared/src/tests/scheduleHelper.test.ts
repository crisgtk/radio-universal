import { describe, expect, it } from 'vitest';
import { INITIAL_PROGRAMS } from '../services/mockStorage';
import { findCurrentProgram, sortProgramsByTime } from '../services/scheduleHelper';

describe('scheduleHelper', () => {
  it('finds current program matching day and time', () => {
    const mondayMorningProg = findCurrentProgram(INITIAL_PROGRAMS, 'Lunes', '08:00');
    expect(mondayMorningProg).not.toBeNull();
    expect(mondayMorningProg?.title).toBe('Amanecer con Dios');

    const sundayCultoProg = findCurrentProgram(INITIAL_PROGRAMS, 'Domingo', '11:30');
    expect(sundayCultoProg).not.toBeNull();
    expect(sundayCultoProg?.title).toBe('Culto General en Vivo');

    const offScheduleProg = findCurrentProgram(INITIAL_PROGRAMS, 'Martes', '03:00');
    expect(offScheduleProg).toBeNull();
  });

  it('sorts programs chronologically by start time', () => {
    const sorted = sortProgramsByTime(INITIAL_PROGRAMS);
    expect(sorted[0].startTime <= sorted[sorted.length - 1].startTime).toBe(true);
  });
});
