import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideAuth0 } from '@auth0/auth0-angular';

platformBrowserDynamic()
	.bootstrapModule(AppModule, {
		providers: [
			provideAuth0({
				domain: '{yourDomain}',
				clientId: '{yourClientID}',
				cacheLocation: 'localstorage',
				authorizationParams: {
					redirect_uri: window.location.origin
				}
			}),
		],
	})
	.catch((err) => console.error(err));
