import { MetricType } from 'web-vitals';
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
    trackEvent(name, {
        value: delta, // Built-in GA4 metric, can be summed
        metric_id: id, // Custom param to aggregate events
        metric_value: value, // Optional
        metric_delta: delta, // Optional
        // Add other optional/debug params here
        // metric_rating: 'good' | 'ni' | 'poor',
        // debug_info: '...',
    });

export const reportWebVitals = (onPerfEntry?: (metric: MetricType) => void): void => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
            onCLS(onPerfEntry);
            onINP(onPerfEntry);
            onFCP(onPerfEntry);
            onLCP(onPerfEntry);
            onTTFB(onPerfEntry);
        });
    }
};

export const reportWebVitalsToGA = (): void => {
    if (hasGtag()) {
        reportWebVitals(sendToGoogleAnalytics);
    }
};
