export interface EventTrackingData {
    eventCategory: string;
    eventAction: string;
    eventLabel: string;
    eventValue?: number;
    fieldsObject?: unknown;
}

interface EventTracking extends EventTrackingData {
    hitType: string;
}

export const getEventData = (data: EventTrackingData): EventTracking => ({ hitType: 'event', ...data });
