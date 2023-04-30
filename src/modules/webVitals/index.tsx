import { ReportHandler } from 'web-vitals';
import { trackEvent, hasGtag } from '@/modules/tracking/ga4';

export const sendToGoogleAnalytics = ({
    name,
    delta,
    value,
    id,
}: {
    name: string;
    delta: number;
    value: number;
    id: string;
}): void =>
    trackEvent(
        {
            // Built-in params:
            value: delta, // Use `delta` so the value can be summed.
            // Custom params:
            metric_id: id, // Needed to aggregate events.
            metric_value: value, // Optional.
            metric_delta: delta, // Optional.

            // OPTIONAL: any additional params or debug info here.
            // See: https://web.dev/debug-web-vitals-in-the-field/
            // metric_rating: 'good' | 'ni' | 'poor',
            // debug_info: '...',
            // ...
        },
        name,
    );

export const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};

export const reportWebVitalsToGA = (): void => {
    hasGtag() && reportWebVitals(sendToGoogleAnalytics);
};
