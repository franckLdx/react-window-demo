export type LoadStatus = 'initial' | 'loading' | 'loaded' | 'error';
export const canLoad = (loadStatus: LoadStatus) => (loadStatus === 'initial' || loadStatus === 'error');
