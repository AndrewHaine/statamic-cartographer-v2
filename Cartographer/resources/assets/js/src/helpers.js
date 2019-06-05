// Dynamically create the gmaps script tag
const _loadScript = src => {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = resolve;
        script.src = src;
        document.getElementsByTagName('head')[0].appendChild(script);
    });
};
