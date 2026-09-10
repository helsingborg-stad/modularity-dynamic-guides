<?php

namespace ModularityDynamicGuides\Support;

use PHPUnit\Framework\TestCase;

/**
 * @covers \ModularityDynamicGuides\Support\AutoloadResolver
 */
final class AutoloadResolverTest extends TestCase
{
    /**
     * @var array<int, string>
     */
    private array $temporaryDirectories = [];

    protected function tearDown(): void
    {
        foreach ($this->temporaryDirectories as $directory) {
            $this->removeDirectory($directory);
        }

        $this->temporaryDirectories = [];
    }

    public function testGetAutoloadPathsReturnsPluginAndRootAutoloadersWhenTheyExist(): void
    {
        $pluginDirectory = $this->createDirectory('plugin');
        $wordpressDirectory = $this->createDirectory('wordpress/wp');

        $pluginAutoloadPath = $pluginDirectory . '/vendor/autoload.php';
        $rootAutoloadPath = dirname($wordpressDirectory) . '/vendor/autoload.php';

        $this->createFile($pluginAutoloadPath);
        $this->createFile($rootAutoloadPath);

        $autoloadPaths = AutoloadResolver::getAutoloadPaths($pluginDirectory, $wordpressDirectory);

        $this->assertSame([$pluginAutoloadPath, $rootAutoloadPath], $autoloadPaths);
    }

    public function testGetAutoloadPathsSkipsMissingAutoloaders(): void
    {
        $pluginDirectory = $this->createDirectory('plugin');
        $wordpressDirectory = $this->createDirectory('wordpress/wp');

        $rootAutoloadPath = dirname($wordpressDirectory) . '/vendor/autoload.php';
        $this->createFile($rootAutoloadPath);

        $autoloadPaths = AutoloadResolver::getAutoloadPaths($pluginDirectory, $wordpressDirectory);

        $this->assertSame([$rootAutoloadPath], $autoloadPaths);
    }

    /**
     * Create a temporary directory for a test.
     *
     * @param string $suffix Directory name suffix.
     *
     * @return string
     */
    private function createDirectory(string $suffix): string
    {
        $directory = sys_get_temp_dir() . '/modularity-dynamic-guides-' . uniqid($suffix . '-', true);
        mkdir($directory, 0777, true);

        $this->temporaryDirectories[] = $directory;

        return $directory;
    }

    /**
     * Create an empty file and its parent directory.
     *
     * @param string $filePath File path to create.
     *
     * @return void
     */
    private function createFile(string $filePath): void
    {
        mkdir(dirname($filePath), 0777, true);
        file_put_contents($filePath, '<?php');
    }

    /**
     * Remove a directory recursively.
     *
     * @param string $directory Directory to remove.
     *
     * @return void
     */
    private function removeDirectory(string $directory): void
    {
        if (!is_dir($directory)) {
            return;
        }

        $items = scandir($directory);

        if ($items === false) {
            return;
        }

        foreach ($items as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }

            $path = $directory . '/' . $item;

            if (is_dir($path)) {
                $this->removeDirectory($path);
                continue;
            }

            unlink($path);
        }

        rmdir($directory);
    }
}
