interface Window {
    dataLayer?: Array<{
        event: string;
        action: string;
        [key: string]: any;
    }>;
}
