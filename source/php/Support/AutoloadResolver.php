<?php

namespace ModularityDynamicGuides\Support;

/**
 * Resolve Composer autoloader paths for the plugin.
 */
final class AutoloadResolver
{
    /**
     * Require every available Composer autoloader for the plugin.
     *
     * @param string      $pluginDirectory    Absolute plugin directory path.
     * @param string|null $wordpressDirectory Absolute WordPress directory path.
     *
     * @return void
     */
    public static function requireAutoloaders(string $pluginDirectory, ?string $wordpressDirectory = null): void
    {
        foreach (self::getAutoloadPaths($pluginDirectory, $wordpressDirectory) as $autoloadPath) {
            require_once $autoloadPath;
        }
    }

    /**
     * Get existing Composer autoloader paths for the plugin and site root.
     *
     * @param string      $pluginDirectory    Absolute plugin directory path.
     * @param string|null $wordpressDirectory Absolute WordPress directory path.
     *
     * @return array<int, string>
     */
    public static function getAutoloadPaths(string $pluginDirectory, ?string $wordpressDirectory = null): array
    {
        $autoloadPaths = [
            rtrim($pluginDirectory, DIRECTORY_SEPARATOR) . '/vendor/autoload.php',
        ];

        if (!empty($wordpressDirectory)) {
            $autoloadPaths[] = dirname(rtrim($wordpressDirectory, DIRECTORY_SEPARATOR)) . '/vendor/autoload.php';
        }

        return array_values(array_filter(array_unique($autoloadPaths), 'file_exists'));
    }
}
