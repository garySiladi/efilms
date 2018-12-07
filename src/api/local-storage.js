// @flow

export type VideoProgressType = {
  episodeId: number,
  progressTime: number,
};

export const HISTORY_LIST = 'history';

export function saveVideoProgress(id: number, progress: number) {
  if (typeof (localStorage) !== 'undefined') {
    const currentHistory: ?string = localStorage.getItem(HISTORY_LIST);
    const parsedCurrentHistory = JSON.parse(currentHistory || 'null') || [];
    const indexOfVideo = parsedCurrentHistory.findIndex(element => element.episodeId === id);
    if (indexOfVideo === -1) {
      parsedCurrentHistory.push({
        episodeId: id,
        progressTime: progress,
      });
    } else {
      parsedCurrentHistory[indexOfVideo].progressTime = progress;
    }
    localStorage.setItem(HISTORY_LIST, JSON.stringify(parsedCurrentHistory));
  }
}

export function getProgressTimeById(id: number) {
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  const parsedData = JSON.parse(data || 'null');
  if (parsedData) {
    const requiredEpisode = parsedData.find(episode => episode.episodeId === id);
    return requiredEpisode ? requiredEpisode.progressTime : 0;
  }
  return 0;
}

export function getLastWatchedEpisodeID(episodeIDs: Array<number>) {
  const data: ?string = localStorage.getItem(HISTORY_LIST);
  const historyData = JSON.parse(data || 'null');
  if (historyData) {
    return episodeIDs.find(episodeID =>
      historyData.every(
        histItem => histItem.episodeId !== episodeID || histItem.progressTime < 95,
      ),
    ) || episodeIDs[0];
  }
  return episodeIDs[0];
}
