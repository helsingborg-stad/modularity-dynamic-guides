<?php

namespace ModularityDynamicGuides {
    use PHPUnit\Framework\Attributes\RunInSeparateProcess;
    use PHPUnit\Framework\TestCase;
    use WpService\Implementations\NativeWpService;
    use WpUtilService\WpUtilService;

    final class AppTest extends TestCase
    {
        #[RunInSeparateProcess]
        public function testAdminAndFrontendAssetsUseNativeWpService(): void
        {
            require __DIR__ . '/Fixtures/WordPressFunctions.php';
            $GLOBALS['dynamicGuideAssets'] = [];
            $service = new WpUtilService(new NativeWpService());
            $app = new App($service->enqueue('/var/www/wp-content/plugins/dynamic-guides'));

            $app->enqueueAdmin();
            $app->enqueueFrontend();

            $base = 'https://example.test/wp-content/plugins/dynamic-guides/assets/dist/';
            self::assertSame([
                ['register_script', 'js-modularity-dynamic-guides-adminjs', $base . 'js/modularity-dynamic-guides-admin.js', [], false, true],
                ['enqueue_script', 'js-modularity-dynamic-guides-adminjs', '', [], false, []],
                ['register_style', 'css-modularity-dynamic-guides-admincss', $base . 'css/modularity-dynamic-guides-admin.css', [], false, 'all'],
                ['enqueue_style', 'css-modularity-dynamic-guides-admincss', '', [], false, 'all'],
                ['register_style', 'css-modularity-dynamic-guidescss', $base . 'css/modularity-dynamic-guides.css', [], false, 'all'],
                ['enqueue_style', 'css-modularity-dynamic-guidescss', '', [], false, 'all'],
                ['register_script', 'js-modularity-dynamic-guidesjs', $base . 'js/modularity-dynamic-guides.js', [], false, true],
                ['enqueue_script', 'js-modularity-dynamic-guidesjs', '', [], false, []],
            ], $GLOBALS['dynamicGuideAssets']);
        }
    }
}
