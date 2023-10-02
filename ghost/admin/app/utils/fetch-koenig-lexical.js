import config from 'ghost-admin/config/environment';
import ghostPaths from 'ghost-admin/utils/ghost-paths';

export default async function fetchKoenigLexical() {
    if (window['@tryghost/koenig-lexical']) {
        return window['@tryghost/koenig-lexical'];
    }

    const baseUrl = (config.cdnUrl ? `${config.cdnUrl}assets/` : ghostPaths().assetRootWithHost);
    const url = new URL(`${baseUrl}koenig-lexical/koenig-lexical.js`);

    if (url.protocol === 'http:') {
        window['@tryghost/koenig-lexical'] = await import(`http://${url.host}${url.pathname}`);
    } else {
        window['@tryghost/koenig-lexical'] = await import(`https://${url.host}${url.pathname}`);
    }
    return window['@tryghost/koenig-lexical'];
}
