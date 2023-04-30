export interface PageViewTrackingData {
    language?: string;
    location?: string;
}

interface PageViewTracking extends PageViewTrackingData {
    hitType: string;
}

export const getPageViewData = (data?: PageViewTrackingData): PageViewTracking => ({
    hitType: 'pageview',
    location: window.location.href,
    ...data,
});
