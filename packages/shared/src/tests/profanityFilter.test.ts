import { describe, expect, it } from 'vitest';
import { containsProfanity, processForumSubmission, sanitizeText } from '../services/profanityFilter';

describe('profanityFilter', () => {
  it('detects profanity correctly', () => {
    expect(containsProfanity('Dios les bendiga mucho')).toBe(false);
    expect(containsProfanity('Un saludo para la radio')).toBe(false);
    expect(containsProfanity('Este mensaje tiene una palabra mierda fea')).toBe(true);
    expect(containsProfanity('Hola WEON lindo')).toBe(true);
  });

  it('sanitizes text replacing forbidden words with asterisks', () => {
    const clean = sanitizeText('Hola esta es una mierda');
    expect(clean).toBe('Hola esta es una ***');
  });

  it('processes forum submissions and flags offensive content', () => {
    const cleanSubmission = processForumSubmission('Juan Perez', 'Bendiciones a la radio');
    expect(cleanSubmission.isFlagged).toBe(false);
    expect(cleanSubmission.cleanMessage).toBe('Bendiciones a la radio');

    const dirtySubmission = processForumSubmission('Pedro', 'Vayanse a la mierda');
    expect(dirtySubmission.isFlagged).toBe(true);
    expect(dirtySubmission.cleanMessage).toBe('Vayanse a la ***');
  });
});
