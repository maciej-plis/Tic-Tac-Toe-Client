import { Pipe, PipeTransform } from '@angular/core';
import { GameInfo } from './games.service';

abstract class SortingMethod {
  abstract sort(games: GameInfo[]): GameInfo[];
}

class SortByNames extends SortingMethod {
  sort(games: GameInfo[]): GameInfo[] {
    return games.sort((a: GameInfo, b: GameInfo) => {
      return a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
  }
}

class SortByPlayersCount extends SortingMethod {
  sort(games: GameInfo[]): GameInfo[] {
    return games.sort((a: GameInfo, b: GameInfo) => {
      return Object.keys(b.players).length - Object.keys(a.players).length;
    })
  }
}

export const SortingMethods = {
  SORT_BY_NAMES: new SortByNames(),
  SORT_BY_PLAYERS_COUNT: new SortByPlayersCount() 
}

@Pipe({
  name: 'gamesSorting'
})
export class GamesSorting implements PipeTransform {

  transform(games: GameInfo[], method: string): GameInfo[] {
    return SortingMethods[method].sort(games);
  }
  
}
