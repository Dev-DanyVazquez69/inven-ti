if(!self.define){let e,a={};const i=(i,n)=>(i=new URL(i+".js",n).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let o={};const c=e=>i(e,r),d={module:{uri:r},exports:o,require:c};a[r]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-07672ec7"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"3707ddd59b4381fd5b065c8da4c92768"},{url:"/_next/static/WXSI-gc_LtbhzhU4tAkuU/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/WXSI-gc_LtbhzhU4tAkuU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-98fc47f10a6308b5.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/261-6a92f8db7fd3dab6.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/368-8f38032a0a5f4dea.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/524.0771235678442b60.js",revision:"0771235678442b60"},{url:"/_next/static/chunks/702.cb9bc17a302aa8ba.js",revision:"cb9bc17a302aa8ba"},{url:"/_next/static/chunks/763-9ff31e4016acde80.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/972-d3d42d10071dac88.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/(auth)/register/page-b19a0746f3bcc913.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/(auth)/signin/page-fbbb69c4aba15ebf.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/(auth)/signout/page-352fb0c000585c3b.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/(device)/addDevice/page-57b9aa066b0e155d.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/(device)/devices/%5BdeviceId%5D/page-49d002925a0702c2.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/(device)/devices/page-90934150ea5ccf23.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/_not-found/page-c29a70bd1ae2df78.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/error-0705bebe8b19ab22.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/layout-02db9e709278477f.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/not-found-113d078964e195d6.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/page-eca9b1aaaaa7744f.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/app/profile/page-b6a51c3edd4d9721.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/dc112a36.16a8c6a6b6181c35.js",revision:"16a8c6a6b6181c35"},{url:"/_next/static/chunks/fd9d1056-9797a8344fb1f161.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/main-510e7be167ad8c61.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/main-app-30402a23c57cea69.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-df325f4caa198962.js",revision:"WXSI-gc_LtbhzhU4tAkuU"},{url:"/_next/static/css/2f1fcfad62ae5af7.css",revision:"2f1fcfad62ae5af7"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/android/android-launchericon-144-144.png",revision:"be681700f0697455c2acbcda458da1de"},{url:"/android/android-launchericon-192-192.png",revision:"1fab7c34559a8d242214e91392e9616d"},{url:"/android/android-launchericon-48-48.png",revision:"e4c59c0a44170af0184e310a216d2938"},{url:"/android/android-launchericon-512-512.png",revision:"b76274e49744dbf549e4f8cf43e17a63"},{url:"/android/android-launchericon-72-72.png",revision:"63e87cc2b643c1fd4bd6e9a3c77dacf0"},{url:"/android/android-launchericon-96-96.png",revision:"a228dcc5dd19addb5a1c7c7eb4495f42"},{url:"/apple-touch-icon.png",revision:"74c2152ac175e14e9d303eba0d673ff0"},{url:"/assets/animations/404.json",revision:"40b411caffc52d5a3a7e6107b4192994"},{url:"/assets/animations/404.json:Zone.Identifier",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/assets/animations/error.json",revision:"a0b308c8b799934a2e6ece3d0b4959eb"},{url:"/assets/animations/error.json:Zone.Identifier",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/assets/avatar.png",revision:"2b9647e21950579ca672a86601738d21"},{url:"/assets/notebook-asus.png",revision:"997da58ee5510733bff1ef5e34897ee1"},{url:"/assets/notebook-asus.png:Zone.Identifier",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/assets/pc-hp.png",revision:"be92e77b0b2988d3f98c218c7fc69b7b"},{url:"/assets/pc-hp.png:Zone.Identifier",revision:"2f9d9ae39cff020dcecdf626649ffb81"},{url:"/favicon-96x96.png",revision:"3196a6cc0f6cbd2657d86ec6493de09c"},{url:"/favicon.ico",revision:"54901d41cf3d0f2d3e068ec5b2429989"},{url:"/favicon.svg",revision:"f99ff7cfc08778ac777e66df3a336b6e"},{url:"/icons.json",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/ios/100.png",revision:"186b5a35cc246d7259db3f2781df8342"},{url:"/ios/1024.png",revision:"92a2b3c56b5275666959123aeaeabe21"},{url:"/ios/114.png",revision:"6f48311050ea3c20aebc6908367778f7"},{url:"/ios/120.png",revision:"b68bc212caa81e5ca04359cbc5ef3813"},{url:"/ios/128.png",revision:"fbfebfd5fe00164007bc691169eb524f"},{url:"/ios/144.png",revision:"be681700f0697455c2acbcda458da1de"},{url:"/ios/152.png",revision:"418e36d3bb7ad11a57942ad73e38b1fb"},{url:"/ios/16.png",revision:"8609be4b2ab9f48fecc1dd3c62d0f070"},{url:"/ios/167.png",revision:"70ea23631f9001c6283fe869871df16d"},{url:"/ios/180.png",revision:"0068510da22cf96b41923d18d3863434"},{url:"/ios/192.png",revision:"1fab7c34559a8d242214e91392e9616d"},{url:"/ios/20.png",revision:"f8756b40bbc4e8d374fa529c277c3aec"},{url:"/ios/256.png",revision:"3d6949a46da3401d4654e524c126aa45"},{url:"/ios/29.png",revision:"795b9f1f45476de05c4ab6d6527cf57f"},{url:"/ios/32.png",revision:"1a1947d9b5c097ebb0673e066fa1c829"},{url:"/ios/40.png",revision:"afa849832b541a18a4160e4a2cf81b48"},{url:"/ios/50.png",revision:"543a27d5f7ad1092c9b9419c2a17985b"},{url:"/ios/512.png",revision:"b76274e49744dbf549e4f8cf43e17a63"},{url:"/ios/57.png",revision:"f8b667ca4f989211e4e8fbcee8798905"},{url:"/ios/58.png",revision:"5388d8487360765aead0994eb429ae58"},{url:"/ios/60.png",revision:"966cb15cd1d038eb9a1c26d4dd0fcc2c"},{url:"/ios/64.png",revision:"781ff8030c5c519dac1fb135f6e9bd55"},{url:"/ios/72.png",revision:"63e87cc2b643c1fd4bd6e9a3c77dacf0"},{url:"/ios/76.png",revision:"0a387eae199ecfd7f3a9a6779fad0645"},{url:"/ios/80.png",revision:"234c32d58a31a0e3a48aaa8d97b0069d"},{url:"/ios/87.png",revision:"8ed7c4881c1be88847fe04af682e94c5"},{url:"/manifest.json",revision:"f5b8fc34696bba50eeaffdfc41ddb9d7"},{url:"/site.webmanifest",revision:"9090e674d41e265d5f03c180fe5f6721"},{url:"/web-app-manifest-192x192.png",revision:"53bc5d607f9455dd7667c476ae7092ad"},{url:"/web-app-manifest-512x512.png",revision:"44988d7c56f9879e768d73a4f75e81a1"},{url:"/windows11/LargeTile.scale-100.png",revision:"d47b2042fc949ca1b33c75e221cf6455"},{url:"/windows11/LargeTile.scale-125.png",revision:"8214503fecd6cc162c1ea2980252528d"},{url:"/windows11/LargeTile.scale-150.png",revision:"9599b420e48383edc02aca889fc5f630"},{url:"/windows11/LargeTile.scale-200.png",revision:"ff458c2921f7fed3a3deef5d84f8e502"},{url:"/windows11/LargeTile.scale-400.png",revision:"3e9bea5d904f5a41001a03e64f4852fa"},{url:"/windows11/SmallTile.scale-100.png",revision:"06ca69ea6751587c813ad91e08e61aac"},{url:"/windows11/SmallTile.scale-125.png",revision:"cce9c92f2b2c50a9e2bf71182fd19887"},{url:"/windows11/SmallTile.scale-150.png",revision:"31103c89529ccaa85b80692f945ced61"},{url:"/windows11/SmallTile.scale-200.png",revision:"8d185a837693b6d35d43d6aa237bf4ac"},{url:"/windows11/SmallTile.scale-400.png",revision:"14f67e5f9e6e70026182d962673f4e1b"},{url:"/windows11/SplashScreen.scale-100.png",revision:"40b5023a08bbc4b2003fcd56fb80f68b"},{url:"/windows11/SplashScreen.scale-125.png",revision:"80acee4b9e2489086c6be5c0d6f4fe9e"},{url:"/windows11/SplashScreen.scale-150.png",revision:"375adbce3b1e2f918ba4c6a9e972b30a"},{url:"/windows11/SplashScreen.scale-200.png",revision:"bdd7c66ea345dec7935f4d7d70712fc6"},{url:"/windows11/SplashScreen.scale-400.png",revision:"447fb7355dc9220d574590fbcee29f08"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"f21a65229539d9d308f02895562b21b8"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"99390d1931a6f2d49659b5689dfdf1c8"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"05d6eb3e4a9c59bc39894ce018a47023"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"cee0717a2701c3746fac15160153d293"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"a5f810830390f6417781bdad96633b44"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"96824dd64789561de026191015a70d3e"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"61a29fc2e7a2ce9c9e235bba596649b1"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"b685e8f87e4a9380f014d5ccdae8ce35"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"10d4da823617de5806e4619748cce6f4"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"fb2a7fa1037481d6a61f0d31b3ff7b34"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"e74be28c6f80e47fa4aef4499274fb73"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"147756d5489e6945b73f87a67b0892e0"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"04173da3260c0cd1d2e5700107fab737"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"53f09d7d14e0e5555ba33152d0277a84"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"5b47819851d7cb14ded35f1029868b0b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"f6f8a68acc6f6e162199bb4695d0d1eb"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"c1a3fb2ecc624cde6a6a72da7b1142ef"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"b72f8b98d0bf5e386e62d6c7a684fbc1"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"e31f13f4a1b7c95d185d80712921b5b3"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"baa4c1bff3731b0368bccb640faf4073"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"96824dd64789561de026191015a70d3e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"61a29fc2e7a2ce9c9e235bba596649b1"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"b685e8f87e4a9380f014d5ccdae8ce35"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"10d4da823617de5806e4619748cce6f4"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"fb2a7fa1037481d6a61f0d31b3ff7b34"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"e74be28c6f80e47fa4aef4499274fb73"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"147756d5489e6945b73f87a67b0892e0"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"04173da3260c0cd1d2e5700107fab737"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"53f09d7d14e0e5555ba33152d0277a84"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"5b47819851d7cb14ded35f1029868b0b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"f6f8a68acc6f6e162199bb4695d0d1eb"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"c1a3fb2ecc624cde6a6a72da7b1142ef"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"b72f8b98d0bf5e386e62d6c7a684fbc1"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"e31f13f4a1b7c95d185d80712921b5b3"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"baa4c1bff3731b0368bccb640faf4073"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"53f09d7d14e0e5555ba33152d0277a84"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"ffbf16068e10a256f7e301172f724e21"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"11e93dc01fe3fa388a8ed88f33f90126"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"806537e1e8718e5fd9afd95d2b5afa4e"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"b07a6a8955daf399ef7f1c6a98a4bb55"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"96824dd64789561de026191015a70d3e"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"61a29fc2e7a2ce9c9e235bba596649b1"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"b685e8f87e4a9380f014d5ccdae8ce35"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"10d4da823617de5806e4619748cce6f4"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"fb2a7fa1037481d6a61f0d31b3ff7b34"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"e74be28c6f80e47fa4aef4499274fb73"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"147756d5489e6945b73f87a67b0892e0"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"04173da3260c0cd1d2e5700107fab737"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"53f09d7d14e0e5555ba33152d0277a84"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"5b47819851d7cb14ded35f1029868b0b"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"f6f8a68acc6f6e162199bb4695d0d1eb"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"c1a3fb2ecc624cde6a6a72da7b1142ef"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"b72f8b98d0bf5e386e62d6c7a684fbc1"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"e31f13f4a1b7c95d185d80712921b5b3"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"baa4c1bff3731b0368bccb640faf4073"},{url:"/windows11/StoreLogo.scale-100.png",revision:"543a27d5f7ad1092c9b9419c2a17985b"},{url:"/windows11/StoreLogo.scale-125.png",revision:"51aa5cc561ac31dfbd2d0b82e3dcb7dc"},{url:"/windows11/StoreLogo.scale-150.png",revision:"a44398b7abbddb4128f32f55f9464364"},{url:"/windows11/StoreLogo.scale-200.png",revision:"186b5a35cc246d7259db3f2781df8342"},{url:"/windows11/StoreLogo.scale-400.png",revision:"9252677f549e5b342bf2c7297784b95e"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"cf72fe57247d61e71e20d22171c18210"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"344730a0bd6931495f2d0d405e795363"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"741b7497a5a7f95e5792393d03890200"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"40b5023a08bbc4b2003fcd56fb80f68b"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"bdd7c66ea345dec7935f4d7d70712fc6"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
